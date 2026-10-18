"use client";

import Link from "next/link";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { draftPlans, getAppUrl, siteConfig } from "@/lib/site";

const steps = [
  {
    n: "01",
    zh: "填实体卡",
    en: "Entity card",
    dZh: "品牌、品类、卖点、竞品与场景一次结构化。",
    dEn: "Structure brand, category, claims, competitors, and scenarios.",
  },
  {
    n: "02",
    zh: "生成引擎投放包",
    en: "Engine packs",
    dZh: "对豆包 / DeepSeek / 智谱 / 百度 / 千问产出标题、大纲与渠道清单；海外引擎沿用同一实体事实。",
    dEn: "Titles, outlines, and channel lists for each CN engine; global engines reuse the same entity facts.",
  },
  {
    n: "03",
    zh: "发布到渠道",
    en: "Publish",
    dZh: "推到创作者草稿箱与品牌 CMS，按 P0/P1 渠道推进。",
    dEn: "Push to creator drafts and brand CMS along P0/P1 channels.",
  },
  {
    n: "04",
    zh: "监测提及率",
    en: "Monitor mentions",
    dZh: "固定问法跑批，看是否被点名、引用与推荐，再做诊断与归因。",
    dEn: "Run fixed prompts, track naming / citations / recommendations, then diagnose.",
  },
];

const problems = [
  {
    zh: "SEO 够了，生成式引擎里却搜不到你",
    en: "SEO is fine — generative engines never name you",
  },
  {
    zh: "各家引擎问法不同，人工投放难以规模化",
    en: "Many engines, many prompt styles — manual GEO does not scale",
  },
  {
    zh: "没有提及率、引用与竞品缺口数据",
    en: "No mention rate, citation, or competitor-gap metrics",
  },
];

export function HomeContent() {
  const { t, locale } = useI18n();
  const appUrl = getAppUrl();
  const teaser = draftPlans.filter((p) => p.code === "starter" || p.code === "pro");

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.18),transparent),radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(139,92,246,0.12),transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {t("Generative Engine Optimization · 国内＋海外", "GEO for CN + global generative AI")}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t(siteConfig.name, siteConfig.nameEn)}
            <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
              {t(siteConfig.taglineZh, siteConfig.taglineEn)}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t(
              "实体卡 → 引擎投放包 → 渠道发布 → 提及率监测。给品牌与增长团队一套可复盘的 GEO 工作流。",
              "Entity card → engine packs → publish → mention monitoring. A measurable GEO workflow for brand and growth teams.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/demo/"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-[#070b12] shadow-[0_0_28px_rgba(34,211,238,0.3)] transition hover:brightness-110"
            >
              {t("申请试用", "Request a demo")}
            </Link>
            <Link
              href="/pricing/"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
            >
              {t("查看方案", "View pricing")}
            </Link>
            {appUrl ? (
              <a
                href={appUrl}
                className="text-sm text-cyan-300/90 underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                {t("进入产品", "Open product")} →
              </a>
            ) : null}
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            {t(
              "Starter NT$1,990／月 · Pro NT$3,900／月（季付 NT$9,900）· 信用卡／PayPal；大陆客户可人工开通。",
              "Starter NT$1,990/mo · Pro NT$3,900/mo (NT$9,900/quarter) · card / PayPal; manual activation for mainland China.",
            )}
          </p>
        </div>
      </div>

      {/* Problem */}
      <Section>
        <SectionLabel>{t("痛点", "Problem")}</SectionLabel>
        <SectionTitle>
          {t(
            "品牌在国内与海外生成式 AI 里「隐形」",
            "Brands are invisible in Chinese and global generative AI",
          )}
        </SectionTitle>
        <SectionLead>
          {t(
            "用户越来越常直接问豆包、DeepSeek、通义千问，也问 ChatGPT、Perplexity、Gemini。若没有结构化投放与监测，你的品牌不会被点名。",
            "Users ask Doubao, DeepSeek, Qwen — and ChatGPT, Perplexity, Gemini. Without structured GEO and monitoring, you never get named.",
          )}
        </SectionLead>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {problems.map((p) => (
            <li
              key={p.en}
              className="rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.06] to-transparent p-5"
            >
              <p className="text-sm leading-relaxed text-zinc-200">{t(p.zh, p.en)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section className="border-y border-white/5 bg-[#060a10]/50">
        <SectionLabel>{t("怎么做", "How it works")}</SectionLabel>
        <SectionTitle>{t("四步闭环", "Four-step loop")}</SectionTitle>
        <SectionLead>
          {t(
            "与产品内工作流一致：实体卡 → 投放包 → 发布 → 监测。",
            "Matches the in-product flow: entity → packs → publish → monitor.",
          )}
        </SectionLead>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-white/8 bg-[#0c121c] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <span className="font-mono text-xs text-cyan-400/70">{s.n}</span>
              <h3 className="mt-2 text-base font-semibold text-white">{t(s.zh, s.en)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t(s.dZh, s.dEn)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Engines */}
      <Section>
        <SectionLabel>{t("覆盖引擎（国内＋海外）", "Engines covered")}</SectionLabel>
        <SectionTitle>
          {t("DeepSeek 已接入自动监测 · 其他引擎陆续接入中", "DeepSeek live · more engines coming")}
        </SectionTitle>
        <SectionLead>
          {t(
            "目前已接入并自动跑问的是 DeepSeek。豆包、通义千问、智谱清言、百度文心／文小言、Kimi、元宝，以及海外的 ChatGPT、Perplexity、Google AI Overviews／Gemini、Claude、Copilot 陆续接入中，接入前可粘贴真实回答人工记录。投放包目前有豆包、DeepSeek、智谱、百度文心、千问的模板，海外专属投放包在路线图。",
            "Only DeepSeek is connected and runs prompts automatically today. Doubao, Qwen, Zhipu, Baidu/ERNIE, Kimi, Yuanbao, plus ChatGPT, Perplexity, Google AI Overviews/Gemini, Claude and Copilot are being connected; until then you can paste real answers in manually. Pack templates exist for Doubao, DeepSeek, Zhipu, ERNIE and Qwen; overseas packs are on the roadmap.",
          )}
        </SectionLead>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-zinc-500">{t("已接入（自动跑问）", "Live (auto prompts)")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {siteConfig.enginesLive.map((e) => (
            <span key={e} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-100">{e}</span>
          ))}
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-zinc-500">{t("国内（陆续接入中）", "CN (coming)")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {siteConfig.enginesDomesticComing.map((e) => (
            <span key={e} className="rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-sm font-medium text-violet-100">
              {e}<span className="ml-1.5 text-xs text-violet-300/60">{t("接入中", "coming")}</span>
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-zinc-500">{t("海外（陆续接入中 · 投放包路线图）", "Global (coming · packs on roadmap)")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {siteConfig.enginesOverseas.map((e) => (
            <span key={e} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200">{e}</span>
          ))}
        </div>
      </Section>

      {/* Early access (no invented social proof) */}
      <Section className="border-y border-white/5">
        <SectionLabel>{t("早期合作", "Early access")}</SectionLabel>
        <SectionTitle>
          {t("招募首批合作品牌", "Looking for our first partner brands")}
        </SectionTitle>
        <SectionLead>
          {t(
            "我们不编造客户、营收或效果数据。首批合作品牌会先用固定问法建立提及率基线，之后在此公开可核验的前后对比（经品牌同意）。",
            "We do not invent customers, revenue, or results. Early partners start with a fixed-prompt mention baseline; verified before/after summaries will be published here with their consent.",
          )}
        </SectionLead>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { zh: "先用固定问法建立提及率基线（DeepSeek 自动跑问，其他引擎陆续接入）", en: "Start with a fixed-prompt mention baseline (DeepSeek automated; more engines coming)" },
            { zh: "协助填写实体卡与第一批投放包", en: "Help with your entity card and first packs" },
            { zh: "按周追踪提及率变化，方法公开可复核", en: "Track mention rate weekly with an open, repeatable method" },
          ].map((x) => (
            <li key={x.en} className="rounded-2xl border border-white/8 bg-[#0c121c] p-5 text-sm leading-relaxed text-zinc-200">
              {t(x.zh, x.en)}
            </li>
          ))}
        </ul>
        <Link href="/demo/" className="mt-6 inline-flex text-sm font-medium text-cyan-300 hover:underline">
          {t("申请成为合作品牌", "Apply as a partner brand")} →
        </Link>
      </Section>

      {/* Pricing teaser */}
      <Section>
        <SectionLabel>{t("方案预览", "Pricing teaser")}</SectionLabel>
        <SectionTitle>
          {t("Free / Starter / Pro / Enterprise", "Free / Starter / Pro / Enterprise")}
        </SectionTitle>
        <SectionLead>
          {t(
            "下列价目以新台币计；Pro 另有季付 NT$9,900／季（约 NT$3,300／月）。",
            "Prices in TWD; Pro is also NT$9,900 per quarter (~NT$3,300/mo).",
          )}
        </SectionLead>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {teaser.map((p) => (
            <div
              key={p.code}
              className={`rounded-2xl border p-6 ${
                p.featured
                  ? "border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 to-transparent"
                  : "border-white/8 bg-[#0c121c]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {locale === "zh" ? p.nameZh : p.nameEn}
                </h3>
                {p.featured ? (
                  <span className="text-xs font-medium text-cyan-300">
                    {t("推荐", "Popular")}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">
                {locale === "zh" ? p.priceZh : p.priceEn}
                <span className="text-sm font-normal text-zinc-500">
                  {locale === "zh" ? p.periodZh : p.periodEn}
                </span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {locale === "zh" ? p.blurbZh : p.blurbEn}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/pricing/"
          className="mt-6 inline-flex text-sm font-medium text-cyan-300 hover:underline"
        >
          {t("看完整方案", "Full pricing")} →
        </Link>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-[#0c121c] to-violet-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {t("准备让品牌被点名？", "Ready to get named?")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            {t(
              "申请试用，或在 SaaS 爬坡期先预订首页赞助位。",
              "Request a trial, or book a homepage sponsor slot while SaaS ramps.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo/"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#070b12] transition hover:bg-zinc-200"
            >
              {t("申请试用", "Request demo")}
            </Link>
            <Link
              href="/sponsor/"
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
            >
              {t("赞助位", "Sponsor slots")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
