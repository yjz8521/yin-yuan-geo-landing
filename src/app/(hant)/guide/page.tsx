import type { Metadata } from "next";
import { GuideIndex, guideIndexMeta } from "@/views/pages";

export const metadata: Metadata = guideIndexMeta("zh-hant");

export default function Page() {
  return <GuideIndex l="zh-hant" />;
}
