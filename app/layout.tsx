import type { Metadata } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/navbar'

const siteUrl = 'https://peace.line88.tw'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: '台灣生命禮儀資訊網｜後事流程、生命禮儀、殯葬服務與塔位費用資訊',
    template: '%s｜台灣生命禮儀資訊網',
  },

  description:
    '台灣生命禮儀資訊網提供後事流程、臨終準備、往生後第一步、生命禮儀、殯葬服務、葬儀社、禮儀公司、告別式、火化、靈骨塔、塔位資訊、喪禮費用、生前契約與家屬諮詢協助，協助家屬快速了解治喪安排與相關注意事項。',

  keywords: [
    '台灣生命禮儀資訊網',
    '生命資訊網',
    '生命禮儀',
    '生命禮儀公司',
    '禮儀公司',
    '葬儀社',
    '殯葬服務',
    '殯葬資訊',
    '後事流程',
    '往生後流程',
    '往生後第一步',
    '臨終準備',
    '治喪流程',
    '喪禮流程',
    '告別式流程',
    '告別式',
    '告別式費用',
    '喪禮費用',
    '殯葬費用',
    '一條龍禮儀服務',
    '遺體接運',
    '遺體冰存',
    '靈堂布置',
    '入殮',
    '火化',
    '火化費用',
    '骨灰罈',
    '靈骨塔',
    '塔位',
    '塔位價格',
    '塔位資訊',
    '納骨塔',
    '墓園',
    '生前契約',
    '殯葬規劃',
    '頭七',
    '做七',
    '法會',
    '誦經',
    '紙紮',
    '花籃',
    '罐頭塔',
    '家屬諮詢',
    '後事諮詢',
  ],

  metadataBase: new URL(siteUrl),

alternates: {
  canonical: "/",
},

  icons: {
    icon: '/images/logo.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: '台灣生命禮儀資訊網｜後事流程、生命禮儀、殯葬服務與塔位費用資訊',
    description:
      '整理後事流程、生命禮儀、殯葬服務、葬儀社、告別式、火化、靈骨塔、塔位價格、喪禮費用與生前規劃資訊，協助家屬安心了解治喪安排。',
    url: siteUrl,
    siteName: '台灣生命禮儀資訊網',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '台灣生命禮儀資訊網｜後事流程與生命禮儀資訊平台',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '台灣生命禮儀資訊網｜後事流程、生命禮儀、殯葬服務與塔位費用資訊',
    description:
      '提供後事流程、生命禮儀、殯葬服務、塔位資訊、喪禮費用與家屬諮詢協助。',
    images: ['/images/og-home.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={`${notoSansTC.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
<Script
  src="https://ana.line88.tw/script.js"
  data-website-id="24cc7078-6d8f-46cd-abf4-6f037b35da1a"
  strategy="afterInteractive"
/>
        <Navbar />
        {children}
      </body>
    </html>
  )
}