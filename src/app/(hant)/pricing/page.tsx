import type { Metadata } from "next";
import { Pricing, pricingMeta } from "@/views/pages";

export const metadata: Metadata = pricingMeta("zh-hant");

export default function Page() {
  return <Pricing />;
}
