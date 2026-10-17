# Overnight status — 引源 GEO landing (GitHub Pages)

Updated: 2026-10-18 (Asia/Taipei)

## Live URL

- **Expected project Pages URL:** https://yjz8521.github.io/yin-yuan-geo-landing/
- **Status at write time:** deploying via `gh-pages` branch (legacy Pages source).
- Check: Settings → Pages; branch `gh-pages` / root.
- Optional later: copy `docs/pages-actions-workflow.yml` → `.github/workflows/pages.yml` with a token that has `workflow` scope.

If the first deploy fails because the repo is **private** and the account lacks Pages for private repos, either make the repo public or upgrade GitHub, then re-run the workflow.

## What was done overnight

1. Next.js static export (`output: 'export'`, `images.unoptimized`, `trailingSlash`).
2. Project Pages `basePath` / `assetPrefix`: `/yin-yuan-geo-landing`.
3. Replaced `sitemap.ts` / `robots.ts` with static `public/sitemap.xml` + `public/robots.txt`.
4. Local `npm run build` succeeds; artifact is `out/`.
5. OAuth token lacked `workflow` scope, so Actions workflow was **not** pushed to `.github/workflows/`.
   Template saved at `docs/pages-actions-workflow.yml` for later.
6. Overnight deploy path: push `out/` to **`gh-pages` branch** + enable Pages from that branch.
7. Pushed to `main` on https://github.com/yjz8521/yin-yuan-geo-landing

## Not live / not invented

| Item | Status |
|------|--------|
| Stripe Payment Link | **Not configured.** CTAs fall back to email (`NEXT_PUBLIC_DEMO_EMAIL`). |
| Vercel deploy | **Not done** (overnight path is Pages only; Vercel optional later). |
| geo-platform product URL | **Not set** (`NEXT_PUBLIC_APP_URL` empty — no fake demo link). |
| Paid billing | Draft list prices only on `/pricing`. |

## What still needs the user (when awake)

1. **Stripe:** Create a Payment Link in Stripe Dashboard → set repo Actions secret or rebuild with `NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...` (prefer env in workflow / hosting dashboard; do not commit secrets).
2. **geo-platform deploy:** Neon DB + Railway/Render/Vercel (or similar) using that repo’s `DEPLOYMENT.md` secrets (DB URL, auth, AI keys). Then set `NEXT_PUBLIC_APP_URL` on this landing and rebuild.
3. **Optional Vercel:** Import this repo for a custom domain / SSR later; not required while Pages works.
4. **Pages visibility:** If private-repo Pages is blocked, make repo public or use a paid GitHub plan.
5. **Confirm first Pages deploy** green in Actions; open the URL above.

## Local paths

- Landing: `/workspace/yin-yuan-geo-landing`
- Product (private): `github.com/yjz8521/geo-platform`
