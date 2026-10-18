"use client";

import Link from "next/link";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { draftPlans, checkoutLinks, getDemoEmail } from "@/lib/site";

export function PricingContent() {
  const { t, locale } = useI18n();
  const email = getDemoEmail();
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    locale === "zh" ? "引源 GEO 方案咨询" : "YinYuan GEO plan inquiry",
  )}`;
  const cnMailto = `mailto:${email}?subject=${encodeURIComponent("引源 GEO 大陆客户开通咨询（微信／对公转账）")}`;

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("方案", "Pricing")}</SectionLabel>
      <SectionTitle>
        {t("free / starter / pro / enterprise", "free / starter / pro / enterprise")}
      </SectionTitle>
      <SectionLead>
        {t(
          "Starter / Pro 支持信用卡与 PayPal 按月订阅（新台币计价）。大陆客户可联系人工开通（微信／对公转账）。",
          "Starter / Pro are monthly subscriptions via card or PayPal (billed in TWD). Mainland China customers can contact us for manual activation.",
        )}
      </SectionLead>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {draftPlans.map((p) => {
          const paid = p.code === "starter" || p.code === "pro";
          const href = paid
            ? checkoutLinks[p.code as "starter" | "pro"]
            : p.code === "enterprise"
              ? mailto
              : "/demo";
          const ctaLabel = paid
            ? t("信用卡／PayPal 订阅", "Subscribe (card / PayPal)")
            : p.code === "enterprise"
              ? t("联系销售", "Contact sales")
              : t("申请试用", "Request demo");

          const className = `mt-6 block rounded-full py-2.5 text-center text-sm font-semibold transition ${
            p.featured
              ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-[#070b12] hover:brightness-110"
              : "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10"
          }`;

          return (
            <div
              key={p.code}
              className={`flex flex-col rounded-2xl border p-6 ${
                p.featured
                  ? "border-cyan-400/35 bg-gradient-to-b from-cyan-400/12 to-[#0c121c] shadow-[0_0_40px_rgba(34,211,238,0.08)]"
                  : "border-white/8 bg-[#0c121c]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {locale === "zh" ? p.nameZh : p.nameEn}
                </h3>
                {p.featured ? (
                  <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
                    Pro
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {locale === "zh" ? p.priceZh : p.priceEn}
                <span className="text-sm font-normal text-zinc-500">
                  {locale === "zh" ? p.periodZh : p.periodEn}
                </span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {locale === "zh" ? p.blurbZh : p.blurbEn}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-zinc-300">
                {(locale === "zh" ? p.highlightsZh : p.highlightsEn).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                    {h}
                  </li>
                ))}
              </ul>
              {href.startsWith("/") ? (
                <Link href={href} className={className}>
                  {ctaLabel}
                </Link>
              ) : (
                <a href={href} className={className} rel="noopener noreferrer">
                  {ctaLabel}
                </a>
              )}
              {paid ? (
                <a href={cnMailto} className="mt-2 block rounded-full border border-white/10 py-2 text-center text-xs text-zinc-300 hover:bg-white/5">
                  {t("大陆客户：联系开通（微信／对公转账）", "Mainland China: contact to activate (WeChat / bank transfer)")}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-zinc-600">
        {t(
          "订阅可随时取消。Enterprise 与发票需求请来信 yjz8521@gmail.com。",
          "Cancel anytime. For Enterprise or invoices, email yjz8521@gmail.com.",
        )}
      </p>
    </Section>
  );
}
