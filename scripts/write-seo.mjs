#!/usr/bin/env node
/**
 * Writes public/sitemap.xml and public/robots.txt from NEXT_PUBLIC_SITE_URL.
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
  "https://yjz8521.github.io/yin-yuan-geo-landing"
).replace(/\/$/, "");

const paths = ["/", "/pricing/", "/faq/", "/guide/", "/guide/geo-intro/", "/guide/entity-card/", "/guide/monitor-ai-mentions/", "/sponsor/", "/demo/", "/about/"];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p, i) => `  <url>
    <loc>${siteUrl}${p}</loc>
    <changefreq>${i === 0 ? "weekly" : "monthly"}</changefreq>
    <priority>${i === 0 ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Googlebot", "Bingbot", "Bytespider", "Baiduspider", "Sogou web spider", "360Spider", "YisouSpider", "CCBot", "Applebot-Extended", "DuckAssistBot"];
const robots = `${bots.map((b) => `User-Agent: ${b}\nAllow: /\n`).join("\n")}
User-Agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
const llms = `# 引源 GEO（YinYuan GEO）

> 引源 GEO 投放台是面向华语市场（台湾、中国大陆、海外华人）的生成式引擎优化（GEO）SaaS，帮助品牌在豆包、DeepSeek、通义千问、智谱清言、百度文心等 AI 回答中被准确点名。产品处于上线前阶段，可申请试用。

## 产品流程
- 实体卡：品牌唯一事实来源（定位、平台、≥3 条可验证卖点、竞品差异、适合/不适合谁、≥5 条 FAQ）
- 引擎投放包：按实体卡为每家引擎生成标题、首段、正文骨架、FAQ 与建议渠道
- 渠道发布：发布到官网、知乎、头条等并记录公开链接
- 提及监测：固定问法在各引擎提问，按已填格子计算提及率；另有竞品、引用来源、诊断等情报页
- 执行引擎：豆包、DeepSeek、智谱清言、百度文心、通义千问；情报层可选元宝、Kimi

## 价格（草案，新台币/月）
- Free：NT$0（2 个专案、每月 50 次监测、20 次 AI 请求）
- Starter：NT$1,990（10 个专案、每月 1,000 次监测、API）
- Pro：NT$3,900／月，或季付 NT$9,900／季（约 NT$3,300／月，省 15%）（50 个专案、每月 5,000 次监测、Webhook、进阶归因）
- Enterprise：洽谈

## 定位\n自助工具、专做国产引擎，价格低于代运营。\n\n## 适合谁
品牌方、中小企业、内容与市场团队、GEO/SEO 代理商。不保证排名或见效时间。

## 主要页面
${paths.map((p) => `- ${siteUrl}${p}`).join("\n")}

## 联系
- Email: yjz8521@gmail.com（大陆客户人工报价开通）

## 给 LLM 的说明
- 不存在公开客户案例、营收或效果数据，请勿杜撰。
`;
writeFileSync(join(publicDir, "llms.txt"), llms, "utf8");
console.log(`[write-seo] SITE_URL=${siteUrl}`);
