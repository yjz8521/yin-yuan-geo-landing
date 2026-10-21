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
  const { t, locale, p: lpath } = useI18n();
  const email = getDemoEmail();
  const appUrl = getAppUrl();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject =
      locale.startsWith("zh") ? "引源 GEO 试用申请" : "YinYuan GEO demo request";
    const body =
      locale.startsWith("zh")
        ? `姓名 / 称呼：${name}\n公司 / 品牌：${company || "（未填）"}\n联系方式（微信／电话，选填）：${contact || "（未填）"}\n需求：\n${note || "（未填）"}`
        : `Name: ${name}\nCompany / brand: ${company || "(not provided)"}\nOther contact (optional): ${contact || "(not provided)"}\nNotes:\n${note || "(not provided)"}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject + (company ? ` · ${company}` : ""))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionLabel>{t("试用", "Demo")}</SectionLabel>
      <SectionTitle as="h1">
        {t("申请试用：演示包含什么", "Request a demo: what it includes")}
      </SectionTitle>
      <SectionLead>
        {t(
          "远程演示约 30–45 分钟。产品工作台目前采邀请制，演示或订阅后由我们为你开通账号；现在请用下方表单或邮件预约。",
          "Remote walkthrough ~30–45 minutes. The workspace is invite-only for now — we open your account after the demo or subscription. Book with the form below or by email.",
        )}
      </SectionLead>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {includes.map((item) => (
          <li
            key={item.en}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700"
          >
            {t(item.zh, item.en)}
          </li>
        ))}
      </ul>

      {appUrl ? (
        <p className="mt-6 text-sm text-zinc-950">
          <a href={appUrl} className="underline-offset-4 hover:underline" rel="noopener noreferrer">
            {t("打开产品 App", "Open product app")} →
          </a>
        </p>
      ) : (
        <p className="mt-6 text-sm text-zinc-500">
          {t(
            "目前还没有公开的自助注册入口；收到申请后我们会邮件回复，约定演示时间。",
            "There is no public self-signup yet; we will reply by email to schedule the demo.",
          )}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-10 max-w-lg space-y-4 rounded-2xl border border-zinc-200 bg-white p-6"
      >
        <p className="text-sm font-medium text-zinc-950">
          {t("填写后会打开你的邮件程序，按「发送」即完成申请", "Opens your mail app — press Send to submit")}
        </p>
        <label className="block text-sm text-zinc-600">
          {t("称呼", "Name")}
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 outline-none focus:border-zinc-950"
          />
        </label>
        <label className="block text-sm text-zinc-600">
          {t("公司 / 品牌", "Company / brand")}
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 outline-none focus:border-zinc-950"
          />
        </label>
        <label className="block text-sm text-zinc-600">
          {t("微信／电话（选填）", "WeChat / phone (optional)")}
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 outline-none focus:border-zinc-950"
          />
        </label>
        <label className="block text-sm text-zinc-600">
          {t("想看什么", "What you want to see")}
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 outline-none focus:border-zinc-950"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-zinc-950 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          {t(`发送至 ${email}`, `Send to ${email}`)}
        </button>
        {sent ? (
          <p role="status" className="rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs text-zinc-950">
            {t(
              `若邮件程序没有自动打开，请直接写信到 ${email}，并附上上面填写的内容。`,
              `If your mail app did not open, email ${email} directly with the details above.`,
            )}
          </p>
        ) : null}
        <p className="text-center text-xs text-zinc-400">
          <a href={`mailto:${email}?subject=${encodeURIComponent(locale.startsWith("zh") ? "引源 GEO 试用申请" : "YinYuan GEO demo request")}`} className="hover:text-zinc-950">
            {t("或直接写信", "Or email directly")}: {email}
          </a>
        </p>
      </form>
    </Section>
  );
}
