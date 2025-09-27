---
description: 'Markdown authoring standards for consistent, maintainable docs.'
applyTo: '**/*'
---

# Markdown Authoring Checklist

Use this checklist to craft accessible, consistent Markdown content across the repository.

## 1. File Structure & Front Matter

_Docs: [CommonMark Spec](https://spec.commonmark.org/), [GitHub Docs on Front Matter](https://docs.github.com/pages/site-design/about-yaml-front-matter)_

* [ ] Include YAML front matter when required, using single-quoted values and repository-defined fields (`description`, `applyTo`, etc.).
* [ ] Keep metadata concise (<120 characters per value) and avoid unescaped special characters in front matter.
* [ ] Organize content with a single H1 per file followed by meaningful, ordered sections.

## 2. Headings & Hierarchy

_Docs: [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/), [W3C Headings Best Practices](https://www.w3.org/WAI/tutorials/page-structure/headings/)_

* [ ] Use ATX-style headings (`#`) that descend sequentially (H1 → H2 → H3) without skipping levels.
* [ ] Write descriptive headings that summarize the section content in ≤70 characters.
* [ ] Avoid embedding links or formatted text inside headings unless necessary for clarity.

## 3. Paragraphs, Emphasis & Lists

_Docs: [CommonMark Emphasis](https://spec.commonmark.org/0.30/#emphasis-and-strong-emphasis), [Microsoft Writing Style Guide](https://learn.microsoft.com/style-guide/welcome/)_

* [ ] Limit paragraphs to 2–4 sentences for scanability; prefer plain language over jargon.
* [ ] Use `*italic*` and `**bold**` sparingly to emphasize terms or callouts, not for styling.
* [ ] Format unordered lists with `*` bullets and ordered lists with numerals, indenting continuation lines by two spaces.

## 4. Links, References & Footnotes

_Docs: [Markdown Link Reference](https://spec.commonmark.org/0.30/#links), [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)_

* [ ] Prefer descriptive link text over bare URLs; avoid “here” or “click this.”
* [ ] Validate external links for HTTPS availability and permanence before publishing.
* [ ] Use reference-style links or footnotes for repeated destinations to keep content readable.

## 5. Code Blocks & Syntax Highlighting

_Docs: [GitHub Markdown Code Fences](https://docs.github.com/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks), [CommonMark Code Blocks](https://spec.commonmark.org/0.30/#fenced-code-blocks)_

* [ ] Fence code blocks with triple backticks and specify the language (` ```js `) for syntax highlighting.
* [ ] Keep code samples minimal yet runnable; remove sensitive values and placeholder secrets.
* [ ] Inline code using backticks (`code`) for commands, filenames, or configuration keys.

## 6. Tables & Layout Elements

_Docs: [GitHub Flavored Markdown Tables](https://github.github.com/gfm/#tables-extension-), [WAI Table Techniques](https://www.w3.org/WAI/tutorials/tables/)_

* [ ] Use tables only for tabular data; avoid them for layout or multi-column formatting.
* [ ] Align columns with `|` pipes and include header separators with matching column counts.
* [ ] Provide concise headers and avoid merging cells; add caption text nearby when additional context is required.

## 7. Images, Media & Callouts

_Docs: [W3C Alt Text](https://www.w3.org/WAI/tutorials/images/), [GitHub Images Guide](https://docs.github.com/get-started/writing-on-github/working-with-advanced-formatting/inserting-images)_

* [ ] Store images within the repository’s assets paths and reference them with relative links.
* [ ] Supply descriptive alt text that conveys the image’s purpose; omit “image of” phrasing.
* [ ] Avoid auto-playing media; link to external video/audio with a short description and fallback text.

## 8. Accessibility & Inclusive Language

_Docs: [WCAG 2.2 Writing Techniques](https://www.w3.org/WAI/WCAG22/Techniques/general/), [Microsoft Inclusive Language](https://learn.microsoft.com/style-guide/bias-free-communication)_

* [ ] Favor inclusive, bias-free language and expand acronyms on first use.
* [ ] Maintain sufficient contrast for inline HTML elements (badges, callouts) and provide text alternatives.
* [ ] Use semantic Markdown elements (lists, headings, blockquotes) rather than manual spacing or ASCII art.

## 9. Cross-References & Navigation

_Docs: [GitHub Automatic Link References](https://docs.github.com/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls), [CommonMark Link Labels](https://spec.commonmark.org/0.30/#link-labels)_

* [ ] Reference other repo files using relative paths (`../README.md`) to preserve portability.
* [ ] Anchor link to headings using GitHub-generated IDs; verify that target headings exist and remain stable.
* [ ] Add short “See also” or “Next steps” sections to guide readers through related docs when appropriate.

## 10. Linting, Tooling & Automation

_Docs: [markdownlint Rules](https://github.com/DavidAnson/markdownlint), [Remark Lint](https://github.com/remarkjs/remark-lint)_

* [ ] Run repository-standard Markdown linters (markdownlint, remark) locally and in CI to catch stylistic issues.
* [ ] Configure `.markdownlint.json` or equivalent to document accepted deviations and align with team preferences.
* [ ] Resolve lint warnings immediately; avoid committing suppression directives without team review.

## 11. Reviews & Collaboration

_Docs: [GitHub Pull Request Guidelines](https://docs.github.com/pull-requests/collaborating-on-pull-requests), [Google Technical Writing One](https://developers.google.com/tech-writing)_

* [ ] Request documentation reviews from subject-matter experts and at least one technical writer when possible.
* [ ] Respond to feedback with iterative commits, calling out significant rewrites or structural changes.
* [ ] Document major decisions (terminology changes, deprecated sections) in PR descriptions or changelog entries.

## 12. Maintenance & Versioning

_Docs: [Docs-as-Code Practices](https://www.writethedocs.org/guide/docs-as-code/), [Semantic Versioning for Docs](https://semver.org/)_

* [ ] Keep documentation synchronized with feature releases; update instructions when behavior changes.
* [ ] Archive outdated content or clearly label legacy guidance to prevent confusion.
* [ ] Schedule regular audits to verify links, examples, and screenshots remain accurate and aligned with reality.
