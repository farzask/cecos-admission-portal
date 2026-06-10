# Tech Stack & Frontend Structure

CECOS University Admission Portal — a bilingual (EN/UR) Next.js + Supabase admissions system. This doc covers the **frontend**: what's installed, how the code is laid out, and where to find things. For data/DB rules see [lib/supabase/CLAUDE.md](lib/supabase/CLAUDE.md); for the milestone map and contract rules see [CLAUDE.md](CLAUDE.md).

---

## Stack at a glance

| Layer            | Choice                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- |
| Framework        | **Next.js 16** (App Router) · React 19 · TypeScript 6 (strict, `noUncheckedIndexedAccess`, no `any`) |
| Styling          | **Tailwind CSS v4** — CSS-first `@theme` in [app/globals.css](app/globals.css) (no `tailwind.config`) |
| UI primitives    | **shadcn/ui** (new-york style) + custom primitive layers (`components/forms`, `components/director/ui`) |
| Icons / motion   | `lucide-react` · `framer-motion`                                                     |
| Forms / validation | `react-hook-form` + `@hookform/resolvers` · **Zod v4**                             |
| Toasts           | `sonner`                                                                             |
| Charts           | `recharts` (director dashboards)                                                     |
| Tables / DnD     | `@dnd-kit/*` (sortable lists)                                                        |
| Backend / auth   | **Supabase** (`@supabase/ssr`, `@supabase/supabase-js`) — Postgres + Auth (ES256 JWT, verified locally) |
| Server logic     | **Server Actions** for mutations · **RSC** for reads · client islands for interactivity |
| Integrations     | PayPro (payments) · ImageKit (uploads) · AWS SES (`@aws-sdk/client-ses`) email · `@mediapipe/tasks-vision` (AI photo-check) · Anthropic / OpenAI SDKs |
| Excel export     | `exceljs`                                                                            |
| Tooling          | pnpm 10 · Node ≥22 · ESLint 9 + Prettier · Vitest (unit/integration) · Playwright (e2e) · Husky + lint-staged |

> **Stack is frozen** — no library substitutions, no new deps without asking. Adding one means touching a frozen contract.

### Common scripts

```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint .
pnpm test         # vitest run (unit)
pnpm test:e2e     # playwright (chromium)
```

---

## Top-level layout

```
.
├── app/              # Next.js App Router — all routes, layouts, API handlers
├── components/       # React components (shared + per-module)
├── lib/              # non-UI logic: server actions, data access, i18n, integrations, supabase factories
├── proxy.ts          # root request gating (Next 16 renamed middleware.ts → proxy.ts)
├── public/           # static assets (incl. MediaPipe model in public/models/)
├── supabase/         # migrations + the generated Database type (source of truth for shapes)
├── tests/ · e2e/     # vitest + playwright
└── *.md / PLANS/     # milestone plans, reports, conventions
```

There is **no `middleware.ts`** — Next.js 16 uses `proxy.ts`. (`lib/supabase/middleware.ts` exists but is dead code — don't import it.)

---

## `app/` — routes & route groups

Routes are organized by **route group** `(name)` (groups don't appear in the URL) and by surface. Each leaf folder typically holds `page.tsx`, an optional `_components/` (route-local client islands), and `_actions/` (route-local Server Actions).

```
app/
├── layout.tsx · page.tsx · globals.css   # root shell, landing page, theme
│
├── (auth)/                # Student auth — login, signup, OTP verify, onboarding/identity,
│   │                      #   password reset, account-conflict, session-expired
│   ├── _actions/          # auth Server Actions (e.g. logInWithGoogle.ts)
│   └── _components/        # shared auth UI
│
├── student/
│   ├── apply/             # 8-step application flow — one folder per step:
│   │   │                  #   level · personal · contact · address · parents · academic ·
│   │   │                  #   programs · conditional · documents · review · payment · success
│   │   ├── _actions/      # apply Server Actions (incl. payment.ts)
│   │   └── _components/    # step shells, draft autosave, etc.
│   ├── dashboard/         # student home + verification
│   └── settings/account/  # account settings
│
├── staff/                 # Office workflow (Google OAuth + PIN gated)
│   ├── sign-in/ · pin-setup/      # staff auth
│   ├── reception/ · helper/ · cash/ · finance/   # role workbenches
│   ├── supervisor/ · audit/ · backfill/ · admin/allowlist/
│
├── (director)/director/   # Director's Dashboard (M6) — Warm-Editorial design system
│   ├── dashboard/ · applications/ · cycles/ · disciplines/ · eligibility/
│   ├── broadcasts/ · banner/ · leads/ · form-config/ · oracle/ · oversight/
│   └── finance/           # fees · ledger · reconciliation · refunds · reports · shifts · collectors
│
├── tv/ · kiosk/           # queue display + self-service kiosk
├── pay/                   # PayPro return + receipt status pages
│
├── api/                   # Route Handlers (where a Server Action won't do)
│   ├── applications/      # draft-save, submit, photo-check, upload, email-OTP
│   ├── paypro/uis/        # PayPro push callback (fail-closed)
│   ├── cron/              # drain-notifications, dispatch-scheduled-broadcasts, idle-reminders, reconcile-payments
│   ├── director/ · supervisor/ · tv/   # polled read endpoints (4s/30s)
│   ├── staff-auth/ · helper/ · profile/ · auth/
│
├── auth/callback/         # single OAuth callback (branches student/staff)
└── dev/                   # dev-only helpers (otp-inbox)
```

**Conventions:**

- `_components/` and `_actions/` (underscore prefix) are **route-private** — not routable, colocated with the page that uses them.
- Mutations → **Server Actions** (in `_actions/`). Reads → **RSC** (`page.tsx` runs on the server). Interactivity → small `"use client"` islands.
- Live UI updates use **polling, not Realtime** (`/api/tv/state`, `/api/supervisor/state` every 4s).

---

## `components/` — shared & module UI

```
components/
├── ui/            # canonical shadcn primitives (regenerate, don't hand-edit) — ErrorSummary, RadioCard
├── forms/         # the form primitive library (40 files) — TextField, Select, OtpInput, FileUploader,
│                  #   MaskedInput, DatePicker, Pill, StepNav, GuidedTour, LanguageToggle, …
├── apply/         # application-flow components (step shells under apply/shell/)
├── auth/          # auth screens (GoogleAuthButton, etc.)
├── dashboard/     # student dashboard widgets
├── director/      # director surfaces
│   └── ui/        # Warm-Editorial design system (button, card, charts, data-table, stat-card,
│                  #   modal, tabs, page-header, pill, states) — import via components/director/ui
├── staff/ · helper/   # office-workflow UI
├── brand/         # logos / brand marks
└── shared/        # cross-module (network-status, pin-reauth-modal, staff-shell)
```

> **Heads-up on shadcn:** `components/ui/` only holds a couple of project primitives. The real reusable form layer lives in **`components/forms/`**, and the director module has its own design-system layer in **`components/director/ui/`**. Frozen UI (Magic Patterns screens, shadcn primitives) is wired as-is — flag a mismatch rather than reshape it.

---

## `lib/` — logic (non-UI)

```
lib/
├── supabase/      # server/client/admin factories + GENERATED Database types (the contract — never hand-edit)
├── i18n/          # EN + UR JSON per surface + loader/context/use-language hook
├── shared/        # withRetry, ActionResult, logAudit, todayKarachi, withAuth, safeLog
├── apply/ + applications/ + application/   # application-form logic, per-step completion, edit-gate
├── staff-auth/    # guards, schemas, hooks, idle re-auth
├── office-workflow/   # cycle-config, cnic-mask, queue/cash helpers
├── director/      # director feature logic — cycles, phases, disciplines, eligibility, finance/*,
│                  #   broadcasts, banners, nurture, oracle, oversight, roster, dashboard
├── integrations/  # paypro · imagekit · (email/whatsapp adapters)
├── email/         # SES + react-email templates
├── audit/ · rate-limit/ · validation/ · zod/ · hooks/ · errors/ · theme/
└── (legacy single-purpose dirs: actions, banners, cycle, data, helper, log, notifications, photo-check, staff)
```

The **generated Supabase `Database` type** (under `lib/supabase/`) is the single source of truth for every shape crossing a boundary. Change a shape by writing a migration and regenerating types — never by hand-editing the type or inventing a column/endpoint.

---

## Styling & theme

- **Tailwind v4, CSS-first.** All design tokens live in the `@theme` block of [app/globals.css](app/globals.css) — there is no `tailwind.config.js`.
- **Brand tokens** (see [BRAND.md](BRAND.md)): Crimson `#7A1818` / `#8c1b1b`, sand `#F4D58D`, warm "ink" greys. Fonts — **Instrument Serif** (display), **Inter** (sans), **JetBrains Mono** (all IDs / amounts / CNIC / receipts).
- Status colors go through the brand `Pill` tones, not raw Tailwind palette colors.

---

## Bilingual (EN / UR)

- Every visible string ships EN + UR. **Layout stays LTR** for both (the director module uses logical properties + `dir`-aware layout for RTL).
- Strings live in `lib/i18n/<module>.{en,ur}.json`; new strings get an EN value and a `[UR]` placeholder until a native reviewer fills it.
- **No hardcoded copy** — microcopy lives in i18n JSON. Numerals are Latin digits in both languages.

---

## Conventions worth knowing

- **No `localStorage` / `sessionStorage`** — use React state, URL params, cookies, or the DB.
- **Service-role Supabase** is fenced by an ESLint boundary — only allowed in `_actions/`, `api/`, `route.ts`, `dev/`.
- **Every mutation** is wrapped in `withRetry` (network errors only) and writes to the audit log.
- **Staff actions** re-check a 30-min PIN-auth window (`requirePinAuthFresh()`); stale → re-auth modal.
- Path aliases: `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`.

See [CONVENTIONS.md](CONVENTIONS.md) for the full list.
