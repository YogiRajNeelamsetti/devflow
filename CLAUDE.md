# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevFlow is a StackOverflow-style Q&A platform built with Next.js 16 (App Router) and React 19. Currently in early development — authentication and UI shell are implemented, but no database or backend logic exists yet.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint (flat config)
npm start        # Start production server
```

No test framework is configured yet.

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript 5** (strict mode, `@/*` path alias maps to project root)
- **Tailwind CSS v4** with class-based dark mode, custom design tokens in `tailwind.config.ts`
- **shadcn/ui** (new-york style, RSC-enabled) — CLI installed as dev dep
- **Auth.js / next-auth v5 beta** — GitHub + Google OAuth (`auth.ts`)
- **react-hook-form + Zod v4** for form handling/validation
- **next-themes** for light/dark/system theming
- **Radix UI** primitives, **Lucide React** icons, **Devicons** CDN for tech tags

## Architecture

### Route Groups

- `app/(root)/` — Main app layout with `NavBar`, `LeftSideBar`, `RightSideBar`. Contains all app pages (home, ask-question, collection, community, jobs, tags, profile/[id]).
- `app/(auth)/` — Auth layout (centered card + `SocialAuthForm`). Contains sign-in and sign-up pages.
- `app/api/auth/[...nextauth]/` — NextAuth catch-all API route.

### Key Directories

- `components/forms/` — `AuthForm` (generic, type-safe form using react-hook-form) and `SocialAuthForm` (OAuth buttons)
- `components/navigation/` — `LeftSideBar`, `RightSideBar`, `NavBar`, `MobileNavigation` (Radix Sheet), `NavLinks`, `Theme`
- `components/ui/` — shadcn/ui primitives (do not manually edit; use `npx shadcn add`)
- `constants/` — `ROUTES` object for typed route paths, `sidebarLinks` array, `techMap` for devicon class mappings
- `lib/validations.ts` — All Zod schemas (sign-in, sign-up, question, answer, vote, etc.) — many are forward-looking for planned features
- `lib/utils.ts` — `cn()` (clsx + twMerge) and `getDeviconClassName()`
- `context/ThemeProvider.tsx` — Client wrapper around next-themes

### Patterns

- **Client vs Server**: Components using hooks/interactivity have `"use client"` directive. Layouts and pages are server components by default (async).
- **Route constants**: Always use the `ROUTES` object from `constants/route.ts` instead of raw route strings.
- **Utility classes**: `globals.css` defines many semantic Tailwind utilities via `@utility` — paired light/dark classes (e.g., `background-light850_dark100`, `text-dark100_light900`), typography scales (`h1-bold`, `base-medium`, `paragraph-regular`), and layout helpers (`flex-center`, `flex-between`, `card-wrapper`).
- **Generic form component**: `AuthForm` is parameterized over `FieldValues` and renders fields dynamically from `Object.keys(defaultValues)`.

### Authentication

Config in `auth.ts` → exported handlers used in API route and middleware. `proxy.ts` at root re-exports `auth` as Next.js middleware. Session is fetched server-side in root layout and passed to `SessionProvider`.

### Environment Variables

Required in `.env.local`:
- `AUTH_SECRET` — NextAuth JWT secret
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — GitHub OAuth credentials
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials

## State of Development

No database/ORM is wired up yet. `RightSideBar` data is hardcoded. The validation schemas in `lib/validations.ts` define models (User, Account, Question, Answer, Vote, Collection, Interaction) that anticipate a database layer. No tests exist yet.
