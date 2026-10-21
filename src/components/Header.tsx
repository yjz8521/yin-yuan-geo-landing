"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleToggle } from "./LocaleToggle";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/pricing/", zh: "方案", en: "Pricing" },
  { href: "/guide/", zh: "指南", en: "Guide" },
  { href: "/faq/", zh: "FAQ", en: "FAQ" },
  { href: "/demo/", zh: "试用", en: "Demo" },
  { href: "/sponsor/", zh: "赞助", en: "Sponsor" },
  { href: "/about/", zh: "关于", en: "About" },
];

/** usePathname() has no basePath; normalise trailing slash and treat /guide/* as Guide. */
function isActive(pathname: string | null, href: string) {
  const p = (pathname || "/").replace(/\/?$/, "/");
  if (href === "/") return p === "/";
  return p === href || p.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white">
            引
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-950 sm:text-base">
            {t(siteConfig.name, siteConfig.nameEn)}
          </span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
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
            href="/demo/"
            className="whitespace-nowrap rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-800 sm:text-sm"
          >
            {t("申请试用", "Request demo")}
          </Link>
        </div>
      </div>

      <nav aria-label="主导航（手机）" className="flex gap-1 overflow-x-auto border-t border-zinc-200 px-4 py-2 md:hidden">
        {links.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                active
                  ? "bg-zinc-100 text-zinc-950"
                  : "text-zinc-600 hover:text-zinc-950"
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
