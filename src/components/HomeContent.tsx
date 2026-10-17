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
    dZh: "对豆包 / DeepSeek / 智谱 / 百度 / 千问产出标题、大纲与渠道清单。",
    dEn: "Generate titles, outlines, and channel lists for each CN generative engine.",
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
    zh: "五家引擎问法不同，人工投放难以规模化",
    en: "Five engines, five prompt styles — manual GEO does not scale",
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
            {t("Generative Engine Optimization · 国内引擎", "GEO for CN generative engines")}
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
              href="/demo"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-[#070b12] shadow-[0_0_28px_rgba(34,211,238,0.3)] transition hover:brightness-110"
            >
              {t("申请试用", "Request a demo")}
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
            >
              {t("查看方案（草案）", "View draft pricing")}
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
              "价格与赞助位均为草案，正式计费以 Stripe / 合约为准。",
              "Prices and sponsor slots are draft until Stripe / contracts go live.",
            )}
          </p>
        </div>
      </div>

      {/* Problem */}
      <Section>
        <SectionLabel>{t("痛点", "Problem")}</SectionLabel>
        <SectionTitle>
          {t(
            "品牌在国内生成式引擎里「隐形」",
            "Brands are invisible inside CN generative engines",
          )}
        </SectionTitle>
        <SectionLead>
          {t(
            "用户越来越常直接问豆包、DeepSeek、智谱、百度、通义。若没有结构化投放与监测，你的品牌不会被点名。",
            "Users ask Doubao, DeepSeek, Zhipu, Baidu, and Qwen directly. Without structured GEO and monitoring, you never get named.",
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
        <SectionLabel>{t("覆盖引擎", "Engines covered")}</SectionLabel>
        <SectionTitle>
          {t("五家投放引擎 + 情报层扩展", "Five execution engines + intel layer")}
        </SectionTitle>
        <SectionLead>
          {t(
            "投放模板覆盖豆包、DeepSeek、智谱、百度、通义千问；情报层另可纳入元宝、Kimi 等。",
            "Pack templates cover Doubao, DeepSeek, Zhipu, Baidu, Qwen; intel can also include Yuanbao, Kimi, and more.",
          )}
        </SectionLead>
        <div className="mt-8 flex flex-wrap gap-3">
          {siteConfig.engines.map((e) => (
            <span
              key={e}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-100"
            >
              {e}
            </span>
          ))}
          {siteConfig.intelEngines.map((e) => (
            <span
              key={e}
              className="rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-sm font-medium text-violet-100"
            >
              {e}
              <span className="ml-1.5 text-xs text-violet-300/60">
                {t("情报", "intel")}
              </span>
            </span>
          ))}
        </div>
      </Section>

      {/* Social proof placeholders */}
      <Section className="border-y border-white/5">
        <SectionLabel>{t("口碑（占位）", "Social proof (placeholder)")}</SectionLabel>
        <SectionTitle>
          {t("案例与数据稍后上线", "Case studies coming soon")}
        </SectionTitle>
        <SectionLead>
          {t(
            "我们不会编造营收或客户。正式合作后会在此放可核验的提及率与引用提升摘要。",
            "We do not invent revenue or customers. Verified mention / citation lifts will appear here after real partnerships.",
          )}
        </SectionLead>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-36 flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5"
            >
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-white/5" />
                <div className="h-2 w-4/5 rounded bg-white/5" />
              </div>
              <p className="text-xs text-zinc-600">
                {t(`占位卡片 ${i}`, `Placeholder ${i}`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section>
        <SectionLabel>{t("方案预览", "Pricing teaser")}</SectionLabel>
        <SectionTitle>
          {t("与产品内 plan 对齐：free / starter / pro / enterprise", "Aligned with in-app plans")}
        </SectionTitle>
        <SectionLead>
          {t(
            "下列为草案价目；配额来自 geo-platform 的 PlanConfig。",
            "Draft list prices; quotas mirror geo-platform PlanConfig.",
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
          href="/pricing"
          className="mt-6 inline-flex text-sm font-medium text-cyan-300 hover:underline"
        >
          {t("看完整方案与赞助", "Full pricing & sponsors")} →
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
              href="/demo"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#070b12] transition hover:bg-zinc-200"
            >
              {t("申请试用", "Request demo")}
            </Link>
            <Link
              href="/sponsor"
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
