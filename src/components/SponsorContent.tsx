"use client";

import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { getDemoEmail, sponsorSlots } from "@/lib/site";

export function SponsorContent() {
  const { t, locale, p: lpath } = useI18n();
  const email = getDemoEmail();

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("早期赞助", "Early sponsors")}</SectionLabel>
      <SectionTitle as="h1">
        {t("SaaS 爬坡期的现金赞助位", "Cash sponsor slots while SaaS ramps")}
      </SectionTitle>
      <SectionLead>
        {t(
          "在产品订阅尚未规模化前，开放落地页赞助位。价格为草案，先到先得；不含编造流量数字。",
          "Until subscriptions scale, we open landing-page slots. Draft pricing, first-come; no invented traffic claims.",
        )}
      </SectionLead>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sponsorSlots.map((s) => {
          const subject =
            locale.startsWith("zh")
              ? `引源 GEO 赞助咨询 · ${s.nameZh}`
              : `YinYuan GEO sponsor · ${s.nameEn}`;
          const body =
            locale.startsWith("zh")
              ? `您好，我想预订「${s.nameZh}」（${s.priceZh}）。\n品牌：\n网址：\n希望的开始日期／周数：\n一句标语：\n`
              : `Hi, I'd like to book "${s.nameEn}" (${s.priceEn}).\nBrand:\nURL:\nPreferred start date / weeks:\nOne-line blurb:\n`;
          const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          return (
            <article
              key={s.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-zinc-950">
                {t(s.nameZh, s.nameEn)}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-zinc-950">
                {t(s.priceZh, s.priceEn)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {t(s.descZh, s.descEn)}
              </p>
              <a
                href={mailto}
                className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {t("邮件预订", "Email to book")}
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-zinc-200 bg-white/[0.02] p-6 text-sm text-zinc-600">
        <p className="font-medium text-zinc-700">
          {t("包含什么", "What you get")}
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1.5">
          <li>{t("品牌名 / Logo / 一句标语 / 外链", "Name / logo / one-line blurb / outbound link")}</li>
          <li>{t("一周展示周期（可续订）", "One-week flight (renewable)")}</li>
          <li>{t("不当作已验证客户背书", "Not presented as a verified customer endorsement")}</li>
        </ul>
      </div>
    </Section>
  );
}
