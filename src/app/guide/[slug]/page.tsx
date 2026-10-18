import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { guides } from "@/content/geo";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/guide/${g.slug}/` }, openGraph: { type: "article", title: g.title, description: g.description } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const url = `${getSiteUrl()}/guide/${g.slug}/`;
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, inLanguage: "zh", url, mainEntityOfPage: url, author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name, url: getSiteUrl() }, datePublished: "2026-10-18" }} />
      <p className="text-sm text-zinc-500"><Link href="/guide/" className="hover:underline">GEO 指南</Link></p>
      <h1 className="mt-2 text-3xl font-bold text-white">{g.title}</h1>
      <p className="mt-3 text-zinc-400">{g.description}</p>
      {g.sections.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-xl font-semibold text-white">{s.h}</h2>
          {s.p.map((p, i) => <p key={i} className="mt-3 leading-relaxed text-zinc-300">{p}</p>)}
        </section>
      ))}
      <p className="mt-12 text-zinc-400">引源 GEO 投放台把以上流程做成工作台：实体卡 → 引擎投放包 → 渠道发布 → 提及监测。<Link href="/faq/" className="text-cyan-300 hover:underline">常见问题</Link> · <Link href="/demo/" className="text-cyan-300 hover:underline">申请试用</Link></p>
    </article>
  );
}
