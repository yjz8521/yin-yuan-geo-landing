# Vercel deploy — yin-yuan-geo-landing

## Production

| Item | Value |
|------|--------|
| Production URL | https://yin-yuan-geo-landing.vercel.app |
| Team alias | https://yin-yuan-geo-landing-789-094e.vercel.app |
| Project name | `yin-yuan-geo-landing` |
| Project id | `prj_xVLQ0KK9S9LzU8Gnf6gJvTDImovy` |
| Team / account id | `team_vBmaIsENELlNZtVVnzGak4xH` (slug `789-094e`) |
| Framework | Next.js (`output: 'export'`) |
| Commit deployed | `92d567d` (`Prepare landing for Vercel root deploy (env BASE_PATH)`) |

Verified: `GET /` and `GET /pricing/` return HTTP 200.

GitHub Pages (unchanged): https://yjz8521.github.io/yin-yuan-geo-landing/

## Env set on the project

- `NEXT_PUBLIC_SITE_URL` = `https://yin-yuan-geo-landing.vercel.app` (production + preview + development)
- `BASE_PATH` = empty
- `NEXT_PUBLIC_BASE_PATH` = empty

**Not set (by design):** `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` — fill after geo-platform / Stripe Payment Links exist. Do not invent URLs.

## Remaining human steps

1. **Install Vercel GitHub app** (needed for permanent repo link + auto-deploy on push):  
   https://vercel.com/docs/git/vercel-for-github  
   Or Dashboard → Project → Settings → Git → Connect `yjz8521/yin-yuan-geo-landing`.  
   Until then, deploys were triggered via API `gitSource` (works once), but `create_git_project` / project Git link may still fail with “install the GitHub integration first”.
2. **Stripe Payment Link** → set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` in Vercel env, redeploy.
3. **geo-platform product URL** → set `NEXT_PUBLIC_APP_URL`, redeploy.
4. Optional custom domain in Vercel → then update `NEXT_PUBLIC_SITE_URL` and redeploy (prebuild rewrites sitemap/robots).

## Pages rebuild (keep gh-pages)

```bash
BASE_PATH=/yin-yuan-geo-landing NEXT_PUBLIC_BASE_PATH=/yin-yuan-geo-landing \
  NEXT_PUBLIC_SITE_URL=https://yjz8521.github.io/yin-yuan-geo-landing \
  npm run build
# publish out/ to gh-pages — do not delete the branch
```

## Notes

- Vercel Auth (SSO protection) was disabled on this project so the marketing site is public.
- Prefer empty `BASE_PATH` on Vercel; do not set Output Directory to `out` (causes `NEXT_NO_ROUTES_MANIFEST`).
