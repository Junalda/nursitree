# NursiTree

Marketing website for **NursiTree** — gestandaardiseerde groeiplaatsen voor bomen in de stad (smart growing-places for urban greening).

This is a faithful 1:1 rebuild of the original Famous.ai export in a clean, maintainable codebase. The layout, colors, typography, images, spacing, sections, animations, copy and responsive behavior (desktop / tablet / mobile portrait / mobile landscape) are preserved exactly as in the original.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (build tooling / dev server)
- **Tailwind CSS** + **tailwindcss-animate** + **@tailwindcss/typography**
- **shadcn/ui** (Radix UI primitives) for UI components
- **React Router v6** for client-side routing
- **TanStack Query** for data/query management
- **Supabase JS** for the contact form (insert + edge function email)
- **Lucide React** icons

## Project structure

```
.
├── public/                 # Static files served as-is (favicon, robots.txt, sitemap, manifest)
├── src/
│   ├── assets/             # Local assets (images are CDN-hosted, see "Assets" below)
│   ├── components/         # Shared + section components
│   │   ├── platform/       # Platform page sections
│   │   ├── diensten/       # Diensten (services) page sections
│   │   ├── zowerkthet/     # "Zo werkt het" page sections
│   │   └── ui/             # shadcn/ui primitives
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom hooks (use-mobile, useScrollAnimation, use-toast)
│   ├── lib/                # Utilities + Supabase client
│   ├── pages/              # Route-level pages
│   ├── App.tsx             # App shell + routes
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind layers + global styles
├── index.html
├── vercel.json             # SPA rewrite config for Vercel
├── vite.config.ts
└── tailwind.config.ts
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/diensten` | Diensten (Services) |
| `/onze-visie` | Onze visie (Vision) |
| `/over-ons` | Over ons (About) |
| `/platform` | Platform |
| `/zo-werkt-het` | Zo werkt het (How it works) |
| `/producten` | Producten (Products) |
| `/projecten` | Projecten (Projects) |
| `/algemene-voorwaarden` | Algemene voorwaarden (Terms) |
| `/privacyverklaring` | Privacyverklaring (Privacy) |
| `/cookiebeleid` | Cookiebeleid (Cookies) |
| `*` | 404 Not Found |

## Assets

All images, videos and the favicon are hosted on the original CloudFront CDN
(`https://d64gsuwffb70l.cloudfront.net/...`) and are referenced by their full
URLs in the components. No assets were modified or replaced. The `public/`
folder contains only the static metadata files (favicon.svg, robots.txt,
sitemap.xml, site.webmanifest).

## Getting started

### Prerequisites

- Node.js 18+ (Node 20 LTS recommended)
- npm 9+

### Install

```bash
npm install
```

### Environment variables

The contact form talks to Supabase. Credentials are read from environment
variables (they are **not** hardcoded in source). Create a local `.env`:

```bash
cp .env.example .env
```

Then fill in:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> The Supabase **anon** key is a public, browser-safe key protected by Row
> Level Security and is meant to be shipped to the client. It is kept in env
> vars only so it is not committed to the repo. **Never** put a Supabase
> *service role* key or any true secret in a `VITE_` variable — those are
> bundled into the frontend and would be publicly exposed.

The rest of the site renders fully without these variables; only the contact
form submission needs them.

### Develop

```bash
npm run dev
```

Vite serves the site at `http://localhost:8080`.

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment (Vercel)

This is a static SPA. To deploy on Vercel:

1. Import the repository into Vercel.
2. Vercel auto-detects Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Add the environment variables under **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

`vercel.json` rewrites all paths to `index.html` so client-side routes
(`/platform`, `/diensten`, …) resolve correctly on direct navigation and
page refresh.

The same setup works on Netlify or any static host — just serve `dist/` and
add a SPA fallback to `index.html`.
