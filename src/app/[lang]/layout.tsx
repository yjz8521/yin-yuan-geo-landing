import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PREFIXED, isLocale } from "@/lib/locales";
import { RootShell, rootMetadata } from "@/views/Shell";
import "../globals.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return PREFIXED.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? rootMetadata(lang) : {};
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "zh-hant") notFound();
  return <RootShell locale={lang}>{children}</RootShell>;
}
