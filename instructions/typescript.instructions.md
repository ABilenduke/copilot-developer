---
description: 'TypeScript conventions for consistent, type-safe codebases.'
applyTo: '**/*.ts, **/*.tsx, **/*.cts, **/*.mts'
---

# TypeScript Delivery Checklist

Use this checklist when authoring or reviewing TypeScript across the workspace.

## 1. Project Setup & Configuration

_Docs: [tsconfig Configuration Reference](https://www.typescriptlang.org/tsconfig), [Module Resolution Guide](https://www.typescriptlang.org/docs/handbook/module-resolution.html), [Project Configuration](https://www.typescriptlang.org/docs/handbook/project-config.html)_

* [ ] Maintain a single base `tsconfig.base.json` with `extends` per package/app; ensure `compilerOptions.paths` aligns with bundler aliases.
* [ ] Enable strict mode (`"strict": true`) and layer in `noImplicitOverride`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` for maximum safety.
* [ ] Set `module`, `target`, and `moduleResolution` to match runtime/bundler requirements; document any CommonJS interop flags (`esModuleInterop`, `allowSyntheticDefaultImports`).
* [ ] Emit declaration files where packages are consumed externally (`declaration: true`, `declarationMap: true`) and publish only compiled output.
* [ ] Track environment-specific configs (Node vs browser vs tests) via `references` or dedicated `tsconfig.*.json` files.

## 2. Typing Practices & Patterns

_Docs: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)_

* [ ] Prefer `type` aliases for unions/intersections and `interface` for object contracts; keep names descriptive and domain-focused.
* [ ] Model domain entities with discriminated unions instead of boolean flags; leverage literal types for finite states.
* [ ] Replace `any` with `unknown`, generics, or dedicated helper types; justify unavoidable `any` usage with comments referencing ADRs.
* [ ] Promote `readonly` and `const` assertions to avoid accidental mutation; expose immutability in API contracts.
* [ ] Encapsulate repeated type logic in utility helpers (e.g., `Pick`, `ReturnType`, custom mapped types) rather than duplicating shapes.

## 3. Code Quality & Tooling

_Docs: [Type Checking with tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html), [TypeScript ESLint](https://typescript-eslint.io/), [Prettier + TypeScript](https://prettier.io/docs/en/options.html#parser)_

* [ ] Run `tsc --noEmit` (or `tsc --build`) in CI to block merges on type regressions.
* [ ] Enforce linting via `@typescript-eslint` with rules for unused vars, unsafe `any`, and consistent `type` imports (`import type`).
* [ ] Configure formatting to respect trailing commas and semicolons; ensure Prettier/ESLint agree on parser settings.
* [ ] Introduce path alias resolution to ESLint (`settings.import/resolver`) to prevent false positive import errors.
* [ ] Maintain editor settings (VS Code `settings.json`) enabling `typescript.tsdk` and `strictNullChecks` awareness for contributors.

## 4. Module & API Design

_Docs: [Declaration Files Guide](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html), [Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/modules.html)_

* [ ] Keep module public surfaces minimal—export factories/functions rather than raw objects; document API boundaries in README/ADRs.
* [ ] Use `export type` and `export interface` for types, `export const` for implementations; avoid default exports in shared libraries to ease refactors.
* [ ] Provide overload signatures or generic constraints for functions with multiple call patterns; ensure return types remain explicit.
* [ ] Publish `.d.ts` shims for third-party libraries lacking typings and contribute them upstream or to DefinitelyTyped.
* [ ] Guard runtime inputs with validation (e.g., Zod, io-ts) when data crosses trust boundaries; connect validated types back to inferred `z.infer` forms.

## 5. Testing & Type Safety

_Docs: [Vitest TypeScript Setup](https://vitest.dev/guide/#typescript), [tsd Type Tests](https://github.com/SamVerschueren/tsd), [Testing Types Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/testing.html)_

* [ ] Align Vitest/Jest environments with TS configs (`tsconfig.vitest.json`, `ts-jest`); ensure module resolution mirrors production.
* [ ] Add type-level tests (tsd, expect-type) for reusable utilities and public APIs to prevent regression in generics.
* [ ] Mock modules using type-safe factories; leverage `vi.mocked` / `jest.Mocked` helpers for correct inference.
* [ ] Fail CI when `tsc` or test runners encounter isolated module errors—never skip type checking to gain speed.
* [ ] Generate coverage reports that include type-driven branches (narrowing, discriminated unions) to ensure runtime assertions match compile-time intent.

## 6. Build & Runtime Integration

_Docs: [TypeScript with Vite](https://vitejs.dev/guide/features.html#typescript), [Bundling with TypeScript](https://www.typescriptlang.org/docs/handbook/bundle.html), [ts-node Documentation](https://typestrong.org/ts-node/docs/)_

* [ ] Treat `tsc --build` artifacts as immutable; clean `dist/` before rebuilds and avoid checking compiled JS into version control unless required.
* [ ] Configure bundlers (Vite, Webpack, esbuild) to respect TS path aliases and `jsx` settings; sync with `tsconfig` via shared constants.
* [ ] Use `ts-node` or `tsx` for development scripts only; compile to JavaScript for production and long-running tasks.
* [ ] Ensure source maps (`sourceMap`, `inlineSources`) are enabled for debugging and match bundler output.
* [ ] Validate Node version and module type (`type: module` vs CommonJS) to prevent runtime import/export mismatches.

## 7. Migration & Interop

_Docs: [Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html), [JSDoc Support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html), [Incremental Migration Guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#incremental-migration)_

* [ ] Introduce TypeScript gradually via `allowJs` + `checkJs` when converting large codebases; track conversion progress in project boards.
* [ ] Use JSDoc annotations to type legacy JS files and reduce `any` spread before full `.ts` migration.
* [ ] Replace ambient declarations with real typed modules as soon as upstream typings become available.
* [ ] Document cross-package type dependencies (e.g., shared DTOs) to avoid breaking changes during refactors.
* [ ] Audit third-party types after major library upgrades; lock versions when DefinitelyTyped packages lag behind.

## 8. Documentation & Collaboration

_Docs: [TypeScript Doc Comments](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#tag-reference), [Breaking Changes Policy](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)_

* [ ] Annotate complex functions/classes with JSDoc to surface intent and generics in IDE hovers.
* [ ] Record significant type decisions (e.g., discriminated union schema) in ADRs and reference them within the code.
* [ ] Keep README snippets and Storybook examples synchronized with actual types; add CI to fail when examples drift.
* [ ] Encourage code reviews to scrutinize exported types and API surface changes as rigorously as runtime logic.

## 9. Documentation Lookup & Research

_Docs: [TypeScript Handbook Search](https://www.typescriptlang.org/docs/), [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)_

* [ ] Consult the official handbook or release notes whenever encountering new compiler options or syntax before introducing workarounds.
* [ ] Subscribe to TypeScript RFC discussions and major release highlights to anticipate breaking changes.
* [ ] Cross-reference ecosystem tooling docs (ESLint, Vite, ts-node, SWC) to ensure configurations remain compatible with TypeScript settings.
* [ ] Maintain an internal knowledge base of frequently referenced TypeScript resources and update it when new patterns emerge.

Adhering to this checklist keeps TypeScript codebases predictable, well-typed, and maintainable across teams.
