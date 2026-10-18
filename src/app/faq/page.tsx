import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/content/geo";

export const metadata: Metadata = {
  title: "常见问题 FAQ：什么是 GEO、和 SEO 差别、价格",
  description: "引源 GEO 常见问题：什么是生成式引擎优化（GEO）、与 SEO 的差别、支持豆包 DeepSeek 千问等哪些引擎、如何监测品牌提及、多久见效、价格与适用对象。",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <h1 className="text-3xl font-bold text-white">引源 GEO 常见问题</h1>
      <p className="mt-3 text-zinc-400">关于生成式引擎优化（GEO）与引源 GEO 投放台的直接回答。</p>
      <div className="mt-10 space-y-8">
        {faqs.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold text-white">{f.q}</h2>
            <p className="mt-2 leading-relaxed text-zinc-300">{f.a}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-zinc-400">延伸阅读：<Link href="/guide/" className="text-cyan-300 hover:underline">GEO 指南</Link> · <Link href="/pricing/" className="text-cyan-300 hover:underline">方案价格</Link></p>
    </div>
  );
}
