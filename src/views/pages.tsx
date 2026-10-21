import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AboutContent } from "@/components/AboutContent";
import { DemoContent } from "@/components/DemoContent";
import { HomeContent } from "@/components/HomeContent";
import { JsonLd } from "@/components/JsonLd";
import { PricingContent } from "@/components/PricingContent";
import { SponsorContent } from "@/components/SponsorContent";
import { faqs, guides } from "@/content/geo";
import { LOCALE_META, alternates, lp, tr, type Locale } from "@/lib/locales";
import { getSiteUrl, pageMeta, siteConfig } from "@/lib/site";

export const GUIDE_LOCALES = ["zh-hant", "zh-hans"] as const satisfies readonly Locale[];
export const hasGuideArticles = (l: Locale) => (GUIDE_LOCALES as readonly string[]).includes(l);

export const homeMeta = (l: Locale): Metadata => ({ alternates: alternates(l, "/") });
export const Home = () => <HomeContent />;

export const pricingMeta = (l: Locale): Metadata => pageMeta(l, "/pricing/", "方案与价格 Pricing", "引源 GEO 价格：Free NT$0；Starter NT$1,990／月；Pro NT$3,900／月或季付 NT$9,900／季；Enterprise 洽谈。台湾与海外可用信用卡／PayPal，大陆客户可联系人工开通。");
export const Pricing = () => <PricingContent />;

export const aboutMeta = (l: Locale): Metadata => pageMeta(l, "/about/", "关于 About", "引源 GEO 投放台：面向华语市场、以国内与海外生成式 AI 为目标的 GEO SaaS（自动监测已接入 DeepSeek，其他引擎陆续接入中），产品负责人 Kinnv。");
export const About = () => <AboutContent />;

export const demoMeta = (l: Locale): Metadata => pageMeta(l, "/demo/", "申请试用 Demo", "申请引源 GEO 远程演示：实体卡、国内与海外引擎投放包与提及监测矩阵，约 30–45 分钟。");
export const Demo = () => <DemoContent />;

export const sponsorMeta = (l: Locale): Metadata => pageMeta(l, "/sponsor/", "赞助位 Sponsor", "引源 GEO 落地页早期赞助位：首页主赞助 US$250／周、引擎区条幅 US$150／周（草案价）。");
export const Sponsor = () => <SponsorContent />;

export const faqMeta = (l: Locale): Metadata => pageMeta(l, "/faq/", "常见问题 FAQ：什么是 GEO、和 SEO 差别、价格", "引源 GEO 常见问题：什么是 GEO、与 SEO 差别、国内与海外引擎覆盖（豆包 DeepSeek ChatGPT Perplexity 等）、如何监测、价格与适用对象。");
export function Faq({ l }: { l: Locale }) {
  const items = faqs.map((f) => ({ q: tr(l, f.q), a: tr(l, f.a) }));
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: LOCALE_META[l].hreflang, mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <h1 className="text-3xl font-bold text-zinc-950">{tr(l, "引源 GEO 常见问题")}</h1>
      <p className="mt-3 text-zinc-600">{tr(l, "关于生成式引擎优化（GEO）与引源 GEO 投放台的直接回答。")}</p>
      <div className="mt-10 space-y-8">
        {items.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold text-zinc-950">{f.q}</h2>
            <p className="mt-2 leading-relaxed text-zinc-600">{f.a}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-zinc-600">{tr(l, "延伸阅读：")}<Link href={lp(l, "/guide/")} className="text-zinc-950 hover:underline">{tr(l, "GEO 指南")}</Link> · <Link href={lp(l, "/pricing/")} className="text-zinc-950 hover:underline">{tr(l, "方案价格")}</Link></p>
    </div>
  );
}

export const guideIndexMeta = (l: Locale): Metadata => pageMeta(l, "/guide/", "GEO 指南：生成式引擎优化入门", "引源 GEO 指南：GEO 入门、实体卡写法、如何检测国内与海外 AI（豆包、DeepSeek、ChatGPT、Perplexity 等）是否提到你的品牌。");
export function GuideIndex({ l }: { l: Locale }) {
  const zh = hasGuideArticles(l);
  const at = zh ? l : "zh-hant";
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-950">{tr(l, "GEO 指南")}</h1>
      {!zh && <p className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">{tr(l, "指南正文目前只有中文版本（繁体与简体）。以下标题与摘要为翻译，点击后会打开繁体中文正文。")}</p>}
      <ul className="mt-8 space-y-6">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={lp(at, `/guide/${g.slug}/`)} hrefLang={zh ? undefined : "zh-Hant"} className="text-lg font-semibold text-zinc-950 hover:underline">{tr(l, g.title)}</Link>
            <p className="mt-1 text-zinc-600">{tr(l, g.description)}</p>
            <p className="mt-1 text-xs text-zinc-400"><time dateTime={g.date}>{g.date}</time>{!zh && " · 中文"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function guideMeta(l: Locale, slug: string): Metadata {
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  const path = `/guide/${g.slug}/`;
  const title = tr(l, g.title), description = tr(l, g.description);
  return { title, description, alternates: alternates(l, path, GUIDE_LOCALES), openGraph: { type: "article", url: lp(l, path), siteName: tr(l, "引源 GEO"), locale: LOCALE_META[l].og, title, description, publishedTime: g.date, images: [{ url: "/og.png", width: 1200, height: 630, alt: "引源 GEO" }] }, twitter: { card: "summary_large_image", title, description, images: ["/og.png"] } };
}
export function GuideArticle({ l, slug }: { l: Locale; slug: string }) {
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const url = `${getSiteUrl()}${lp(l, `/guide/${g.slug}/`)}`;
  const title = tr(l, g.title), description = tr(l, g.description);
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, inLanguage: LOCALE_META[l].hreflang, url, mainEntityOfPage: url, author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name, url: getSiteUrl() }, datePublished: g.date, dateModified: g.date, image: `${getSiteUrl()}/og.png` }} />
      <p className="text-sm text-zinc-500"><Link href={lp(l, "/guide/")} className="hover:underline">{tr(l, "GEO 指南")}</Link></p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-950">{title}</h1>
      <p className="mt-2 text-sm text-zinc-500"><time dateTime={g.date}>{tr(l, "发布于")} {g.date}</time></p>
      <p className="mt-3 text-zinc-600">{description}</p>
      {g.sections.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-xl font-semibold text-zinc-950">{tr(l, s.h)}</h2>
          {s.p.map((p, i) => <p key={i} className="mt-3 leading-relaxed text-zinc-600">{tr(l, p)}</p>)}
        </section>
      ))}
      <p className="mt-12 text-zinc-600">{tr(l, "引源 GEO 投放台把以上流程做成工作台：实体卡 → 引擎投放包 → 渠道发布 → 提及监测。")}<Link href={lp(l, "/faq/")} className="text-zinc-950 hover:underline">{tr(l, "常见问题")}</Link> · <Link href={lp(l, "/demo/")} className="text-zinc-950 hover:underline">{tr(l, "申请试用")}</Link></p>
    </article>
  );
}
