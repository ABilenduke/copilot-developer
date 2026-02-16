# Workflow Skill Template

Use this template when generating an **interactive workflow** skill. Replace all `{placeholders}` with actual content. Adjust the number of phases as needed (3-7 is typical).

---

```markdown
---
name: {skill-name}
description: >-
  {One paragraph describing the workflow and when to invoke it.
  Include specific trigger phrases users might say.}
---

# {Skill Title}

## HARD RULES

These rules are absolute. No exceptions.

### Rule 1: {Most critical constraint}

{Explanation of what must never happen and what to do instead.}

### Rule 2: {Second critical constraint}

{Explanation.}

---

## Purpose

{2-3 sentences explaining why this workflow exists and what it produces.}

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/{template-file}.md` — {what it provides}
    - `examples/{example-file}.md` — {what it demonstrates}
2. {Gather context — read relevant files, check state}
3. {Ask the initial orienting question}
4. Begin Phase 1 immediately

---

## How It Works: The {N}-Phase Process

The process is **conversational and interactive**. Guide the user through each phase.

### Critical Rules

1. **Ask ONE question at a time.** This is a conversation, not a form.
2. **Reflect back what you heard.** Summarize before moving on.
3. **Challenge weak answers.** Push back on vague responses.
4. **Track progress visibly.** Show the progress indicator every response.
5. **Build incrementally.** Write to disk at checkpoints.

---

## Phase Details

### Phase 1: {Phase Name} ({WHAT IT ANSWERS})

**Goal**: {One sentence.}

Explore: {Key questions for this phase.}

**Output**: {What this phase produces.}

### Phase 2: {Phase Name} ({WHAT IT ANSWERS})

**Goal**: {One sentence.}

Explore: {Key questions.}

**Output**: {What this phase produces.}

**Checkpoint**: {What gets written to disk.}

### Phase N: {Final Phase} ({WHAT IT ANSWERS})

**Goal**: {One sentence.}

**Output**: {Final deliverable.}

**Checkpoint**: {Final write to disk. Run quality checklist.}

---

## Progress Indicator

Start EVERY response with:

```
{emoji} {Skill Name}: Phase N of {total} — [Phase Name]
[██████░░░░░░░░] N/{total} complete
```

---

## Quality Checklist

Before finalizing:

- [ ] {Criterion 1}
- [ ] {Criterion 2}
- [ ] {Criterion 3}
- [ ] {Criterion 4}

---

## Handling Impatience

- **"Can we skip ahead?"** → {How to speed up without skipping substance}
- **"I already know what I want"** → {Fast path for experienced users}
- **"Too many questions"** → {Batch remaining questions}

---

## After Completion

Once complete:

1. {Summarize what was produced}
2. {Next steps or handoff instructions}
3. {Reminder about related skills or processes}

$ARGUMENTS
```

---

## Template Notes

- **Hard Rules**: 2-4 rules maximum. These are non-negotiable constraints.
- **Phases**: 3-7 phases. Each needs a Goal, Explore topics, and Output.
- **Checkpoints**: Write to disk at least every 2 phases. Users lose patience if nothing is saved.
- **Progress Indicator**: Pick an emoji that fits the skill's personality.
- **Quality Checklist**: 4-8 items. Specific and verifiable.
- **$ARGUMENTS**: Include at the end if the skill accepts slash-command arguments.
- **Line count**: Target 180-300 lines. Workflow skills are longer than domain skills.
