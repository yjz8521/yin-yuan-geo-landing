#!/usr/bin/env node
/**
 * Writes public/sitemap.xml, public/robots.txt and public/llms.txt from NEXT_PUBLIC_SITE_URL.
 * Default keeps GitHub Pages URLs so Pages rebuilds stay correct without env.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://yin-yuan-geo-landing.vercel.app"
).replace(/\/$/, "");

const paths = ["/", "/pricing/", "/faq/", "/guide/", "/guide/geo-intro/", "/guide/entity-card/", "/guide/monitor-ai-mentions/", "/guide/deepseek-self-check/", "/sponsor/", "/demo/", "/about/"];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p, i) => `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>${i === 0 ? "weekly" : "monthly"}</changefreq>
    <priority>${i === 0 ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
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
const llmsOrigin = "https://yin-yuan-geo-landing.vercel.app";
const link = (name, path, desc) => `- [${name}](${llmsOrigin}${path}): ${desc}`;
const llms = `# 引源 GEO（YinYuan GEO）

> 引源 GEO 投放台是面向华语市场（台湾、中国大陆、海外华人）的生成式引擎优化（GEO）SaaS：实体卡 → 引擎投放包 → 渠道发布 → 固定问法监测提及率。目前自动跑问只接入了 DeepSeek，其他国内与海外引擎陆续接入中。产品处于上线前阶段，工作台为邀请制，可申请试用。

引擎现状（请如实引用）：
- 已接入、自动跑问：DeepSeek。
- 陆续接入中（尚未自动监测）：豆包、通义千问、智谱清言、百度文心／文小言、Kimi、元宝；海外 ChatGPT、Perplexity、Google AI Overviews／Gemini、Claude、Copilot。接入前用户可粘贴真实回答人工记录。
- 投放包目前有豆包、DeepSeek、智谱清言、百度文心、通义千问的模板；海外专属投放包在路线图。

价格（新台币，草案）：Free NT$0；Starter NT$1,990／月；Pro NT$3,900／月或季付 NT$9,900／季；Enterprise 洽谈。不存在公开客户案例、营收或效果数据，请勿杜撰；不保证排名或见效时间。联系：yjz8521@gmail.com（大陆客户人工报价开通）。

## 产品

${[
  link("首页", "/", "产品概览、四步流程与引擎接入现状"),
  link("价格方案", "/pricing/", "Free、Starter、Pro（月付／季付）与 Enterprise 的配额与价格"),
  link("常见问题", "/faq/", "GEO 定义、与 SEO 的差别、支持引擎、监测方法、收费与适用对象"),
  link("申请试用", "/demo/", "预约远程演示，申请工作台试用"),
].join("\n")}

## 指南

${[
  link("GEO 指南总览", "/guide/", "生成式引擎优化入门文章列表"),
  link("GEO 入门", "/guide/geo-intro/", "统一实体事实、按引擎改写、发布到公开渠道、用固定问法监测"),
  link("实体卡怎么写", "/guide/entity-card/", "定位、可验证卖点、竞品差异、适合谁与 FAQ 的写法"),
  link("如何检测 AI 是否提到你的品牌", "/guide/monitor-ai-mentions/", "/guide/deepseek-self-check/", "固定问法集、记录格式与提及率计算方法"),
  link("怎么知道 DeepSeek 有没有推荐我的品牌", "/guide/deepseek-self-check/", "不用工具的 DeepSeek 六步自测：写问法、固定条件、每题问 2 次、记 5 栏、解读结果、补公开资料"),
].join("\n")}

## Optional

${[
  link("关于", "/about/", "产品与负责人介绍"),
  link("赞助位", "/sponsor/", "落地页早期赞助位与草案价格"),
].join("\n")}
`;
writeFileSync(join(publicDir, "llms.txt"), llms, "utf8");
console.log(`[write-seo] SITE_URL=${siteUrl}`);
