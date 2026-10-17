import type { Metadata } from "next";
import { DemoContent } from "@/components/DemoContent";

export const metadata: Metadata = {
  title: "试用 Demo",
  description: "申请引源 GEO 试用：实体卡、引擎投放包与监测矩阵演示。",
};

export default function DemoPage() {
  return <DemoContent />;
}
