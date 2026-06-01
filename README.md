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
├── api/                    # Vercel serverless functions
│   └── contact.js          # POST /api/contact — sends the form email via Resend
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

Credentials are read from environment variables (they are **not** hardcoded in
source). Create a local `.env`:

```bash
cp .env.example .env
```

Then fill in:

```
# Optional: only used to also persist submissions to a Supabase "contacts" table
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Required for the contact form to send email (server-side only — no VITE_ prefix)
RESEND_API_KEY=your-resend-api-key
```

> **`RESEND_API_KEY` is a server-side secret.** It deliberately has **no**
> `VITE_` prefix, so Vite never bundles it into the browser. It is read only by
> the serverless function `api/contact.js`. The sending domain (`nursitree.com`)
> must be **verified in Resend** so that `noreply@nursitree.com` is allowed as
> the `From` address.
>
> The Supabase **anon** key is a public, browser-safe key protected by Row
> Level Security and is meant to be shipped to the client. It is optional here
> (used only to also store submissions in a `contacts` table). **Never** put a
> Supabase *service role* key or any true secret in a `VITE_` variable — those
> are bundled into the frontend and would be publicly exposed.

The whole site renders fully without any of these variables; only the contact
form's email send requires `RESEND_API_KEY`.

### Contact form / email (Resend)

The contact form (`src/components/ContactSection.tsx`) POSTs the submission as
JSON to `POST /api/contact`. The serverless function `api/contact.js`:

- validates the required fields (`name`, `email`, `company`, `message`),
- sends the email via **Resend** to `info@nursitree.com`,
  from `NursiTree <noreply@nursitree.com>`, with `Reply-To` set to the
  submitter's email and subject `Nieuw contactformulier bericht`,
- includes all submitted values (Naam, E-mail, Bedrijf, Telefoon, Type project,
  Bericht, Timestamp),
- returns `{ "success": true }` on success or `{ "error": "…" }` on failure.

The success UI only appears after Resend confirms the send. Technical errors are
logged server-side only; the browser always shows a friendly Dutch message.

During `npm run dev`, a small dev-only Vite middleware (in `vite.config.ts`)
mounts the same handler at `/api/contact` so the form can be tested locally. In
production Vercel serves `api/contact.js` natively and that middleware is not
involved.

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

This is a Vite SPA plus one serverless function (`api/contact.js`). To deploy
on Vercel:

1. Import the repository into Vercel.
2. Vercel auto-detects Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Add the environment variables under **Settings → Environment Variables**:
   - `RESEND_API_KEY` *(required for the contact form email)*
   - `VITE_SUPABASE_URL` *(optional)*
   - `VITE_SUPABASE_ANON_KEY` *(optional)*
4. In **Resend**, verify the `nursitree.com` domain so `noreply@nursitree.com`
   can be used as the sender.
5. Deploy.

Vercel automatically builds `api/contact.js` as a serverless function at
`/api/contact` — no extra configuration needed. `vercel.json` only rewrites
non-API paths to `index.html` so client-side routes (`/platform`, `/diensten`,
…) resolve on direct navigation and refresh; `/api/*` is left untouched.
