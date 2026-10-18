import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { SponsorContent } from "@/components/SponsorContent";

export const metadata: Metadata = pageMeta("/sponsor/", "赞助位 Sponsor", "引源 GEO 落地页早期赞助位：首页主赞助 US$250／周、引擎区条幅 US$150／周（草案价）。");

export default function SponsorPage() {
  return <SponsorContent />;
}
