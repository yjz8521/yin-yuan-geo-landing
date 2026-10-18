"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteBasePath, siteConfig } from "@/lib/site";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 bg-[#05080d]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-sm font-semibold text-white">
            {t(siteConfig.productFull, `${siteConfig.nameEn} Platform`)}
          </p>
          <p className="text-sm leading-relaxed text-zinc-500">
            {t(siteConfig.taglineZh, siteConfig.taglineEn)}
          </p>
          <p className="text-xs text-zinc-600">
            {t("产品私有仓（仅文字）", "Private product repo (text only)")}:{" "}
            <span className="font-mono text-zinc-500">{siteConfig.repoText}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
          <Link href="/pricing/" className="hover:text-white">
            {t("方案", "Pricing")}
          </Link>
          <Link href="/sponsor/" className="hover:text-white">
            {t("赞助", "Sponsor")}
          </Link>
          <Link href="/guide/" className="hover:text-white">
            {t("GEO 指南", "Guide")}
          </Link>
          <Link href="/faq/" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/demo/" className="hover:text-white">
            {t("试用", "Demo")}
          </Link>
          <Link href="/about/" className="hover:text-white">
            {t("关于", "About")}
          </Link>
          <a href={`${siteBasePath}/llms.txt`} className="hover:text-white">
            llms.txt
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {siteConfig.owner} ·{" "}
        {t("引源 GEO 投放台", "YinYuan GEO")}
      </div>
    </footer>
  );
}
