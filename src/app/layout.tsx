import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} · ${siteConfig.taglineZh}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: `${siteConfig.productFull} — ${siteConfig.taglineZh}. Entity card → engine packs → publish → mention monitoring for Doubao, DeepSeek, Zhipu, Baidu, Qwen.`,
  keywords: [
    "GEO",
    "Generative Engine Optimization",
    "引源 GEO",
    "豆包",
    "DeepSeek",
    "智谱",
    "百度",
    "通义千问",
    "品牌提及率",
  ],
  authors: [{ name: siteConfig.owner }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: ["zh_CN", "en_US"],
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.taglineZh}`,
    description: siteConfig.taglineZh,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.taglineZh,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
