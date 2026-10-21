import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { draftPlans, getDemoEmail, getSiteUrl, siteConfig } from "@/lib/site";
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
  description: `引源 GEO 投放台：面向华语市场的 GEO SaaS。自动监测目前已接入 DeepSeek；豆包、通义千问、智谱、百度文心／文小言、Kimi、元宝与海外 ChatGPT、Perplexity、Google AI Overviews／Gemini、Claude、Copilot 陆续接入中。实体卡 → 投放包 → 发布 → 提及监测。`,
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
    "ChatGPT",
    "Perplexity",
    "Gemini",
    "Claude",
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "引源 GEO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.taglineZh,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: { "zh-Hant": "/", "zh-Hans": "/", en: "/", "x-default": "/" },
  },
};

const orgId = `${siteUrl}/#org`;
const ld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": orgId, name: siteConfig.name, alternateName: [siteConfig.nameEn, siteConfig.productFull], url: siteUrl, email: getDemoEmail(), founder: { "@type": "Person", name: siteConfig.owner }, areaServed: ["TW", "CN", "Worldwide"] },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: siteConfig.name, url: siteUrl, inLanguage: ["zh-Hant", "zh-Hans", "en"], publisher: { "@id": orgId } },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.productFull,
      alternateName: siteConfig.nameEn,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "生成式引擎优化（GEO）工作台：实体卡、引擎投放包、渠道发布与提及监测。自动监测已接入 DeepSeek；豆包、智谱清言、百度文心／文小言、通义千问、元宝、Kimi 及海外 ChatGPT、Perplexity、Google AI Overviews／Gemini、Claude、Copilot 陆续接入中（海外专属投放包路线图）。",
      publisher: { "@id": orgId },
      offers: draftPlans.filter((p) => p.code !== "enterprise").map((p) => ({
        "@type": "Offer",
        name: p.nameEn,
        price: p.priceZh.replace(/[^0-9]/g, "") || "0",
        priceCurrency: "TWD",
        url: `${siteUrl}/pricing/`,
        ...(p.code === "free" ? {} : { priceSpecification: { "@type": "UnitPriceSpecification", price: p.priceZh.replace(/[^0-9]/g, ""), priceCurrency: "TWD", billingDuration: "P1M" } }),
      })).concat([{ "@type": "Offer", name: "Pro (quarterly)", price: "9900", priceCurrency: "TWD", url: `${siteUrl}/pricing/`, priceSpecification: { "@type": "UnitPriceSpecification", price: "9900", priceCurrency: "TWD", billingDuration: "P3M" } } as never]),
    },
  ],
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
        <JsonLd data={ld} />
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
