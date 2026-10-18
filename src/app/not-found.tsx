import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到页面 404",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-cyan-400/80">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">找不到这个页面</h1>
      <p className="mt-3 text-zinc-400">链接可能已更改。可以从下面的页面继续：</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/" className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 font-semibold text-[#070b12]">回首页</Link>
        <Link href="/pricing/" className="rounded-full border border-white/15 px-5 py-2 text-zinc-200 hover:bg-white/5">方案与价格</Link>
        <Link href="/guide/" className="rounded-full border border-white/15 px-5 py-2 text-zinc-200 hover:bg-white/5">GEO 指南</Link>
        <Link href="/demo/" className="rounded-full border border-white/15 px-5 py-2 text-zinc-200 hover:bg-white/5">申请试用</Link>
      </div>
    </div>
  );
}
