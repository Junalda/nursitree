# NursiTree — project guide

## Branching & deployment workflow (IMPORTANT)

Follow this workflow for **all** changes. Do not deviate without explicit
approval from the repository owner.

1. **Never push directly to `main`.** `main` is the production branch and is
   only updated by merging an approved `staging` branch into it.
2. **Do all work on the `staging` branch.** Create it from `main` (or continue
   the existing `staging`) and commit every change there.
3. **Deploy to a Vercel Preview first.** Pushing `staging` (or opening a PR)
   triggers an automatic Vercel **Preview** deployment. Share the preview URL
   for review.
4. **Merge into `main` only when the owner explicitly says "merge".** Never
   push, merge, or fast-forward into `main` on your own initiative — not even
   after a green preview. Default action for any change is: commit to `staging`
   and push for a preview, then stop and wait. Only the owner's explicit "merge"
   instruction moves it to `main` (production).

### Practical steps for a change

```bash
git checkout staging
# ...make changes, commit...
git push -u origin staging      # -> Vercel Preview deployment
# wait for owner approval of the preview, THEN (only when told):
# open/merge a PR from staging into main -> Vercel Production deployment
```

### Vercel configuration (dashboard — owner action)

- **Production Branch** should be set to `main` in
  *Vercel → Settings → Git*. Every other branch (including `staging`) then
  deploys as a Preview automatically.
- Environment variables must be present for all environments used:
  - `RESEND_API_KEY` (required for the contact form email; server-side only)
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (optional)

## Project overview

See `README.md` for the full stack, structure, scripts, and environment
variable details. In short: React 18 + Vite + TypeScript + Tailwind + shadcn/ui,
with a single Vercel serverless function at `api/contact.js` that sends the
contact form email via Resend.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:8080) + /api/contact dev middleware
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # eslint
```
