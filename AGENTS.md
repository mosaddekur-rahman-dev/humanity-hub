<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project
- Single-package Next.js 16 App Router app: community/volunteer site "Humanity Hub" (Dhaka, Bangladesh community events).
- Routes: `/` (home composed of `Banner`, `Features`, `UpcomingEvents`, `Gallery`, `Newsletter`), `/events` (live data), `/add-event` (client form), `/login` (client), and placeholders `/manage`, `/joined`. `src/app/layout.tsx` wraps every page with `Navbar` + `Footer` + `ToastContainer`.

## Commands
- Dev: `npm run dev`; build: `npm run build`; serve build: `npm run start`.
- Lint: `npm run lint` (runs plain `eslint` with flat config `eslint.config.mjs`; there is 1 known `<img>` warning in `Banner.tsx`).
- Typecheck: `npx tsc --noEmit` (no npm script; `strict: true`).
- No test suite, no CI config.

## Backend dependency (not this repo)
- `/events` (`src/app/events/page.tsx`) and `/add-event` POST (`src/app/add-event/page.tsx`) call a separate backend at `http://localhost:8000` (GET `/events` returns docs with Mongo-style `_id`; POST `/add-event`). This server is NOT in this repo; without it running, `/events` throws and `/add-event` submission fails. Don't "fix" these URLs by changing them unless asked.

## Structure
- `src/app/` routes + global styles; `src/components/{feature}/` feature folders; `src/components/ui/` shadcn primitives.
- `eventData.ts` lives at the REPO ROOT (not `src/`); `Gallery` imports it via relative path `../../../eventData`. New event data should use the same shape (`title`, `type`, `date`, `location`, `thumbnail`, `description`); `type` values must match `EVENT_TYPES` in `add-event/page.tsx`.
- Path alias `@/*` -> `./src/*` (tsconfig.json). Filesystem-absolute imports like `"/src/app/events/EventCard.tsx"` also appear and resolve — keep style consistent (use `@/`).

## Stack and config quirks
- Tailwind CSS v4 is CSS-first: no `tailwind.config.*`; theme/tokens live in `src/app/globals.css`. `next.config.ts` maps `*.css` through `@tailwindcss/turbopack`.
- shadcn/ui configured in `components.json`: style `base-nova`, base color `neutral`, css vars, primitives from `@base-ui/react` (not Radix). Add components with `npx shadcn add <name>`.
- `cn` comes from the `cn` package (re-exported by `src/lib/utils.ts`).
- `next.config.ts`: `reactCompiler: true` (React Compiler active); `cacheComponents` and `partialPrefetching` are OFF. Remote images are allowed only from `picsum.photos` and `images.unsplash.com` (add hostnames there for new remote image sources).

## Conventions
- Server components by default; `"use client"` only where needed (`MenuDropdown`, `/login`, `/add-event`).
- Icons from `lucide-react`; local images in `public/` (e.g. `public/images/humanityhublogo.jpg`).
