# Design: [Story Name]

**Feature**: {feature-name}
**Date**: {YYYY-MM-DD}
**Status**: Draft | Approved
**PRD**: [link to prd.md]

## High-Level Approach
1-2 paragraph summary of the technical strategy.

## Key Architectural Decisions
| Decision | Choice | Rationale | Alternatives Considered |
|----------|--------|-----------|------------------------|
| | | | |

## Data Model Changes
### New Tables/Columns
### Modified Tables/Columns
### Migrations

## Integration Points
External services, APIs, queues, broadcasts affected.

## File Manifest

### New Files
| File | Purpose |
|------|---------|
| | |

### Modified Files
| File | Changes |
|------|---------|
| | |

### Deleted Files
| File | Reason |
|------|--------|
| | |

### Config Changes
Environment variables, config files, Docker changes.

## Edge Cases & Error Handling
### Input Validation
### Failure Modes & Recovery
### Security Considerations
### Backward Compatibility

## Assumption Mapping

| Assumption | Certainty | Impact | Action |
|------------|-----------|--------|--------|
| [what we believe to be true] | High/Medium/Low | High/Medium/Low | Validate / Accept / Spike |

> High-impact + Low-certainty assumptions should trigger a spike before implementation.

---
**Done gate**: File manifest covers every change. Data model is complete. Edge cases addressed. High-impact/low-certainty assumptions have actions.
