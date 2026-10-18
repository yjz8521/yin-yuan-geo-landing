export const siteConfig = {
  name: "引源 GEO",
  nameEn: "YinYuan GEO",
  productFull: "引源 GEO 投放台",
  taglineZh: "让品牌在国内与海外生成式 AI 里被点名",
  taglineEn: "Get your brand named across Chinese and global generative AI",
  owner: "Kinnv",
  repoText: "github.com/yjz8521/geo-platform",
  engines: ["豆包", "DeepSeek", "智谱清言", "百度文心／文小言", "通义千问"] as const,
  intelEngines: ["元宝", "Kimi"] as const,
  /** Live today: 一期投放包 + 监测列；情报层另含元宝、Kimi。 */
  enginesDomesticLive: ["豆包", "DeepSeek", "智谱清言", "百度文心／文小言", "通义千问", "元宝", "Kimi"] as const,
  /** Method / roadmap: fixed-prompt monitoring works today; dedicated packs & connectors are next. */
  enginesOverseas: ["ChatGPT", "Perplexity", "Google AI Overviews／Gemini", "Claude", "Copilot"] as const,
};

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://yjz8521.github.io/yin-yuan-geo-landing"
  );
}

/** Must match next.config.ts basePath. Empty on Vercel root; set BASE_PATH=/yin-yuan-geo-landing for GitHub Pages. */
export const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || "";

export function getAppUrl(): string | null {
  const v = process.env.NEXT_PUBLIC_APP_URL?.trim();
  return v ? v.replace(/\/$/, "") : null;
}

export const checkoutLinks = {
  starter:
    process.env.NEXT_PUBLIC_CHECKOUT_STARTER?.trim() ||
    "https://yin-yuan-geo.lemonsqueezy.com/checkout/buy/c1919b13-7784-426a-aef8-8cea6dd43b4e",
  pro:
    process.env.NEXT_PUBLIC_CHECKOUT_PRO?.trim() ||
    "https://yin-yuan-geo.lemonsqueezy.com/checkout/buy/ce49e252-220e-4556-9003-e642cfa357a9",
};

/** Pro quarterly (NT$9,900 / 季). Swap to Lemon Squeezy URL when ready. */
export const CHECKOUT_PRO_QUARTERLY = `mailto:yjz8521@gmail.com?subject=${encodeURIComponent("引源 GEO Pro 季付")}`;

/** @deprecated Stripe unsupported in Taiwan; kept for compat. */
export function getStripeLink(): string {
  const v = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim();
  return v && v !== "#" ? v : "#";
}

export function getDemoEmail(): string {
  return process.env.NEXT_PUBLIC_DEMO_EMAIL?.trim() || "yjz8521@gmail.com";
}

/** Draft list prices — not live billing; align with geo-platform plan codes. */
export const draftPlans = [
  {
    code: "free" as const,
    nameZh: "Free",
    nameEn: "Free",
    priceZh: "NT$0",
    priceEn: "$0",
    periodZh: "/ 月",
    periodEn: "/ mo",
    blurbZh: "试用工作流与基础监测",
    blurbEn: "Try the workflow and basic monitoring",
    highlightsZh: [
      "最多 2 个专案",
      "每月 50 次监测跑批",
      "每月 20 次 AI 请求",
      "1 个工作区 · 3 位成员",
    ],
    highlightsEn: [
      "Up to 2 projects",
      "50 monitor runs / month",
      "20 AI requests / month",
      "1 workspace · 3 members",
    ],
    cta: "demo" as const,
    featured: false,
  },
  {
    code: "starter" as const,
    nameZh: "Starter",
    nameEn: "Starter",
    priceZh: "NT$1,990",
    priceEn: "~$62",
    periodZh: "/ 月",
    periodEn: "/ mo",
    blurbZh: "小团队起步投放与 API",
    blurbEn: "Small-team packs + API",
    highlightsZh: [
      "最多 10 个专案 · 3 工作区",
      "每月 1,000 次监测",
      "每月 500 次 AI 请求",
      "API 存取 · 多工作区",
      "国内＋海外引擎覆盖（海外专属投放包路线图）",
    ],
    highlightsEn: [
      "Up to 10 projects · 3 workspaces",
      "1,000 monitor runs / month",
      "500 AI requests / month",
      "API access · multi-workspace",
      "CN + global engines (overseas packs on roadmap)",
    ],
    cta: "checkout" as const,
    featured: false,
  },
  {
    code: "pro" as const,
    nameZh: "Pro",
    nameEn: "Pro",
    priceZh: "NT$3,900",
    priceEn: "~$122",
    periodZh: "/ 月",
    periodEn: "/ mo",
    blurbZh: "完整情报、Webhook 与归因",
    blurbEn: "Full intel, webhooks & attribution",
    highlightsZh: [
      "最多 50 个专案 · 10 工作区",
      "每月 5,000 次监测",
      "Webhook · 排程报表 · 进阶归因",
      "自定义报表",
      "国内＋海外引擎覆盖（海外专属投放包路线图）",
    ],
    highlightsEn: [
      "Up to 50 projects · 10 workspaces",
      "5,000 monitor runs / month",
      "Webhooks · scheduled reports · advanced attribution",
      "Custom reports",
      "CN + global engines (overseas packs on roadmap)",
    ],
    cta: "checkout" as const,
    featured: true,
  },
  {
    code: "enterprise" as const,
    nameZh: "Enterprise",
    nameEn: "Enterprise",
    priceZh: "洽谈",
    priceEn: "Custom",
    periodZh: "",
    periodEn: "",
    blurbZh: "高配额、软上限与专属支援",
    blurbEn: "High quotas, soft caps & dedicated support",
    highlightsZh: [
      "最多 500 个专案 · 50 工作区",
      "每月 50,000 次监测",
      "监测 / AI 软上限（不硬挡）",
      "全功能 · 客制化 onboarding",
    ],
    highlightsEn: [
      "Up to 500 projects · 50 workspaces",
      "50,000 monitor runs / month",
      "Soft caps on monitor / AI (no hard block)",
      "All features · custom onboarding",
    ],
    cta: "demo" as const,
    featured: false,
  },
];

export const sponsorSlots = [
  {
    id: "homepage-hero",
    nameZh: "首页主赞助",
    nameEn: "Homepage hero sponsor",
    priceZh: "US$250 / 周（草案）",
    priceEn: "$250 / week (draft)",
    descZh: "落地页首页显眼位置，带链接与一句标语。适合工具、云服务、创作者品牌。",
    descEn: "Prime homepage placement with link + one-line blurb. For tools, cloud, and creator brands.",
  },
  {
    id: "engines-strip",
    nameZh: "引擎区条幅",
    nameEn: "Engines strip",
    priceZh: "US$150 / 周（草案）",
    priceEn: "$150 / week (draft)",
    descZh: "出现在「覆盖引擎」区块旁，触达关心国内生成式引擎的 B2B 访客。",
    descEn: "Sits beside the engines section — reaches B2B visitors focused on CN generative engines.",
  },
];
