import type { Metadata } from "next";
import { SponsorContent } from "@/components/SponsorContent";

export const metadata: Metadata = {
  title: "赞助 Sponsor",
  description: "引源 GEO 落地页早期赞助位（草案价，如 US$250/周 首页主赞助）。",
};

export default function SponsorPage() {
  return <SponsorContent />;
}
