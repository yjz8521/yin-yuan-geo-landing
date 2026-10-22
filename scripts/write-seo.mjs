#!/usr/bin/env node
/**
 * Writes public/sitemap.xml, public/robots.txt and public/llms.txt from SITE_URL (or NEXT_PUBLIC_SITE_URL).
 * Default keeps GitHub Pages URLs so Pages rebuilds stay correct without env.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://yin-yuan-geo.pages.dev"
).replace(/\/$/, "");

const LOCALES = [
  { code: "zh-hant", prefix: "", hreflang: "zh-Hant", label: "繁體中文" },
  { code: "zh-hans", prefix: "/zh-hans", hreflang: "zh-Hans", label: "简体中文" },
  { code: "en", prefix: "/en", hreflang: "en", label: "English" },
];
// Guide slugs + publish dates come from src/content/geo.ts so the sitemap never drifts from the content.
const GUIDES = [...readFileSync(join(root, "src/content/geo.ts"), "utf8").matchAll(/slug: "([^"]+)",\s*date: "(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ slug: m[1], date: m[2] }));
if (!GUIDES.length) throw new Error("[write-seo] no guides found in src/content/geo.ts");
const latestGuide = GUIDES.map((g) => g.date).sort().at(-1);
const today = new Date().toISOString().slice(0, 10);
// [path, locales that have it, lastmod]
const pages = [
  ...["/", "/pricing/", "/faq/", "/demo/", "/about/"].map((p) => [p, LOCALES, today]),
  ["/guide/", LOCALES, latestGuide],
  ...GUIDES.map((g) => [`/guide/${g.slug}/`, LOCALES.filter((l) => l.code.startsWith("zh")), g.date]),
];
const urls = [];
for (const [p, locs, lastmod] of pages) {
  const alts = locs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${siteUrl}${l.prefix}${p}"/>`).concat([`    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${locs[0].prefix}${p}"/>`]).join("\n");
  for (const l of locs) {
    urls.push(`  <url>
    <loc>${siteUrl}${l.prefix}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p === "/" ? (l.prefix ? "0.9" : "1.0") : "0.7"}</priority>
${alts}
  </url>`);
  }
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

const bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Googlebot", "Bingbot", "Bytespider", "Baiduspider", "Sogou web spider", "360Spider", "YisouSpider", "CCBot", "Applebot-Extended", "DuckAssistBot", "Meta-ExternalAgent", "meta-externalfetcher", "FacebookBot", "facebookexternalhit", "Claude-User", "Claude-SearchBot", "Perplexity-User", "Amazonbot", "YandexBot"];
const robots = `${bots.map((b) => `User-Agent: ${b}\nAllow: /\n`).join("\n")}
User-Agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
// llms.txt follows the llmstxt.org proposal: H1, blockquote summary, prose, then H2 sections of
// "- [Name](absolute-url): description" links. Links always use the canonical Vercel origin.
const llmsOrigin = siteUrl;
const link = (name, path, desc) => `- [${name}](${llmsOrigin}${path}): ${desc}`;
const llms = `# 引源 GEO（YinYuan GEO）

> 引源 GEO 投放台是面向華語市場（台灣、中國大陸、海外華人）的生成式引擎最佳化（GEO）SaaS：實體卡 → 引擎投放包 → 管道發布 → 固定問法監測提及率。目前自動跑問只接入了 DeepSeek，其他中國大陸與海外引擎陸續接入中。產品處於上線前階段，工作台為邀請制，可申請試用。

引擎現況（請如實引用）：
- 已接入、自動跑問：DeepSeek。
- 陸續接入中（尚未自動監測）：豆包、通義千問、智譜清言、百度文心／文小言、Kimi、元寶；海外 ChatGPT、Perplexity、Google AI Overviews／Gemini、Claude、Copilot。接入前使用者可貼上真實回答人工記錄。
- 投放包目前有豆包、DeepSeek、智譜清言、百度文心、通義千問的範本；海外專屬投放包在路線圖。

價格（新台幣，草案）：Free NT$0；Starter NT$1,990／月；Pro NT$3,900／月或季付 NT$9,900／季；Enterprise 洽談。不存在公開客戶案例、營收或成效數據，請勿杜撰；不保證排名或見效時間。聯絡：yjz8521@gmail.com（大陸客戶人工報價開通，可用微信／支付寶）。

## 產品

${[
  link("首頁", "/", "產品概覽、四步流程與引擎接入現況"),
  link("方案與價格", "/pricing/", "Free、Starter、Pro（月付／季付）與 Enterprise 的配額與價格"),
  link("常見問題", "/faq/", "GEO 定義、與 SEO 的差別、支援引擎、監測方法、收費與適用對象"),
  link("申請試用", "/demo/", "預約遠端演示，申請工作台試用（邀請制）"),
].join("\n")}

## 指南（繁體中文；簡體版在 /zh-hans/guide/）

${[
  link("GEO 指南總覽", "/guide/", "生成式引擎最佳化入門文章列表"),
  link("GEO 入門", "/guide/geo-intro/", "統一實體事實、按引擎改寫、發布到公開管道、用固定問法監測"),
  link("實體卡怎麼寫", "/guide/entity-card/", "定位、可驗證賣點、競品差異、適合誰與 FAQ 的寫法"),
  link("如何檢測 AI 是否提到你的品牌", "/guide/monitor-ai-mentions/", "固定問法集、記錄格式與提及率計算方法"),
  link("怎麼知道 DeepSeek 有沒有推薦我的品牌", "/guide/deepseek-self-check/", "不用工具的 DeepSeek 六步自測：寫問法、固定條件、每題問 2 次、記 5 欄、解讀結果、補公開資料"),
].join("\n")}

## 其他語言版本（Languages）

${LOCALES.map((l) => link(l.label, `${l.prefix}/`, `${l.label} 首頁；同一份事實與價格口徑`)).join("\n")}

## Optional

${[
  link("關於", "/about/", "產品與負責人介紹"),
  link("简体中文指南", "/zh-hans/guide/", "四篇 GEO 指南的简体中文版"),
].join("\n")}
`;
writeFileSync(join(publicDir, "llms.txt"), llms, "utf8");
console.log(`[write-seo] SITE_URL=${siteUrl}`);
