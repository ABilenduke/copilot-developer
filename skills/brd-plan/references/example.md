# Worked example: Clear project search

This is a fictional, fully specified small change. The evidence and paths below belong to this
example; discover the actual repository when planning real work. No interview is needed because the
request supplies the material behavior. The five sections remain short.

---

# BRD: Clear project search

**Date:** 2026-09-15

**Status:** Ready

## 1. Business context

Support staff search the loaded project list by name. Returning to the full list currently requires
manually deleting the query. Add a visible action that clears the query and returns focus to search
so users can start another lookup. Success means the acceptance scenarios below pass. No usage or
time-saving improvement has been measured.

## 2. Scope and requirements

Include the clear action and its keyboard/focus behavior. Exclude API changes, pagination changes,
and styling-system changes. Preserve the current name-search matching behavior.

| ID      | Requirement and rationale/source                                                        | Priority | Acceptance criteria                                                                                                    |
| ------- | --------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| REQ-001 | Show a native button beside search so support staff can reset the filter; user request. | Must     | A nonempty query displays a button with accessible name “Clear search”; an empty query does not display it.            |
| REQ-002 | Reset the search results without a new fetch; user request.                             | Must     | Activating the button clears the query and displays all already-loaded projects.                                       |
| REQ-003 | Support continued keyboard use; user request and existing accessibility convention.     | Must     | The button works by mouse, Enter, and Space; activation returns focus to the search input after the button disappears. |

## 3. Technical approach

Inspected fixture evidence: `src/components/ProjectList.vue` owns the query and derives filtered
projects from the loaded list; `tests/ProjectList.test.ts` uses Vitest. The input remains mounted
when the query changes. Existing styles cover native buttons.

Add a conditional native button and a shared activation handler. Clear the query, let Vue finish
the DOM update, and focus the existing input through a template ref. Reuse the current derived list;
clearing its query restores the loaded projects. The input remains the focus target even when no
projects are loaded. This localized change requires no public API or schema changes.

## 4. Delivery and validation

1. **Implement the clear action (REQ-001–REQ-003).** Update `ProjectList.vue` with conditional button
   rendering, query reset, and focus restoration. Reuse the existing button styles. No dependency.
2. **Verify behavior (REQ-001–REQ-003).** Extend `ProjectList.test.ts` with empty/nonempty query,
   filtered and zero-match results, an empty loaded list, query reset, restored results, and focus
   assertions after rendering. Verify existing search tests still pass. Depends on step 1.
3. **Check native interaction (REQ-001, REQ-003).** In the development page, activate by mouse, then
   keyboard Tab/Enter and Tab/Space. Check the accessible name and focus returning to the input.
   Depends on step 1; can run alongside step 2.

The inspected fixture exposes `pnpm exec vitest run tests/ProjectList.test.ts` as the targeted test
command. Tests and browser checks above are planned, not yet run. Ship through the existing release
process; reverting the localized change restores the previous behavior without a data migration.

## 5. Decisions and assumptions

- **User decisions:** Conditional visibility, native button, reset behavior, and returned focus.
- **Evidence:** Existing component ownership, test setup, persistent input, and native button styles.
- **Proposed default:** Keep all behavior in the current component; no new public prop or event.
- **Blocking questions:** None.
- **Approval:** Not recorded; the plan is complete for handoff.
