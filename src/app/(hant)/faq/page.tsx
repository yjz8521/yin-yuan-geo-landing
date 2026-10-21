import type { Metadata } from "next";
import { Faq, faqMeta } from "@/views/pages";

export const metadata: Metadata = faqMeta("zh-hant");

export default function Page() {
  return <Faq l="zh-hant" />;
}
