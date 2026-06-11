# CECOS University Admission Portal

Welcome to the **CECOS University Admission Portal**! This project is a modern, fast, and fully responsive frontend web application designed to streamline the student application and discovery process. It provides prospective students with an intuitive way to explore programs, review fee structures, learn about scholarships, and begin their admission journey.

## 🚀 Key Features

- **Interactive Program Finder**: A step-by-step interactive quiz that helps prospective students find the right program based on their academic background and personal interests.
- **Comprehensive Fee Structure**: A built-in robust search and filtering system for viewing detailed semester-wise fee breakdowns for all undergraduate and postgraduate programs.
- **Dynamic Program Exploration**: Organized tabbed views separating Undergraduate and Postgraduate offerings, featuring more than 35+ diverse programs ranging from Engineering and Medical Sciences to Humanities and Business.
- **Beautiful & Modern UI**: Built with a focus on premium aesthetics using **TailwindCSS** and animated seamlessly with **Framer Motion**.
- **Responsive Design**: Carefully crafted to deliver a flawless user experience across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router · React Server Components) · [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme`)
- **UI primitives**: [shadcn/ui](https://ui.shadcn.com/) (new-york) + custom components
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / data**: [Supabase](https://supabase.com/) via [`@supabase/ssr`](https://supabase.com/docs/guides/auth/server-side) — reads run on the server (RSC)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/) (strict, `noUncheckedIndexedAccess`)
- **Tooling**: pnpm 10 · ESLint 9 · Prettier

### Prerequisites
- [Node.js](https://nodejs.org/) ≥ 22
- [pnpm](https://pnpm.io/) 10 (`npm install -g pnpm`)

Create a `.env.local` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Common scripts

```bash
pnpm dev          # start the dev server
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
```

## 📁 Project Structure

- `app/`: Next.js App Router — `layout.tsx` (root shell, fetches admission data), `page.tsx` (landing), and the `fees/`, `terms/`, `privacy/` routes.
- `components/`: Reusable UI components and page sections (e.g., `Hero`, `Programs`, `FeeStructure`, `Nav`), with shared primitives under `components/ui/`.
- `lib/`: Core logic including:
  - `data.ts`: Centralized static data store for programs, fees, scholarships, and testimonials.
  - `admission-data.ts`: Server-side Supabase read for the active admission cycle (RSC).
  - `supabase/`: `@supabase/ssr` server + browser client factories.
  - `i18n.tsx`: Custom hook and context for English/Urdu translations.
- `app/globals.css`: Global styles, design tokens, and the Tailwind v4 import.

## 📄 License

This project is proprietary to CECOS University.
