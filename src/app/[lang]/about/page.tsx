import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";
import { About, aboutMeta } from "@/views/pages";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return aboutMeta(lang as Locale);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return <About />;
}
