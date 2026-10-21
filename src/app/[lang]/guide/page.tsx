import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";
import { GuideIndex, guideIndexMeta } from "@/views/pages";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return guideIndexMeta(lang as Locale);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <GuideIndex l={lang as Locale} />;
}
