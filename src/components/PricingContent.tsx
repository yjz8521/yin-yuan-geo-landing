"use client";

import Link from "next/link";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { draftPlans, getDemoEmail, getStripeLink } from "@/lib/site";

export function PricingContent() {
  const { t, locale } = useI18n();
  const stripe = getStripeLink();
  const email = getDemoEmail();
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    locale === "zh" ? "引源 GEO 方案咨询" : "YinYuan GEO plan inquiry",
  )}`;

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("方案", "Pricing")}</SectionLabel>
      <SectionTitle>
        {t("free / starter / pro / enterprise", "free / starter / pro / enterprise")}
      </SectionTitle>
      <SectionLead>
        {t(
          "方案代码与配额对齐私有产品 geo-platform 的 PlanConfig。标价为草案，正式以 Stripe Payment Link / 合约为准。",
          "Plan codes and quotas align with private geo-platform PlanConfig. List prices are draft until Stripe Payment Links / contracts go live.",
        )}
      </SectionLead>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {draftPlans.map((p) => {
          const useStripe = p.cta === "stripe" && stripe !== "#";
          const href = useStripe ? stripe : p.cta === "demo" ? "/demo" : mailto;
          const ctaLabel = useStripe
            ? t("前往付款（草案）", "Pay (draft link)")
            : p.code === "enterprise"
              ? t("联系销售", "Contact sales")
              : p.cta === "stripe"
                ? t("询价 / 预约", "Inquire")
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
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-zinc-600">
        {t(
          "环境变量 NEXT_PUBLIC_STRIPE_PAYMENT_LINK 配置后，Starter / Pro 按钮会导向真实 Payment Link。未配置时回退为邮件询价。",
          "When NEXT_PUBLIC_STRIPE_PAYMENT_LINK is set, Starter / Pro CTAs open that Payment Link; otherwise they fall back to email.",
        )}
      </p>
    </Section>
  );
}
