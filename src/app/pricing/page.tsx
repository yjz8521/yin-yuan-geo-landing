import type { Metadata } from "next";
import { PricingContent } from "@/components/PricingContent";

export const metadata: Metadata = {
  title: "方案 Pricing",
  description:
    "引源 GEO 方案草案：free / starter / pro / enterprise，配额对齐 geo-platform PlanConfig。",
};

export default function PricingPage() {
  return <PricingContent />;
}
