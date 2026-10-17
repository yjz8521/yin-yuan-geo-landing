"use client";

import { useState, type FormEvent } from "react";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { getAppUrl, getDemoEmail } from "@/lib/site";

const includes = [
  {
    zh: "实体卡填写与就绪校验演示",
    en: "Entity card setup + readiness check walkthrough",
  },
  {
    zh: "至少一家引擎投放包生成预览",
    en: "Preview pack generation for at least one engine",
  },
  {
    zh: "监测问法与提及率矩阵说明",
    en: "Monitor prompts and mention-rate matrix overview",
  },
  {
    zh: "方案配额对照（free → enterprise）",
    en: "Plan quota walkthrough (free → enterprise)",
  },
];

export function DemoContent() {
  const { t, locale } = useI18n();
  const email = getDemoEmail();
  const appUrl = getAppUrl();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject =
      locale === "zh" ? "引源 GEO 试用申请" : "YinYuan GEO demo request";
    const body =
      locale === "zh"
        ? `姓名 / 称呼：${name}\n公司：${company}\n需求：\n${note}`
        : `Name: ${name}\nCompany: ${company}\nNotes:\n${note}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("试用", "Demo")}</SectionLabel>
      <SectionTitle>
        {t("试用包含什么", "What a trial includes")}
      </SectionTitle>
      <SectionLead>
        {t(
          "远程演示约 30–45 分钟。产品 App 上线后会通过环境变量露出入口；目前请用邮件预约。",
          "Remote walkthrough ~30–45 minutes. When the app is live, NEXT_PUBLIC_APP_URL will expose the entry; for now, book by email.",
        )}
      </SectionLead>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {includes.map((item) => (
          <li
            key={item.en}
            className="rounded-xl border border-white/8 bg-[#0c121c] px-4 py-3 text-sm text-zinc-200"
          >
            {t(item.zh, item.en)}
          </li>
        ))}
      </ul>

      {appUrl ? (
        <p className="mt-6 text-sm text-cyan-300">
          <a href={appUrl} className="underline-offset-4 hover:underline" rel="noopener noreferrer">
            {t("打开产品 App", "Open product app")} →
          </a>
        </p>
      ) : (
        <p className="mt-6 text-sm text-zinc-500">
          {t(
            "尚未配置 NEXT_PUBLIC_APP_URL，故不展示公开产品链接。",
            "NEXT_PUBLIC_APP_URL is unset — no public product URL is shown.",
          )}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-10 max-w-lg space-y-4 rounded-2xl border border-white/8 bg-[#0c121c] p-6"
      >
        <p className="text-sm font-medium text-white">
          {t("填写后会打开邮件客户端", "Opens your mail client on submit")}
        </p>
        <label className="block text-sm text-zinc-400">
          {t("称呼", "Name")}
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/40"
          />
        </label>
        <label className="block text-sm text-zinc-400">
          {t("公司 / 品牌", "Company / brand")}
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/40"
          />
        </label>
        <label className="block text-sm text-zinc-400">
          {t("想看什么", "What you want to see")}
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/40"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 py-2.5 text-sm font-semibold text-[#070b12] transition hover:brightness-110"
        >
          {t(`发送至 ${email}`, `Send to ${email}`)}
        </button>
        <p className="text-center text-xs text-zinc-600">
          <a href={`mailto:${email}`} className="hover:text-zinc-400">
            {t("或直接写信", "Or email directly")}: {email}
          </a>
        </p>
      </form>
    </Section>
  );
}
