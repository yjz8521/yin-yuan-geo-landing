import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "关于 About",
  description: "引源 GEO 投放台 — 产品负责人 Kinnv，由 Grok Bot CEO 协助运营。",
};

export default function AboutPage() {
  return <AboutContent />;
}
