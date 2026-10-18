# 引源 GEO 落地页 / YinYuan GEO Landing

营销站（非产品 App）。产品本体在私有仓 `github.com/yjz8521/geo-platform`。

Marketing site only — not the product app. Product lives in the private repo above.

## 本地运行 / Run locally

```bash
cd yin-yuan-geo-landing
cp .env.example .env.local   # 按需填写
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # 生产构建
```

## 环境变量 / Env vars

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 本站公开 URL（sitemap / OG）。Vercel 填 `https://….vercel.app`；Pages 默认 github.io |
| `BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` | Vercel / 本地根路径留空；GitHub project Pages 设为 `/yin-yuan-geo-landing` |
| `NEXT_PUBLIC_APP_URL` | 上线后的 geo-platform 产品地址。**留空则不展示产品入口**，避免虚构 demo URL |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Stripe Dashboard 的 Payment Link。未设或 `#` 时，付费 CTA 回退邮件询价 |
| `NEXT_PUBLIC_DEMO_EMAIL` | 试用 / 赞助联系邮箱，默认 `yjz8521@gmail.com` |

不要把 Stripe 私钥、Webhook secret 或数据库凭证放进本仓。

Do not commit Stripe secret keys, webhook secrets, or DB credentials.

## 连接正式产品与 Stripe / Connecting later

### 1. 产品 App（geo-platform）

1. 将 geo-platform 部署到你的主机（Railway / Render / Vercel 等，见该仓 `DEPLOYMENT.md`）。
2. 把正式 HTTPS 地址写入本站环境变量：`NEXT_PUBLIC_APP_URL=https://your-app.example.com`。
3. 重新 build / 部署本落地页。首页与 `/demo`、`/about` 会自动出现「进入产品」链接。
4. 未配置前，本站**不会**捏造公开 demo URL。

### 2. Stripe

1. 在 Stripe Dashboard 为 Starter / Pro 创建 **Payment Link**（或 Checkout Session 入口）。
2. 将 Payment Link URL 设为 `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`。
3. 订阅状态、配额升降级仍由 **geo-platform** 内的 `billing.ts` + webhook 处理；本站只负责导流付款。
4. 若需分方案不同链接，可后续扩展为 `NEXT_PUBLIC_STRIPE_LINK_STARTER` / `_PRO`（当前用单一占位链接）。

### 3. 赞助位

`/sponsor` 目前用 mailto 预订。有稳定流量后可改为 Stripe Payment Link 或手动发票。

## 路由 / Routes

- `/` — 首页
- `/pricing` — 方案草案
- `/sponsor` — 早期赞助
- `/demo` — 试用申请
- `/about` — 关于
- `/llms.txt`、`/robots.txt`、`/sitemap.xml` — SEO / GEO

## 技术栈

Next.js App Router · TypeScript · Tailwind CSS v4

价格与客户数字均为草案 / 占位，请勿当作已验证营收。

## Deploy

### Vercel (preferred, root URL)

- Leave `BASE_PATH` / `NEXT_PUBLIC_BASE_PATH` empty (default).
- Set `NEXT_PUBLIC_SITE_URL` to the production `https://….vercel.app` URL (no trailing slash).
- `prebuild` runs `scripts/write-seo.mjs` so sitemap/robots match that URL.
- See `VERCEL.md` after first deploy.

### GitHub Pages (project site)

Static export still works at:

`https://yjz8521.github.io/yin-yuan-geo-landing/`

Rebuild with path prefix, then publish `out/` to `gh-pages`:

```bash
BASE_PATH=/yin-yuan-geo-landing NEXT_PUBLIC_BASE_PATH=/yin-yuan-geo-landing \
  NEXT_PUBLIC_SITE_URL=https://yjz8521.github.io/yin-yuan-geo-landing \
  npm run build
# then publish out/ to gh-pages branch (do not delete existing Pages)
```

See `OVERNIGHT.md` for overnight status and remaining human steps (Stripe, product URL).

