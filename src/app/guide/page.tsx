import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/geo";

export const metadata: Metadata = {
  title: "GEO 指南：生成式引擎优化入门",
  description: "引源 GEO 指南：GEO 入门、实体卡写法、如何检测国内与海外 AI（豆包、DeepSeek、ChatGPT、Perplexity 等）是否提到你的品牌。",
  alternates: { canonical: "/guide/" },
};

export default function GuideIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">GEO 指南</h1>
      <ul className="mt-8 space-y-6">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guide/${g.slug}/`} className="text-lg font-semibold text-cyan-300 hover:underline">{g.title}</Link>
            <p className="mt-1 text-zinc-400">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
