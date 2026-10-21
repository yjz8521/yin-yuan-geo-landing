import type { Metadata } from "next";
import { Sponsor, sponsorMeta } from "@/views/pages";

export const metadata: Metadata = sponsorMeta("zh-hant");

export default function Page() {
  return <Sponsor />;
}
