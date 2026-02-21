#!/usr/bin/env bash
#
# PostToolUse hook: maps modified file paths to related skills/docs
# and returns additionalContext so Claude knows what may need updating.
#

set -euo pipefail

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data.get('tool_input', {}).get('file_path', ''))
" 2>/dev/null) || exit 0

# Nothing to do if no file path
[ -z "$FILE_PATH" ] && exit 0

# Skip files that are themselves documentation/skills/config (avoid feedback loops)
case "$FILE_PATH" in
    .claude/skills/*|.claude/agents/*|docs/*|CLAUDE.md|boost.json)
        exit 0
        ;;
esac

SKILLS=""
DOCS=""

case "$FILE_PATH" in
    # Content models
    app/Models/Article.php|app/Models/Category.php|app/Models/Tag.php|app/Models/ArticleInternalLink.php|app/Models/ArticleRevision.php|app/Models/KeywordRanking.php|app/Enums/ArticleStatus.php|app/Enums/ContentType.php)
        SKILLS="content-publishing"
        DOCS="docs/generated/schema.md"
        ;;
    # Content controllers
    app/Http/Controllers/ArticleController*.php|app/Http/Controllers/CategoryController*.php)
        SKILLS="content-publishing"
        DOCS="docs/generated/schema.md, docs/generated/routes.md"
        ;;
    # Campaign models
    app/Models/Campaign*.php|app/Models/CampaignTopic*.php)
        SKILLS="content-publishing"
        DOCS="docs/architecture.md"
        ;;
    # Affiliate models
    app/Models/AffiliateLink*.php|app/Models/AffiliateClick*.php|app/Models/AffiliateProgram*.php|app/Models/AffiliateConversion*.php|app/Models/AdPlacement*.php|app/Enums/ConversionStatus.php|app/Enums/CommissionType.php)
        SKILLS="affiliate-tracking"
        DOCS="docs/generated/schema.md"
        ;;
    # Affiliate controllers
    app/Http/Controllers/AffiliateRedirectController*.php)
        SKILLS="affiliate-tracking"
        DOCS="docs/generated/routes.md"
        ;;
    # Analytics model
    app/Models/ArticleAnalytics*.php)
        SKILLS="analytics-dashboard"
        DOCS="docs/generated/schema.md"
        ;;
    # Admin middleware and routes
    app/Http/Middleware/EnsureUserIsAdmin.php|routes/admin.php)
        DOCS="docs/generated/routes.md"
        ;;
    # AI agents
    app/Ai/Agents/*.php|app/Ai/AgentResolver.php|app/Ai/Agents/Concerns/*.php)
        SKILLS="ai-agent-patterns"
        DOCS="docs/architecture.md"
        ;;
    # Admin controllers
    app/Http/Controllers/Admin/*.php)
        SKILLS="analytics-dashboard"
        DOCS="docs/generated/routes.md"
        ;;
    # Admin layout and components
    resources/js/Layouts/AdminLayout.vue|resources/js/components/admin/*.vue)
        SKILLS="inertia-vue-development"
        DOCS="docs/generated/routes.md"
        ;;
    # Admin pages
    resources/js/Pages/Admin/*.vue|resources/js/Pages/Admin/**/*.vue)
        SKILLS="analytics-dashboard, inertia-vue-development"
        DOCS="docs/generated/routes.md"
        ;;
    # Auth system
    app/Models/SocialIdentity.php|app/Enums/AuthProvider.php|app/Http/Controllers/Auth/*.php|app/Actions/Fortify/*.php|app/Providers/FortifyServiceProvider.php|app/Http/Responses/*.php|config/fortify.php|routes/auth.php)
        DOCS="docs/generated/schema.md, docs/generated/routes.md"
        ;;
    # Newsletter
    app/Models/NewsletterSubscriber.php|app/Enums/SubscriberStatus.php|app/Enums/SubscriptionSource.php|app/Http/Controllers/NewsletterController.php|app/Mail/Newsletter*.php|app/Events/Newsletter*.php|app/Listeners/Send*Email.php)
        DOCS="docs/generated/schema.md, docs/generated/routes.md"
        ;;
    # Feature flags (Pennant)
    app/Features/*.php)
        SKILLS="inertia-vue-development"
        ;;
    # External API infrastructure
    app/Services/ExternalApi/*.php|app/Services/ExternalApi/**/*.php|app/Contracts/ExternalApi/*.php|app/Enums/ApiProvider.php|app/Enums/ApiConnectionStatus.php|app/Enums/WebhookStatus.php|config/external-apis.php|app/Models/ApiConnection.php|app/Models/Webhook.php|app/Providers/ExternalApiServiceProvider.php)
        SKILLS="queue-job-patterns"
        DOCS="docs/generated/schema.md, docs/generated/jobs.md"
        ;;
    # Queue jobs
    app/Jobs/*.php|app/Jobs/**/*.php)
        SKILLS="queue-job-patterns"
        DOCS="docs/generated/jobs.md"
        ;;
    # Queue config
    config/queue.php|config/horizon.php|app/Providers/HorizonServiceProvider.php)
        SKILLS="queue-job-patterns"
        DOCS="docs/generated/jobs.md"
        ;;
    # AI composables
    resources/js/composables/useArticleAiChat.ts)
        SKILLS="content-publishing, inertia-vue-development"
        DOCS="docs/architecture.md"
        ;;
    # Vue components (non-dashboard)
    resources/js/*.vue|resources/js/**/*.vue)
        SKILLS="inertia-vue-development"
        ;;
    # Tests
    tests/*.php|tests/**/*.php)
        SKILLS="pest-testing"
        ;;
    # Migrations
    database/migrations/*.php)
        DOCS="docs/generated/schema.md"
        ;;
    # Routes
    routes/web.php|routes/console.php)
        DOCS="docs/generated/routes.md"
        ;;
    *)
        # No mapping — exit silently
        exit 0
        ;;
esac

# Build context message
[ -z "$SKILLS" ] && [ -z "$DOCS" ] && exit 0

MSG="The file you just modified ($FILE_PATH) is related to:"
[ -n "$SKILLS" ] && MSG="$MSG\n- Skills: $SKILLS"
[ -n "$DOCS" ] && MSG="$MSG\n- Docs: $DOCS"
MSG="$MSG\nIf this change affects domain patterns, consider updating those files."

python3 -c "
import json, sys
msg = '$MSG'.replace('\\\\n', '\n')
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'PostToolUse',
        'additionalContext': msg
    }
}))
"
