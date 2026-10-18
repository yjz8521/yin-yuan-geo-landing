import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = pageMeta("/about/", "关于 About", "引源 GEO 投放台：面向华语市场、覆盖国内与海外生成式 AI 的 GEO SaaS，产品负责人 Kinnv。");

export default function AboutPage() {
  return <AboutContent />;
}
