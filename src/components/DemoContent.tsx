"use client";

import { useState, type FormEvent } from "react";
import { Section, SectionLabel, SectionLead, SectionTitle } from "./Section";
import { useI18n } from "@/lib/i18n";
import { checkDeliveryDays, contactIds, getAppUrl, getDemoEmail } from "@/lib/site";

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

const provide = [
  { zh: "公司／品牌名称", en: "Company / brand name" },
  { zh: "网站", en: "Website" },
  { zh: "产业", en: "Industry" },
  { zh: "主要产品或服务", en: "Main products or services" },
  { zh: "主要市场（台湾／大陆／海外）", en: "Main market (Taiwan / mainland China / overseas)" },
];

function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
    >
      {ok ? done : label}
    </button>
  );
}

function HealthCheck() {
  const { t, locale } = useI18n();
  const email = getDemoEmail();
  const zh = locale.startsWith("zh");
  const days = checkDeliveryDays;
  const contacts = [
    { k: "Email", v: email },
    ...(contactIds.line ? [{ k: "LINE ID", v: contactIds.line }] : []),
    ...(contactIds.wechat ? [{ k: t("微信 ID", "WeChat ID"), v: contactIds.wechat }] : []),
  ];
  const [f, setF] = useState({ company: "", website: "", industry: "", product: "", market: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = (zh ? "免费 AI 能见度健检申请" : "Free AI visibility check request") + (f.company ? ` · ${f.company}` : "");
    const na = zh ? "（未填）" : "(not provided)";
    const body = zh
      ? `公司／品牌名称：${f.company}\n网站：${f.website || na}\n产业：${f.industry || na}\n主要产品或服务：${f.product || na}\n主要市场（台湾／大陆／海外）：${f.market || na}`
      : `Company / brand: ${f.company}\nWebsite: ${f.website || na}\nIndustry: ${f.industry || na}\nMain products or services: ${f.product || na}\nMain market (Taiwan / mainland China / overseas): ${f.market || na}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const input = "mt-1.5 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-800 outline-none focus:border-zinc-950";
  return (
    <>
      <SectionLabel>{t("免费健检", "Free check")}</SectionLabel>
      <SectionTitle as="h1">{t("免费 AI 能见度健检", "Free AI visibility check")}</SectionTitle>
      <SectionLead>
        {t(
          "看看 DeepSeek 等 AI 现在回答你的品类时，有没有提到你。免费、不绑约；不保证排名或见效时间。",
          "See whether DeepSeek and other AI mention you when answering questions in your category. Free, no commitment; no guarantee of rankings or timing.",
        )}
      </SectionLead>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-950">{t("你要提供", "What you provide")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {provide.map((x) => <li key={x.en}>· {t(x.zh, x.en)}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-950">{t("我们会做", "What we do")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {t(
              "用 10 个固定问法去问 DeepSeek（自动），其他 AI（豆包、ChatGPT 等）由人工查询记录，整理成一份报告：有没有提到你、提到哪些竞争对手、建议先补哪些公开资料。",
              "We ask DeepSeek 10 fixed questions (automated) and check other AI (Doubao, ChatGPT and more) manually, then send you a report: whether you are mentioned, which competitors are mentioned, and which public information to add first.",
            )}
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700">{t("交付时间：约 ", "Delivery: within about ")}{days}{t(" 个工作天内", " business days")}</li>
        <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700">{t("免费、不绑约", "Free, no commitment")}</li>
        <li className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700">{t("不保证排名或见效时间", "No guarantee of rankings or timing")}</li>
      </ul>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-950">{t("联系方式", "Contact")}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t("把上面的资料传给我们即可申请。", "Send us the details above to apply.")}</p>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.k} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3">
                <span className="min-w-0 text-sm">
                  <span className="block text-xs text-zinc-500">{c.k}</span>
                  <span className="block break-all font-medium text-zinc-950">{c.v}</span>
                </span>
                <CopyButton value={c.v} label={t("复制", "Copy")} done={t("已复制", "Copied")} />
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-950">{t("或用邮件申请（会打开你的邮件程序）", "Or apply by email (opens your mail app)")}</p>
          <label className="block text-sm text-zinc-600">{t("公司／品牌名称", "Company / brand name")}<input required value={f.company} onChange={set("company")} className={input} /></label>
          <label className="block text-sm text-zinc-600">{t("网站", "Website")}<input value={f.website} onChange={set("website")} className={input} /></label>
          <label className="block text-sm text-zinc-600">{t("产业", "Industry")}<input value={f.industry} onChange={set("industry")} className={input} /></label>
          <label className="block text-sm text-zinc-600">{t("主要产品或服务", "Main products or services")}<input value={f.product} onChange={set("product")} className={input} /></label>
          <label className="block text-sm text-zinc-600">{t("主要市场（台湾／大陆／海外）", "Main market (Taiwan / mainland China / overseas)")}<input value={f.market} onChange={set("market")} className={input} /></label>
          <button type="submit" className="w-full rounded-full bg-zinc-950 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800">
            {t("用邮件申请健检", "Apply by email")}
          </button>
        </form>
      </div>
    </>
  );
}

export function DemoContent() {
  const { t, locale } = useI18n();
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
    <>
    <Section className="pt-12 sm:pt-16">
      <HealthCheck />
    </Section>
    <Section id="demo" className="border-t border-zinc-200">
      <SectionLabel>{t("试用", "Demo")}</SectionLabel>
      <SectionTitle>
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
    </>
  );
}
