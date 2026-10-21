"use client";

import { useI18n } from "@/lib/i18n";

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <div
      className="inline-flex rounded-full border border-zinc-200 bg-white p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "zh"
            ? "bg-zinc-100 text-zinc-950"
            : "text-zinc-600 hover:text-zinc-950"
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "en"
            ? "bg-zinc-100 text-zinc-950"
            : "text-zinc-600 hover:text-zinc-950"
        }`}
      >
        EN
      </button>
    </div>
  );
}
