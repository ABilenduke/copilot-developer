# Domain Skill Template

Use this template when generating a **domain knowledge** skill. Replace all `{placeholders}` with actual content.

---

```markdown
---
name: {skill-name}
description: >-
  {One paragraph describing what the skill teaches and when it activates.
  Include specific trigger phrases, code contexts, and keywords that help
  Claude decide when to activate this skill.}
---

# {Skill Title}

## When to Apply

- {Specific trigger: code context, user phrase, or file pattern}
- {Another trigger}
- {Another trigger}

## Documentation

Use `search-docs` for detailed {framework/package} documentation before making changes.

## {Domain Section 1}

{Brief explanation of the convention or pattern.}

<code-snippet name="{Descriptive Name}" lang="{php|vue|ts|bash}">
{Actual code example from the codebase — not generic}
</code-snippet>

{Additional context if needed.}

## {Domain Section 2}

{Brief explanation.}

<code-snippet name="{Descriptive Name}" lang="{php|vue|ts|bash}">
{Code example}
</code-snippet>

## {Domain Section 3}

{Continue with as many sections as needed — typically 3-8 for a domain skill.}

## Common Pitfalls

- **{Pitfall name}**: {What goes wrong and how to avoid it}
- **{Pitfall name}**: {What goes wrong and how to avoid it}
- **{Pitfall name}**: {What goes wrong and how to avoid it}
```

---

## Template Notes

- **Description**: Must explain WHEN to activate, not just what it covers. Include trigger words.
- **When to Apply**: More granular than the description. Think: "If Claude sees X, activate."
- **Code snippets**: Always use `<code-snippet>` blocks, never markdown fences. Pull from the actual codebase where possible.
- **Section count**: 3-8 sections. Fewer = too thin, more = consider splitting into two skills.
- **Common Pitfalls**: 3-5 entries based on real mistakes, not hypothetical ones.
- **Line count**: Target 80-150 lines. Dense enough to be useful, short enough to be read.
