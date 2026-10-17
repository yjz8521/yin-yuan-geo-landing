"use client";

import { useI18n } from "@/lib/i18n";

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <div
      className="inline-flex rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "zh"
            ? "bg-cyan-500/20 text-cyan-200"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "en"
            ? "bg-cyan-500/20 text-cyan-200"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        EN
      </button>
    </div>
  );
}
