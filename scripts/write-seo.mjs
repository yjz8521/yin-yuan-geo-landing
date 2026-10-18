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

const paths = ["/", "/pricing/", "/sponsor/", "/demo/", "/about/"];

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

const robots = `User-Agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
console.log(`[write-seo] SITE_URL=${siteUrl}`);
