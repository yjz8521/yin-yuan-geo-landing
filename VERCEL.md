# Vercel deploy — yin-yuan-geo-landing

## Production

| Item | Value |
|------|--------|
| Production URL | https://yin-yuan-geo-landing.vercel.app |
| Alias (team) | https://yin-yuan-geo-landing-789-094e.vercel.app |
| Git alias | https://yin-yuan-geo-landing-git-main-789-094e.vercel.app |
| Project name | `yin-yuan-geo-landing` |
| Project id | `prj_xVLQ0KK9S9LzU8Gnf6gJvTDImovy` |
| Team id | `team_vBmaIsENELlNZtVVnzGak4xH` (slug `789-094e`) |
| Framework | Next.js (static `output: 'export'`) |
| Linked repo | `yjz8521/yin-yuan-geo-landing` (`main`) |
| Dashboard | https://vercel.com/789-094e/yin-yuan-geo-landing |

Verified HTTP 200 on `/` and `/pricing/` (Asia/Taipei, 2026-10-18).

## Env already set on Vercel

- `NEXT_PUBLIC_SITE_URL` = `https://yin-yuan-geo-landing.vercel.app` (production + preview + development)
- `BASE_PATH` = `` (empty)
- `NEXT_PUBLIC_BASE_PATH` = `` (empty)

Do **not** invent Stripe Payment Links or geo-platform product URLs.

## Remaining human items

1. **Stripe** — create Payment Link(s) in Stripe Dashboard; set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` on this Vercel project (then redeploy).
2. **Product app** — after geo-platform is live, set `NEXT_PUBLIC_APP_URL` to that HTTPS origin (no trailing slash); redeploy so “进入产品” links appear.
3. Optional custom domain in Vercel → Domains.

## GitHub Pages (still live)

https://yjz8521.github.io/yin-yuan-geo-landing/

Do not delete `gh-pages`. To rebuild Pages after code changes:

```bash
BASE_PATH=/yin-yuan-geo-landing NEXT_PUBLIC_BASE_PATH=/yin-yuan-geo-landing \
  NEXT_PUBLIC_SITE_URL=https://yjz8521.github.io/yin-yuan-geo-landing \
  npm run build
# publish out/ to gh-pages
```

Vercel uses empty `BASE_PATH` (root URL). Pages needs the project path prefix.

## Note on MCP team scope

Calls that pass `teamId=team_vBmaIsENELlNZtVVnzGak4xH` may 403 with scope `789-094e` on this connector; project/list without teamId still works. Re-auth Vercel MCP with that team if team-scoped tools are needed.


## 收款 Payments (Lemon Squeezy)
- Starter / Pro CTAs use Lemon Squeezy checkout links hardcoded in `src/lib/site.ts` (override: `NEXT_PUBLIC_CHECKOUT_STARTER` / `NEXT_PUBLIC_CHECKOUT_PRO`). Stripe is not used (unsupported in Taiwan); `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is obsolete.
- **Note:** the Lemon Squeezy store is currently in **Test mode** pending approval — real charges won't happen until the store is activated (switch links to live if they change).
- Mainland customers: mailto yjz8521@gmail.com (WeChat / bank transfer, manual).
