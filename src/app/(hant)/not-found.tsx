import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面 404",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-zinc-500">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-950">找不到這個頁面</h1>
      <p className="mt-3 text-zinc-600">連結可能已變更。可以從下面的頁面繼續：</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/" className="rounded-full bg-zinc-950 px-5 py-2 font-semibold text-white">回首頁</Link>
        <Link href="/pricing/" className="rounded-full border border-zinc-200 px-5 py-2 text-zinc-700 hover:bg-zinc-100">方案與價格</Link>
        <Link href="/guide/" className="rounded-full border border-zinc-200 px-5 py-2 text-zinc-700 hover:bg-zinc-100">GEO 指南</Link>
        <Link href="/demo/" className="rounded-full border border-zinc-200 px-5 py-2 text-zinc-700 hover:bg-zinc-100">申請試用</Link>
      </div>
    </div>
  );
}
