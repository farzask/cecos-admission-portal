

# BRAND.md — CECOS University Admission Portal

<!-- Revised: 2026-05-19 — "Warm Editorial" direction locked. -->
<!-- Source: visual analysis of brand/cecos/ + brand/cdgai/ logos + product context -->

## Direction: Warm Editorial

Gen-Z friendly. Confident. Tactile. Warm.

The portal feels like a **welcoming campus letter**, not a tax form. The student is 17, nervous, applying to university with a parent looking over their shoulder. The UI needs to be:

- **Warm enough** that the student feels welcomed and confident
- **Clean enough** that the parent trusts it with fees and CNIC data
- **Distinctive enough** that it doesn't look like every other AI-generated admission portal

Reference DNA (in priority): **Linear · Clerk · Cal.com** (white-background productivity tools) · **Notion · Framer · Posthog** (warmth-via-stickers).

If a screen feels cold and corporate → not warm enough. If it feels noisy or playful in the wrong places → too far. The target is "the friendliest serious thing on the internet."

---

## The six moves (the formula)

Every screen in this product follows these six rules. They are non-negotiable.

1. **Pure white background** (`--bg-default` = `#FFFFFF`). Cards have a 1px ink-200 border + subtle shadow to separate from the page — they're not layered on paper, they sit on white and differentiate via border.
2. **Two accent colors only:** crimson (`--color-crimson-800` for CTAs) and warm sand (`--color-sand-400` for stickers/highlight blocks). No third color, no gradients.
3. **One big serif display moment per screen.** Instrument Serif headline ("Let's get you in.") with the rest in Inter. Never serif on every heading.
4. **Bigger softer corners.** Cards `rounded-2xl` (20px), buttons `rounded-xl` (14px). Reads younger and more tactile than 8px corners.
5. **One sticker per screen.** A small slightly-rotated badge (sand background, ink text) that anchors the screen's personality. Examples: `CECOS · INTAKE 2026`, `✨ YOU'RE IN`, `STEP 2 OF 4`.
6. **Confident warm copy.** The portal *talks* to the student. "Let's get you started" not "Create your account." "Almost there" not "Complete your profile."

---

## Colors

| Token                 | Hex       | Usage                                                                   |
| --------------------- | --------- | ----------------------------------------------------------------------- |
| `--bg-default`        | `#FFFFFF` | **Page background.** Pure white. Cards distinguish via border + shadow. |
| `--surface-white`     | `#FFFFFF` | Card surfaces. Modals. Inputs.                                          |
| `--surface-cream`     | `#FAF7F2` | Reserved for small callout fills only (rare).                           |
| `--color-ink-950`     | `#1A1612` | **Primary text** — warm-toned ink black (not cold #0A0A0A)              |
| `--color-ink-800`     | `#2E2823` | Body text                                                               |
| `--color-ink-600`     | `#5A524A` | Secondary text, muted labels                                            |
| `--color-ink-400`     | `#9A9087` | Placeholder, metadata                                                   |
| `--color-ink-300`     | `#C9C0B4` | Strong borders, separators                                              |
| `--color-ink-200`     | `#E2DBCF` | Default borders, dividers                                               |
| `--color-ink-100`     | `#EFE9DD` | Hover surfaces                                                          |
| `--color-crimson-900` | `#5C1212` | CTA active press, link active                                           |
| `--color-crimson-800` | `#7A1818` | **Primary CTA default** — the brand button color                        |
| `--color-crimson-700` | `#8C1B1B` | Primary links, logo accent                                              |
| `--color-crimson-600` | `#A82222` | CTA hover, link hover                                                   |
| `--color-crimson-500` | `#C42828` | Focus rings                                                             |
| `--color-sand-500`    | `#EBBE5E` | Sticker badges (text + active states)                                   |
| `--color-sand-400`    | `#F4D58D` | **Sticker badge background.** Highlight blocks. The warm accent.        |
| `--color-sand-200`    | `#FAEDD0` | Soft highlight fills, success-adjacent backgrounds                      |
| `--color-success-600` | `#4A9D5F` | Verified badges (warm green, not cold)                                  |
| `--color-success-50`  | `#EAF6EC` | Success banner background                                               |
| `--color-warning-600` | `#C48A2F` | Unverified state, photo flag                                            |
| `--color-error-600`   | `#C0392B` | Validation errors (warm red, not cold)                                  |
| `--color-error-50`    | `#FBEEE9` | Error banner background                                                 |
| `--color-fire-600`    | `#C91919` | CDGAI footer attribution only                                           |

### Color usage rules

**Crimson** appears only on: primary buttons, primary links, focus rings, logo accent, hand-drawn underline on one key word per hero headline.

**Sand** appears only on: sticker badges, highlight blocks (e.g., "Important" callouts), the underline behind active tab labels.

**Backgrounds are pure white (`#FFFFFF`).** Cards are also white — distinguished via 1px ink-200 border + subtle shadow (Linear / Clerk pattern). No tinted backgrounds. No gradients. No pink. No off-white/cream as page background.

---

## Typography

| Token            | Value                                | Usage                                                   |
| ---------------- | ------------------------------------ | ------------------------------------------------------- |
| `--font-display` | `'Instrument Serif', Georgia, serif` | One hero headline per screen. Optional on internal pages. |
| `--font-sans`    | `'Inter', system-ui, sans-serif`     | Default — headings, body, labels, UI                    |
| `--font-mono`    | `'JetBrains Mono', monospace`        | CNIC, Admission ID, sticker text, metadata captions     |

### Scale

| Token            | Size / Line-height | Usage                                       |
| ---------------- | ------------------ | ------------------------------------------- |
| `--text-hero`    | `3.25rem / 1.0`    | Hero serif headline (desktop)               |
| `--text-hero-sm` | `2.25rem / 1.05`   | Hero serif headline (mobile)                |
| `--text-h1`      | `1.75rem / 1.2`    | Page H1 in Inter (when not using hero)      |
| `--text-h2`      | `1.375rem / 1.3`   | Section heads                               |
| `--text-h3`      | `1.0625rem / 1.4`  | Card titles                                 |
| `--text-body-lg` | `1.0625rem / 1.6`  | Subtitles under hero, form intro            |
| `--text-body`    | `0.9375rem / 1.55` | Default body, form labels (15px)            |
| `--text-sm`      | `0.8125rem / 1.5`  | Help text                                   |
| `--text-xs`      | `0.75rem / 1.4`    | Sticker text, captions                      |

**Weight convention:** `400` body · `500` labels/UI · `600` Inter headings · `400` display serif (Instrument Serif is naturally heavy at 400, don't bold it).

**Tracking:** body and headings at default. Hero serif at `tracking-tight` (-0.02em). Mono sticker text at `tracking-wide` (0.06em), uppercase.

---

## The sticker system

Every screen has exactly one sticker. It's the screen's signature.

**Visual spec:**
- Background: `--color-sand-400` (#F4D58D)
- Text: `--color-ink-950`, JetBrains Mono, 11px, uppercase, `tracking-wide`
- Padding: `6px 12px`
- Radius: `rounded-md` (8px)
- Rotation: subtle, between `-2deg` and `+3deg` — feels stuck on by hand
- Shadow: very subtle `0 2px 6px rgba(26, 22, 18, 0.08)`
- Position: top-right of card OR floating near hero headline

**Voice examples:**
- Signup screen: `CECOS · INTAKE 2026`
- OTP screen: `STEP 2 OF 4`
- Identity step: `ALMOST THERE`
- Success/onboarded: `✨ YOU'RE IN`
- Dashboard: `🇵🇰 PAKISTAN APPLICANT`
- Verification banner: `1 STEP LEFT`

Stickers can include one emoji max. Never two. Never zero (unless the copy doesn't call for it).

---

## Buttons (tactile, chunky)

Buttons are the most-touched element. They feel **physical**.

### Primary
- Background: `--color-crimson-800`
- Text: white, Inter Semibold, 15px
- Height: `48px` (h-12) — bigger than typical, feels chunky
- Radius: `rounded-xl` (14px)
- Padding: `12px 20px`
- Shadow: `0 2px 0 0 var(--color-crimson-900)` — a hard 2px shadow underneath, like the button sits on top of its base
- Hover: background `--color-crimson-600`, lift `-translate-y-[1px]`, shadow becomes `0 3px 0 0 var(--color-crimson-900)`
- Active: `translate-y-[1px]`, shadow collapses to `0 1px 0 0 var(--color-crimson-900)` — button presses down

### Secondary
- Background: `--surface-white`
- Border: 1.5px solid `--color-ink-200`
- Text: `--color-ink-950`
- Same dimensions, same hard-shadow treatment but with `--color-ink-300` as the shadow color
- Hover: background `--color-ink-100`

### Google
- Background: white, 1.5px `--color-ink-200` border, multi-color G logo left, "Continue with Google" in ink-950
- Same chunky shadow treatment as secondary

**No glow shadows. No gradient backgrounds. The hard-shadow press effect is the only button "trick" we use.**

---

## Inputs

- Background: `--surface-white`
- Border: 1.5px solid `--color-ink-200`
- Radius: `rounded-xl` (14px) — matches buttons
- Height: `48px` (h-12)
- Padding: `12px 16px`
- Text: Inter, 15px, `--color-ink-950`
- Placeholder: `--color-ink-400`
- Focus: border `--color-crimson-500`, ring `0 0 0 4px rgba(196,40,40,0.12)`, no jump
- Error: border `--color-error-600`, ring `0 0 0 4px rgba(192,57,43,0.12)`

Labels sit ABOVE inputs (never floating). Inter Medium, 13px, `--color-ink-800`, `mb-2`.

---

## Cards

- Background: `--surface-white`
- Border: 1px solid `--color-ink-200`
- Radius: `rounded-2xl` (20px)
- Shadow: `0 1px 2px rgba(26,22,18,0.04), 0 8px 24px -16px rgba(26,22,18,0.08)`
- Padding: `32px` default, `24px` on mobile
- Auth card max-width: **420px**

---

## Spacing

Generous. Default toward more whitespace.

| Token                  | Value           | Usage                              |
| ---------------------- | --------------- | ---------------------------------- |
| `--gap-field`          | `20px`          | Between form fields                |
| `--gap-group`          | `32px`          | Between form sections              |
| `--card-pad`           | `32px`          | Card internal padding (desktop)    |
| `--card-pad-mobile`    | `24px`          | Card internal padding (mobile)     |
| `--page-pad-y`         | `48px`          | Vertical page padding              |

---

## Motion

Soft springs. Tactile. Never decorative.

| Interaction      | Spec                                                                |
| ---------------- | ------------------------------------------------------------------- |
| Button press     | translate-y 1px, hard-shadow collapses, 120ms ease-out              |
| Button hover     | translate-y -1px, shadow grows by 1px, 150ms ease-out               |
| Input focus      | border + ring fade-in, 120ms ease-out                               |
| Card mount       | fade + 8px translateY-up, 280ms `cubic-bezier(0.22, 1, 0.36, 1)`    |
| Sticker mount    | scale 0.85 → 1 + rotate target, 320ms spring (stiffness 220, damping 18) |
| Success moment   | sticker scale-up bounce, optional small confetti burst              |
| Toast enter      | slide-in from top, 240ms `cubic-bezier(0.32, 0.72, 0, 1)`           |

**No drifting backgrounds, no pulsing dots, no staggered hero reveals.** The button press and the sticker bounce are the entire motion personality. Respect `prefers-reduced-motion` — strip transforms, keep opacity.

---

## Copy voice (the warm friend)

The portal speaks like a warm older sibling who happens to work in admissions. Direct, friendly, clear, never condescending. No "Welcome to the CECOS University Admission Portal" stiffness.

| Default (cold)                       | Warm Editorial (✓)                    |
| ------------------------------------ | -------------------------------------- |
| Create your account                  | Let's get you in.                      |
| Sign in to continue                  | Welcome back.                          |
| Enter your verification code         | Quick — pop the code below.            |
| Submission successful                | You're in. 🎉                          |
| Please complete your profile         | Just a few more details.               |
| Phone number is required             | We'll need your number for this.       |
| Password is too weak                 | Let's make this a bit stronger.        |
| Application submitted                | Done! We've got everything.            |
| Verify your email                    | One quick step — verify your email.    |
| Session expired                      | You've been signed out for a bit.      |

**Rules:**
- Contractions allowed and encouraged ("we'll", "let's", "you're")
- One exclamation point per screen, max. Two is begging.
- Emojis allowed in stickers, in success states, in one micro-moment per screen. Never in form labels.
- Avoid "please" — it makes the portal sound subordinate.
- Active voice always.

---

## Anatomy of an auth screen (the canonical example)

The signup screen, top to bottom:

1. **Top bar:** CECOS logo top-left. Language toggle (EN | اردو) top-right. No border underneath — sits directly on paper.
2. **Card:** centered, white, `rounded-2xl`, max-width 420px.
3. **Inside the card, top-right corner:** the sticker (rotated `-2deg`, sand background, mono uppercase text "CECOS · INTAKE 2026").
4. **Hero headline:** Instrument Serif, "Let's get you in." — with a 3px crimson hand-drawn underline (slight wobble SVG path) under the word "in".
5. **Subtitle:** Inter, ink-600, "Pick how you'd like to sign up. You can change it later."
6. **Three buttons stacked** with `gap-3`: primary crimson "Continue with email", primary crimson but darker "Continue with WhatsApp", "or" divider, secondary "Continue with Google".
7. **Footer line inside the card:** "Already with us?" + crimson link "Log in".
8. **Page footer:** very small ink-400 row with Privacy · Terms · Help · © CECOS 2026 · Built by CDGAI.

That's the whole vocabulary. Every other auth screen is a variation of this anatomy.

---

## Forbidden patterns

- Off-white / cream / paper page backgrounds — we use pure white now
- Pink, peach, or rose backgrounds anywhere — use sand only for stickers/highlight blocks
- Gradients of any kind on any surface
- Decorative glow shadows on buttons
- Heading serifs on every page — one per screen, max
- Multiple stickers on one screen
- Stiff/corporate copy ("Welcome to the CECOS University...", "Please proceed by...")
- Stock 3D illustrations (Storyset / Lottie-style)
- Mascot characters
- More than one emoji per screen
- Asymmetric editorial split layouts on auth screens — auth is a centered card
- Hover effects on non-interactive elements

---

## Responsive

- **Mobile (< 640px):** Centered card, 16px horizontal page padding, 24px card padding. Hero serif at `--text-hero-sm`. Sticker stays in top-right of card.
- **Tablet/Desktop (≥ 640px):** Centered card, max-width 420px. Hero serif at `--text-hero`. Optional: real student/campus photo on the right of the card on screens ≥ 1280px (decorative, never essential).

---

## Logo

- **On paper backgrounds:** `brand/cecos/cecos-logo-original.png` (crimson + black)
- **Typographic fallback:** `components/brand/CecosLogo.tsx` — small crimson square + "CECOS" in Inter Semibold, used in headers
- **Minimum size:** 120px wide
- **Never:** recolor, stretch, add drop shadow

### Dual-brand
- Header/nav: CECOS only
- Footer: small "Built by CDGAI" in ink-400, with `--color-fire-600` reserved only for this attribution

---

## Summary for the next agent

**Warm Editorial = paper background + crimson CTAs + sand stickers + one serif moment + tactile chunky buttons + warm direct copy.**

If you take only one thing from this doc: the screen should feel like a friend wrote you a letter on nice paper, not like a government form. Build accordingly.


