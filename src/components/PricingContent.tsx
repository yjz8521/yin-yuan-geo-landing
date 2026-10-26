"use client";

import Link from "next/link";
import { PageHero, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import { PAYMENTS_LIVE, contactIds, draftPlans, getDemoEmail } from "@/lib/site";

export function PricingContent() {
  const { t, locale, p: lpath } = useI18n();
  const email = getDemoEmail();
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    locale.startsWith("zh") ? "引源 GEO 方案咨询" : "YinYuan GEO plan inquiry",
  )}&body=${encodeURIComponent(
    locale.startsWith("zh")
      ? "您好，我想了解引源 GEO 方案。\n公司／品牌：\n团队规模：\n想监测的引擎／品类：\n"
      : "Hi, I'd like to learn about YinYuan GEO plans.\nCompany / brand:\nTeam size:\nEngines / category to monitor:\n",
  )}`;
  const cnMailto = `mailto:${email}?subject=${encodeURIComponent("引源 GEO 联系购买（微信／支付宝）")}&body=${encodeURIComponent("您好，我想开通引源 GEO。\n方案（Starter／Pro／Pro 季付）：\n公司／品牌：\n联系方式（微信／电话）：\n付款方式（微信／支付宝）：\n")}`;

  return (
    <>
    <PageHero
      label={t("方案", "Pricing")}
      title={t("方案与价格：Free / Starter / Pro / Enterprise", "Plans & pricing: Free / Starter / Pro / Enterprise")}
      lead={t(
        "Starter / Pro 采用「联系购买」：通过 LINE、微信或 Email 联系我们，确认方案后提供微信／支付宝收款码，付款后人工开通（新台币计价，Pro 另有季付）。",
        "Starter / Pro are purchased by contacting us via LINE, WeChat or email. After confirming your plan we send WeChat Pay / Alipay QR payment details and activate your account manually (billed in TWD; Pro also quarterly).",
      )}
    >
      {PAYMENTS_LIVE ? null : (
        <p className="mt-6 max-w-2xl rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-800">
          {t(
            "目前暂不提供线上刷卡。请通过 LINE、微信或 Email 联系购买，我们会人工报价并开通。",
            "Online card checkout is not available yet. Please contact us via LINE, WeChat or email to purchase; we will quote and activate manually.",
          )}{" "}
          <a href={mailto} className="underline underline-offset-4 hover:text-zinc-950">{email}</a>
        </p>
      )}
    </PageHero>
    <Section className="pt-12 sm:pt-14">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {draftPlans.map((p) => {
          const paid = p.code === "starter" || p.code === "pro";
          const href = paid
            ? "#contact-purchase"
            : p.code === "enterprise"
              ? mailto
              : lpath("/demo/");
          const ctaLabel = paid
            ? t("联系购买", "Contact to buy")
            : p.code === "enterprise"
              ? t("联系销售", "Contact sales")
              : t("申请试用", "Request demo");

          const className = `mt-6 block rounded-full py-2.5 text-center text-sm font-semibold transition ${
            p.featured
              ? "bg-zinc-950 text-white hover:bg-zinc-800"
              : "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100"
          }`;

          return (
            <div
              key={p.code}
              className={`flex flex-col rounded-2xl border p-6 ${
                p.featured
                  ? "border-zinc-950 bg-white shadow-sm"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-950">
                  {t(p.nameZh, p.nameEn)}
                </h3>
                {p.featured ? (
                  <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {t("推荐", "Popular")}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
                {t(p.priceZh, p.priceEn)}
                <span className="text-sm font-normal text-zinc-500">
                  {t(p.periodZh, p.periodEn)}
                </span>
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                {t(p.blurbZh, p.blurbEn)}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-zinc-600">
                {t(p.highlightsZh, p.highlightsEn).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-950" />
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
              {p.code === "pro" ? (
                <a href="#contact-purchase" className="mt-2 block rounded-full border border-zinc-300 py-2 text-center text-xs text-zinc-950 hover:bg-zinc-100">
                  {t("季付 NT$9,900／季（约 NT$3,300／月，省 15%）", "Quarterly NT$9,900 (~NT$3,300/mo, save 15%)")}
                </a>
              ) : null}
            </div>
          );
        })}
      </div>

      <div id="contact-purchase" className="mt-10 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-950">{t("联系购买", "Contact to buy")}</h3>
        <p className="mt-2 text-sm text-zinc-600">
          {t(
            "请通过以下任一方式联系我们，注明想购买的方案（Starter／Pro／Pro 季付）。确认后我们会提供微信／支付宝个人收款码，付款后人工开通工作台。",
            "Contact us by any of the channels below and tell us which plan you want (Starter / Pro / Pro quarterly). We will send WeChat Pay / Alipay personal QR payment details, then activate your workspace manually after payment.",
          )}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-800">
          <li>LINE ID：<span className="font-semibold">{contactIds.line}</span></li>
          <li>{t("微信 ID", "WeChat ID")}：<span className="font-semibold">{contactIds.wechat}</span></li>
          <li>Email：<a href={cnMailto} className="font-semibold underline underline-offset-4">{email}</a></li>
          <li>{t("付款方式：微信／支付宝个人收款码（联系后提供）", "Payment: WeChat Pay / Alipay personal QR code (sent after contact)")}</li>
        </ul>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-zinc-400">
        {t(
          "可随时停止续费。付款后我们会联系你，人工协助开通工作台。Enterprise 与发票需求请来信 yjz8521@gmail.com。",
          "Stop renewing anytime. After payment we contact you and set up your workspace with you. For Enterprise or invoices, email yjz8521@gmail.com.",
        )}
      </p>
    </Section>
    </>
  );
}
