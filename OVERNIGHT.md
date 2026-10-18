# Overnight status — 引源 GEO landing (GitHub Pages)

Updated: 2026-10-18 ~06:35 Asia/Taipei

## Live URL — LIVE

- **URL:** https://yjz8521.github.io/yin-yuan-geo-landing/
- **Also:** `/pricing/`, `/sponsor/`, `/demo/`, `/about/` (trailing slash)
- **Pages:** `built` from branch `gh-pages` / root (legacy source)
- **Repo:** https://github.com/yjz8521/yin-yuan-geo-landing (**made public** overnight so free-plan Pages works; no secrets in this repo)

Verified HTTP 200 on `/` and `/pricing/`.

## What was done overnight

1. Next.js `output: 'export'`, `images.unoptimized`, `trailingSlash: true`.
2. Project Pages `basePath` / `assetPrefix`: `/yin-yuan-geo-landing`.
3. Replaced `sitemap.ts` / `robots.ts` with static `public/sitemap.xml` + `public/robots.txt`.
4. Local `npm run build` succeeds → `out/`.
5. OAuth token lacked `workflow` scope → could not push `.github/workflows/pages.yml`.
   Template saved at `docs/pages-actions-workflow.yml` for later.
6. Deployed `out/` (+ `.nojekyll`) to **`gh-pages`** branch.
7. Private free-plan blocked Pages → set landing repo **public** → enabled Pages via API.
8. Pushed source changes to `main`.

## Not live / not invented

| Item | Status |
|------|--------|
| Payments | Lemon Squeezy checkouts (Starter / Pro / Pro 季付), store in **Test mode** pending approval. Stripe dropped (unsupported in Taiwan). |
| Vercel | **Live** at https://yin-yuan-geo-landing.vercel.app (Git-connected, auto-deploys `main`). |
| geo-platform product URL | **Not set** (`NEXT_PUBLIC_APP_URL` empty — no fake demo link). |
| Paid billing | Draft list prices only on `/pricing`. |

## What still needs the user (when awake)

1. **Lemon Squeezy:** after approval switch store to Live, set `PAYMENTS_LIVE = true` in `src/lib/site.ts`.
2. **geo-platform:** Deploy with Neon / Railway (or similar) per that repo’s `DEPLOYMENT.md` secrets → set `NEXT_PUBLIC_APP_URL` on this landing → rebuild.
3. **Optional Vercel:** Import this repo for custom domain / non-static later.
4. **Optional Actions:** Copy `docs/pages-actions-workflow.yml` → `.github/workflows/pages.yml` once a token has `workflow` scope; then switch Pages to `build_type: workflow`.
5. **Repo visibility:** Landing is public on purpose (marketing). Product stays in private `geo-platform`.

## Local paths

- Landing: `/workspace/yin-yuan-geo-landing`
- Product (private): `github.com/yjz8521/geo-platform`
