import type { Metadata } from "next";
import { guides } from "@/content/geo";
import type { Locale } from "@/lib/locales";
import { GuideArticle, guideMeta } from "@/views/pages";

export const dynamicParams = false;
export async function generateStaticParams() {
  return guides.map((g) => ({ lang: "zh-hans", slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  return guideMeta(lang as Locale, slug);
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <GuideArticle l={lang as Locale} slug={slug} />;
}
