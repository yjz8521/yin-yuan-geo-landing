import type { Metadata } from "next";
import { About, aboutMeta } from "@/views/pages";

export const metadata: Metadata = aboutMeta("zh-hant");

export default function Page() {
  return <About />;
}
