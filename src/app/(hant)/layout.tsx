import type { Metadata } from "next";
import { RootShell, rootMetadata } from "@/views/Shell";
import "../globals.css";

export const metadata: Metadata = rootMetadata("zh-hant");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="zh-hant">{children}</RootShell>;
}
