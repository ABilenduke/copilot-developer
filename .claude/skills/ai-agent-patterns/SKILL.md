---
name: ai-agent-patterns
description: >-
  Defines conventions for building AI agents with the Laravel AI SDK and Ollama.
  Activates when creating or modifying agent classes in app/Ai/Agents/, working with
  AgentResolver routing, agent testing with ::fake()/::assertPrompted(), streaming
  SSE responses, conversation memory, or when the user mentions AI agent, agent pattern,
  Laravel AI SDK, agent resolver, temperature, or apply blocks.
---

# AI Agent Patterns

## When to Apply

- Creating a new agent class in `app/Ai/Agents/`
- Modifying `AgentResolver` action or prompt mappings
- Writing tests for agents (`::fake()`, `::assertPrompted()`)
- Working with SSE streaming in `AdminArticleAiController`
- Adding or changing apply block formats (`:::apply-body`, `:::apply-excerpt`)
- Debugging agent responses, conversation linking, or temperature behavior

## Documentation

Use `search-docs` for detailed Laravel AI SDK documentation before making changes.

## Agent Anatomy

Every agent implements `Agent & Conversational` (intersection type), uses three traits, and is configured via PHP attributes. All agents run on **Ollama** (Docker service), not OpenAI.

<code-snippet name="Complete Agent Class" lang="php">
// app/Ai/Agents/ArticleRefiner.php
namespace App\Ai\Agents;

use App\Ai\Agents\Concerns\HasArticleContext;
use Laravel\Ai\Attributes\MaxTokens;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Attributes\Timeout;
use Laravel\Ai\Concerns\RemembersConversations;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Stringable;

#[Model('llama3.2:3b')]       // Ollama model — NOT OpenAI
#[Temperature(0.6)]            // 0.3 (precise) to 0.8 (creative)
#[MaxTokens(4096)]             // Fixed for all agents
#[Timeout(120)]                // Fixed for all agents
class ArticleRefiner implements Agent, Conversational
{
    use HasArticleContext, Promptable, RemembersConversations;

    public function instructions(): Stringable|string
    {
        return <<<INSTRUCTIONS
        You are an expert content editor...

        {$this->articleContextBlock()}
        {$this->applyBlockInstructions()}
        INSTRUCTIONS;
    }
}
</code-snippet>

**Temperature spectrum** — choose based on the agent's task precision:

| Temperature | Agent | Rationale |
|-------------|-------|-----------|
| 0.3 | GrammarChecker | Deterministic corrections, no creativity needed |
| 0.4 | Proofreader | Slight variation in feedback phrasing |
| 0.5 | SeoOptimizer | Balanced analysis with structured output |
| 0.6 | ArticleRefiner | Creative improvement while preserving voice |
| 0.8 | ArticleGenerator | Maximum creativity for original content |

**Non-conversational agents**: `HumanizerAgent` implements only `Agent` (NOT `Conversational`) because it processes text in a single pass without conversation memory. It does NOT use `HasArticleContext` — it has its own constructor signature.

## Content Generation Patterns

The `HasArticleContext` trait provides the constructor, context accessors, and prompt-building methods shared by all conversational agents.

<code-snippet name="HasArticleContext Trait" lang="php">
// app/Ai/Agents/Concerns/HasArticleContext.php
trait HasArticleContext
{
    /**
     * @param  array{title: string, body: string, excerpt: string|null, content_type: string, category: string|null}  $context
     */
    public function __construct(
        protected array $context = [],
    ) {}

    protected function contextTitle(): string { return $this->context['title'] ?? ''; }
    protected function contextBody(): string { return $this->context['body'] ?? ''; }
    protected function contextExcerpt(): string { return $this->context['excerpt'] ?? ''; }
    protected function contextContentType(): string { return $this->context['content_type'] ?? ''; }
    protected function contextCategory(): string { return $this->context['category'] ?? ''; }
    protected function estimateWordCount(string $body): int { return str_word_count(strip_tags($body)); }
}
</code-snippet>

**Prompt-building methods** (called in `instructions()`):

- `articleContextBlock()` — Returns article metadata (title, type, category, word count) + writing quality standards (banned phrases from `config('humanizer.banned_phrases')`, sentence variety rules)
- `applyBlockInstructions()` — Returns formatting rules for apply blocks

**Apply blocks** tell the frontend to auto-apply content back to the article editor:

<code-snippet name="Apply Block Format" lang="text">
// For replacing article body:
:::apply-body
<h2>Improved Heading</h2>
<p>The revised content goes here...</p>
:::

// For replacing article excerpt:
:::apply-excerpt
A compelling 1-2 sentence summary under 160 characters.
:::
</code-snippet>

**When to use apply blocks**: Only when the agent generates or rewrites replacement content. For feedback, suggestions, and analysis, agents respond in plain markdown without apply blocks. This distinction is enforced in each agent's `instructions()` prompt.

## AgentResolver Routing

`AgentResolver` is the single routing layer between HTTP endpoints and agent classes. All agent instantiation goes through it — never `new Agent()` directly.

<code-snippet name="AgentResolver Mapping Constants" lang="php">
// app/Ai/AgentResolver.php
class AgentResolver
{
    protected const ACTION_AGENTS = [
        'proofread' => Proofreader::class,
        'grammar'   => GrammarChecker::class,
        'generate'  => ArticleGenerator::class,
        'refine'    => ArticleRefiner::class,
        'seo'       => SeoOptimizer::class,
        'excerpt'   => SeoOptimizer::class,
    ];

    protected const INLINE_AGENTS = [
        'proofread' => Proofreader::class,
        'grammar'   => GrammarChecker::class,
    ];

    // Each constant also has matching prompt templates:
    // ACTION_PROMPTS and INLINE_PROMPTS
}
</code-snippet>

**Factory methods** — all return `Agent&Conversational` intersection type:

- `forAction(string $action, array $context)` — Quick actions (proofread, grammar, generate, refine, seo, excerpt)
- `forInlineReview(string $action, array $context)` — Inline editor actions (proofread, grammar only)
- `forChat(array $context)` — Conversational chat (always `ArticleRefiner`)
- `forSelectionChat(array $context)` — Freeform instruction on selected text (always `ArticleRefiner`)

**To add a new agent**:

1. Create the class in `app/Ai/Agents/` implementing `Agent, Conversational`
2. Use `HasArticleContext`, `Promptable`, `RemembersConversations` traits
3. Add to `ACTION_AGENTS` and/or `INLINE_AGENTS` in `AgentResolver`
4. Add a prompt template to `ACTION_PROMPTS` and/or `INLINE_PROMPTS`
5. Update `validActions()` or `validInlineActions()` if adding new action names

<code-snippet name="AgentResolver Factory Method" lang="php">
// Returns intersection type — both Agent AND Conversational
public static function forAction(string $action, array $context): Agent&Conversational
{
    $class = self::ACTION_AGENTS[$action];

    return new $class($context);
}

// Prompt includes body context appended to the template
public static function actionPrompt(string $action, array $context): string
{
    $prompt = self::ACTION_PROMPTS[$action];

    if ($action === 'generate') {
        $prompt .= "\n\nArticle body to base generation on:\n".substr(strip_tags($context['body'] ?? ''), 0, 500);
    } elseif (in_array($action, ['proofread', 'grammar', 'seo', 'refine'])) {
        $prompt .= "\n\nArticle body:\n".($context['body'] ?? '');
    } elseif ($action === 'excerpt') {
        $prompt .= "\n\nArticle body:\n".substr(strip_tags($context['body'] ?? ''), 0, 2000);
    }

    return $prompt;
}
</code-snippet>

## Streaming & Conversation

The controller uses two streaming methods depending on whether conversations should persist.

<code-snippet name="Ephemeral Stream (No Conversation Linking)" lang="php">
// AdminArticleAiController::streamDirect()
private function streamDirect(Agent&Conversational $agent, string $prompt, User $user): StreamedResponse
{
    $agent->forUser($user);
    $streamable = $agent->stream($prompt);

    return response()->stream(function () use ($streamable) {
        try {
            foreach ($streamable as $event) {
                echo 'data: '.((string) $event)."\n\n";
                if (ob_get_level() > 0) { ob_flush(); }
                flush();
            }
        } catch (\Throwable $e) {
            echo 'data: '.json_encode(['type' => 'error', 'message' => $e->getMessage()])."\n\n";
            flush();
            report($e);
        }
        echo "data: [DONE]\n\n";
        flush();
    }, 200, [
        'Content-Type' => 'text/event-stream',
        'X-Accel-Buffering' => 'no',
        'Cache-Control' => 'no-cache',
        'Connection' => 'keep-alive',
    ]);
}
</code-snippet>

**Conversation linking** (for chat, not inline actions):

- New conversation: `$agent->forUser($user)` → starts fresh
- Resume: `$agent->continue($conversationId, as: $user)` → resumes existing
- After streaming: `$agent->currentConversation()` → get conversation ID
- Link to article: Update `agent_conversations.article_id` via `.then()` callback on the streamable
- Conversations stored in `agent_conversations` + `agent_conversation_messages` tables (UUID PKs)

**Generate action is special**: Dispatches `ProcessArticle` job instead of streaming. Returns `202 Accepted` with JSON. The job runs generation server-side, humanizes via `TextHumanizer`, and broadcasts progress via Reverb.

<code-snippet name="Conversation Linking Pattern" lang="php">
// AdminArticleAiController::streamAgent() — links conversation to article after streaming
if (! empty($validated['conversation_id'])) {
    $agent->continue($validated['conversation_id'], as: $user);
} else {
    $agent->forUser($user);
}

$streamable = $agent->stream($prompt);
$articleId = $validated['article_id'] ?? null;

$streamable->then(function () use ($agent, $articleId) {
    $conversationId = $agent->currentConversation();

    if ($conversationId && $articleId) {
        DB::table('agent_conversations')
            ->where('id', $conversationId)
            ->whereNull('article_id')
            ->update(['article_id' => $articleId]);
    }
});
</code-snippet>

## Testing

Each agent class has its own `::fake()` and `::assertPrompted()` static methods provided by the Laravel AI SDK. Always fake the specific agent class, not a generic mock.

<code-snippet name="Agent Testing Patterns" lang="php">
// tests/Feature/Admin/AdminArticleAiControllerTest.php
use App\Ai\Agents\ArticleRefiner;
use App\Ai\Agents\Proofreader;

// Helper function for valid context (reuse across tests)
function validContext(): array
{
    return [
        'title' => 'Test Article',
        'body' => '<p>Test article body with enough content.</p>',
        'excerpt' => 'A test excerpt',
        'content_type' => 'general',
        'category' => 'Technology',
    ];
}

// Fake an agent with a canned response
test('chat endpoint streams response', function () {
    $admin = User::factory()->admin()->create();
    ArticleRefiner::fake(['Improved content here']);

    $this->actingAs($admin)
        ->postJson('/admin/articles/ai/chat', [
            'message' => 'Improve this article',
            'context' => validContext(),
        ])->assertOk();

    ArticleRefiner::assertPrompted('Improve this article');
});

// Fake an agent for quick actions
test('action endpoint resolves correct agent', function () {
    $admin = User::factory()->admin()->create();
    Proofreader::fake(['Feedback here']);

    $this->actingAs($admin)
        ->postJson('/admin/articles/ai/action', [
            'action' => 'proofread',
            'context' => validContext(),
        ])->assertOk();

    Proofreader::assertPrompted(fn ($prompt) =>
        str_contains($prompt->prompt, 'Review the current article')
    );
});

// Generate action uses Queue::fake() instead
test('generate action dispatches job', function () {
    Queue::fake();
    $admin = User::factory()->admin()->create();
    $article = Article::factory()->create();

    $this->actingAs($admin)
        ->postJson('/admin/articles/ai/action', [
            'action' => 'generate',
            'article_id' => $article->id,
            'context' => validContext(),
        ])->assertAccepted();

    Queue::assertPushed(ProcessArticle::class);
});
</code-snippet>

**Key testing patterns**:

- `AgentName::fake(['response text'])` — Synchronous fake with canned response
- `AgentName::fake()` — Empty response fake (for validation tests)
- `AgentName::assertPrompted('substring')` — Assert the prompt contained text
- `AgentName::assertPrompted(fn ($prompt) => ...)` — Assert with closure for complex matching
- `Queue::fake()` + `Queue::assertPushed(ProcessArticle::class)` — For the generate action
- `$this->withoutMiddleware(ValidateCsrfToken::class)` — For JSON API tests
- Conversation history tests must seed `agent_conversations` and `agent_conversation_messages` tables directly with all required JSON columns (attachments, tool_calls as empty arrays/objects)

## Common Pitfalls

- **Thinking-capable models crash the SDK**: Avoid models like `qwen3` that emit `ThinkingCompleteEvent` — the Laravel AI SDK doesn't handle it and throws an unrecoverable exception. Stick to `llama3.2:3b` or similar non-thinking models.
- **Ollama, not OpenAI**: Agents use `#[Model('llama3.2:3b')]` which runs on the Ollama Docker service. Don't confuse this with the global `config('ai.default_provider')` which is for different use cases. The model attribute is the Ollama model name.
- **Temperature mismatches**: Using high temperature (0.8) for grammar checking produces inconsistent corrections. Using low temperature (0.3) for content generation produces flat, repetitive output. Match temperature to task precision — see the spectrum table above.
- **Missing context fields cause silent failures**: The context array has 5 fields (`title`, `body`, `excerpt`, `content_type`, `category`). The `body` field uses `['present', 'nullable']` validation — it must be present in the request even if null. Controllers coerce null to empty string: `$validated['context']['body'] = $validated['context']['body'] ?? ''`.
- **Forgetting to register in AgentResolver**: Creating a new agent class without adding it to `ACTION_AGENTS` or `INLINE_AGENTS` in `AgentResolver` means it's unreachable from the controller. Also add a prompt template to `ACTION_PROMPTS`/`INLINE_PROMPTS` and update `validActions()`/`validInlineActions()`.
