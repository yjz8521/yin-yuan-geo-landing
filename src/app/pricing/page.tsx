import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { PricingContent } from "@/components/PricingContent";

export const metadata: Metadata = pageMeta("/pricing/", "方案与价格 Pricing", "引源 GEO 价格：Free NT$0；Starter NT$1,990／月；Pro NT$3,900／月或季付 NT$9,900／季；Enterprise 洽谈。台湾与海外可用信用卡／PayPal，大陆客户可联系人工开通。");

export default function PricingPage() {
  return <PricingContent />;
}
