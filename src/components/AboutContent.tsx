"use client";

import Link from "next/link";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { getAppUrl, siteConfig } from "@/lib/site";

export function AboutContent() {
  const { t, p: lpath } = useI18n();
  const appUrl = getAppUrl();

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("关于", "About")}</SectionLabel>
      <SectionTitle as="h1">
        {t(siteConfig.productFull, `${siteConfig.nameEn} Platform`)}
      </SectionTitle>
      <SectionLead>
        {t(
          "帮助品牌在国内与海外生成式 AI（豆包、DeepSeek、ChatGPT、Perplexity 等）上被提及、被引用、被推荐的 GEO SaaS。",
          "A GEO SaaS that helps brands get mentioned, cited, and recommended in Chinese and global generative AI (Doubao, DeepSeek, ChatGPT, Perplexity, and more).",
        )}
      </SectionLead>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {t("产品负责人", "Product owner")}
          </h3>
          <p className="mt-3 text-2xl font-semibold text-zinc-950">{siteConfig.owner}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {t(
              "负责产品方向、商业化与对外合作。",
              "Owns product direction, monetization, and partnerships.",
            )}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {t("运营搭档", "Ops partner")}
          </h3>
          <p className="mt-3 text-2xl font-semibold text-zinc-950">Grok Bot CEO</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {t(
              "由 Grok Bot 担任「CEO」角色，协助落地页、分发与日常运营例程。",
              "Grok Bot acts as CEO co-pilot for landing, distribution, and day-to-day ops routines.",
            )}
          </p>
        </div>
      </div>

      {appUrl ? (
        <p className="mt-8 text-sm">
          <a href={appUrl} className="text-zinc-950 underline-offset-4 hover:underline" rel="noopener noreferrer">
            {t("已配置的产品入口", "Configured product entry")} →
          </a>
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={lpath("/demo/")}
          className="rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-white"
        >
          {t("申请试用", "Request demo")}
        </Link>
        <Link
          href={lpath("/pricing/")}
          className="rounded-full border border-zinc-200 px-5 py-2 text-sm text-zinc-700"
        >
          {t("方案", "Pricing")}
        </Link>
      </div>
    </Section>
  );
}
