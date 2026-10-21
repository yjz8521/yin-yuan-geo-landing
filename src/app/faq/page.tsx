import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/content/geo";

export const metadata: Metadata = {
  title: "常见问题 FAQ：什么是 GEO、和 SEO 差别、价格",
  description: "引源 GEO 常见问题：什么是 GEO、与 SEO 差别、国内与海外引擎覆盖（豆包 DeepSeek ChatGPT Perplexity 等）、如何监测、价格与适用对象。",
  alternates: { canonical: "/faq/" },
  openGraph: { type: "website", url: "/faq/", siteName: "引源 GEO", locale: "zh_TW", images: [{ url: "/og.png", width: 1200, height: 630, alt: "引源 GEO" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <h1 className="text-3xl font-bold text-zinc-950">引源 GEO 常见问题</h1>
      <p className="mt-3 text-zinc-600">关于生成式引擎优化（GEO）与引源 GEO 投放台的直接回答。</p>
      <div className="mt-10 space-y-8">
        {faqs.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold text-zinc-950">{f.q}</h2>
            <p className="mt-2 leading-relaxed text-zinc-600">{f.a}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-zinc-600">延伸阅读：<Link href="/guide/" className="text-zinc-950 hover:underline">GEO 指南</Link> · <Link href="/pricing/" className="text-zinc-950 hover:underline">方案价格</Link></p>
    </div>
  );
}
