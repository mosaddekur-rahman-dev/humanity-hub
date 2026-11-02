<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
- Single-package Next.js 16 App Router app (no monorepo): community/volunteer site "Humanity Hub".
- Routes: `/` composes `Banner`, `Features`, `UpcomingEvents`, `Gallery`, `Newsletter`; `/add-event` is a placeholder. `src/app/layout.tsx` wraps every page with `Navbar` + `Footer`.

## Commands
- Install: `npm install`
- Dev (Turbopack): `npm run dev`
- Production build: `npm run build`
- Serve build: `npm run start`
- Lint: `npm run lint` (eslint-config-next; currently 0 errors, 1 `<img>` warning in `Banner.tsx`)
- Typecheck: `npx tsc --noEmit` (no npm script; `strict: true`)
- No test suite, no CI config, no test script in `package.json`.

## Structure
- `src/app/` routes and global styles; `src/components/{feature}/` feature folders; `src/components/ui/` shadcn primitives.
- `src/lib/utils.ts` re-exports `cn` from the `cn` package.
- Path alias `@/*` -> `./src/*` (see `tsconfig.json`).

## Stack and config quirks
- Tailwind CSS v4 is CSS-first: no `tailwind.config.*`; theme/tokens live in `src/app/globals.css`. Turbopack maps `*.css` to `@tailwindcss/turbopack` (see `next.config.ts`).
- shadcn/ui is configured in `components.json`: style `base-nova`, `rsc: true`, base color `neutral`, css vars. Primitives use `@base-ui/react`. Add components with `npx shadcn add <name>`.
- `cn` comes from the `cn` package; `src/lib/utils.ts` re-exports it. `src/components/ui/button.tsx` imports `cn` directly from `"cn"` (nonstandard but resolves).
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Consequences: avoid time/random values during render in client components; React Compiler is active.
- HeroUI migration is incomplete: `Navbar.tsx`, `MenuDropdown.tsx`, and `globals.css` still import `@heroui/react` / `@heroui/styles`, but `package.json` no longer declares them (they show as extraneous in `node_modules`). A fresh `npm install` removes them and breaks the build. Either restore those deps or finish migrating to shadcn/base-ui.

## Build notes
- `cacheComponents` rejects time-based values during prerender. `Footer.tsx` is a server component with a hardcoded copyright year (2026) for this reason; do not reintroduce `new Date()` there.
- `Footer` has no client-only features; keep it a server component.

## Conventions
- Server components by default; `"use client"` only where needed (`MenuDropdown`, and form pages such as `add-event`).
- Icons from `lucide-react`; images in `public/` (e.g. `public/images/humanityhublogo.jpg`).
- Footer links reference routes not yet implemented (`/events`, `/events/create`, `/about`, `/contact`, `/login`).
