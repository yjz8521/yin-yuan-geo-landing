"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteBasePath, siteConfig } from "@/lib/site";

export function Footer() {
  const { t, p: lpath } = useI18n();
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-sm font-semibold text-zinc-950">
            {t(siteConfig.productFull, `${siteConfig.nameEn} Platform`)}
          </p>
          <p className="text-sm leading-relaxed text-zinc-500">
            {t(siteConfig.taglineZh, siteConfig.taglineEn)}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
          <Link href={lpath("/pricing/")} className="hover:text-zinc-950">
            {t("方案", "Pricing")}
          </Link>
          <Link href={lpath("/guide/")} className="hover:text-zinc-950">
            {t("GEO 指南", "Guide")}
          </Link>
          <Link href={lpath("/faq/")} className="hover:text-zinc-950">
            FAQ
          </Link>
          <Link href={lpath("/demo/")} className="hover:text-zinc-950">
            {t("免费健检", "Free check")}
          </Link>
          <Link href={lpath("/about/")} className="hover:text-zinc-950">
            {t("关于", "About")}
          </Link>
          <a href={`${siteBasePath}/llms.txt`} className="hover:text-zinc-950">
            llms.txt
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} {siteConfig.owner} ·{" "}
        {t("引源 GEO 投放台", "YinYuan GEO")}
      </div>
    </footer>
  );
}
