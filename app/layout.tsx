import type { Metadata } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const siteUrl = 'https://home.line88.tw'

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
  default: '社會住宅包租代管資訊站｜房東安心出租，租客穩定入住',
  template: '%s｜社會住宅包租代管資訊站',
  },

  description:
    '提供社會住宅包租代管諮詢與媒合服務，協助房東了解政府包租代管方案、房屋出租管理、租客媒合、租金收付與後續服務，讓出租更安心、省時、有保障。',

  keywords: [
    '社會住宅包租代管',
    '社會住宅包租代管服務',
    '包租代管',
    '社宅包租代管',
    '政府包租代管',
    '房東包租代管',
    '租屋代管',
    '租屋補助',
    '出租管理',
    '房屋出租',
  ],

  metadataBase: new URL(siteUrl),

  alternates: {
    canonical: siteUrl,
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
    title: '社會住宅包租代管服務｜房東安心出租，租客穩定入住',
    description:
      '協助房東了解社會住宅包租代管方案，提供房屋評估、租客媒合、出租管理與後續服務，讓閒置房屋變成穩定收益。',
    url: siteUrl,
    siteName: '社會住宅包租代管資訊站',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '社會住宅包租代管服務',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '社會住宅包租代管服務｜房東安心出租，租客穩定入住',
    description:
      '房屋評估、租客媒合、出租管理與包租代管諮詢服務，協助房東安心出租。',
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

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}