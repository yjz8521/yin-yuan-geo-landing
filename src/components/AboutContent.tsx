"use client";

import Link from "next/link";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { getAppUrl, siteConfig } from "@/lib/site";

export function AboutContent() {
  const { t } = useI18n();
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
        <div className="rounded-2xl border border-white/8 bg-[#0c121c] p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/80">
            {t("产品负责人", "Product owner")}
          </h3>
          <p className="mt-3 text-2xl font-semibold text-white">{siteConfig.owner}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t(
              "负责产品方向、商业化与对外合作。",
              "Owns product direction, monetization, and partnerships.",
            )}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-[#0c121c] p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-300/80">
            {t("运营搭档", "Ops partner")}
          </h3>
          <p className="mt-3 text-2xl font-semibold text-white">Grok Bot CEO</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t(
              "由 Grok Bot 担任「CEO」角色，协助落地页、分发与日常运营例程。",
              "Grok Bot acts as CEO co-pilot for landing, distribution, and day-to-day ops routines.",
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
        <h3 className="text-base font-semibold text-white">
          {t("产品仓库（私有）", "Product repository (private)")}
        </h3>
        <p className="mt-2 font-mono text-sm text-zinc-400">{siteConfig.repoText}</p>
        <p className="mt-3 text-sm text-zinc-500">
          {t(
            "仓库为私有，本站仅以文字标示路径。产品工作台目前采邀请制，需先申请试用或订阅，由我们开通账号。",
            "The repo is private; the path is shown as text only. The workspace is invite-only for now — request a demo or subscribe and we will open your account.",
          )}
        </p>
        {appUrl ? (
          <p className="mt-4 text-sm">
            <a
              href={appUrl}
              className="text-cyan-300 underline-offset-4 hover:underline"
              rel="noopener noreferrer"
            >
              {t("已配置的产品入口", "Configured product entry")} →
            </a>
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/demo/"
          className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 text-sm font-semibold text-[#070b12]"
        >
          {t("申请试用", "Request demo")}
        </Link>
        <Link
          href="/pricing/"
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-200"
        >
          {t("方案", "Pricing")}
        </Link>
      </div>
    </Section>
  );
}
