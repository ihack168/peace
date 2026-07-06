import type { Metadata } from "next"

const siteUrl = "https://peace.line88.tw"
const siteName = "台灣生命禮儀資訊網"

export const metadata: Metadata = {
  title: "最新文章",
  description:
    "生命禮儀、後事流程、殯葬服務、葬儀社、告別式、火化、靈骨塔、塔位價格與喪禮費用相關文章整理。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `最新文章｜${siteName}`,
    description:
      "生命禮儀、後事流程、殯葬服務、葬儀社、告別式、火化、靈骨塔、塔位價格與喪禮費用相關文章整理。",
    url: `${siteUrl}/blog`,
    siteName,
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "台灣生命禮儀資訊網最新文章",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `最新文章｜${siteName}`,
    description:
      "生命禮儀、後事流程、殯葬服務、葬儀社、告別式、火化、靈骨塔、塔位價格與喪禮費用相關文章整理。",
    images: ["/images/og-home.jpg"],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}