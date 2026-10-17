"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleToggle } from "./LocaleToggle";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/pricing", zh: "方案", en: "Pricing" },
  { href: "/sponsor", zh: "赞助", en: "Sponsor" },
  { href: "/demo", zh: "试用", en: "Demo" },
  { href: "/about", zh: "关于", en: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070b12]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-[#070b12] shadow-[0_0_24px_rgba(34,211,238,0.35)]">
            引
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
            {t(siteConfig.name, siteConfig.nameEn)}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                {t(l.zh, l.en)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleToggle />
          <Link
            href="/demo"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-3.5 py-1.5 text-xs font-semibold text-[#070b12] shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:brightness-110 sm:text-sm"
          >
            {t("申请试用", "Request demo")}
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                active
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t(l.zh, l.en)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
