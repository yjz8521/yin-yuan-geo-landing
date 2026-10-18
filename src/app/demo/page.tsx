import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { DemoContent } from "@/components/DemoContent";

export const metadata: Metadata = pageMeta("/demo/", "申请试用 Demo", "申请引源 GEO 远程演示：实体卡、国内与海外引擎投放包与提及监测矩阵，约 30–45 分钟。");

export default function DemoPage() {
  return <DemoContent />;
}
