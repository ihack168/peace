"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { LineConsultButton } from "@/components/line-consult-button";
import { LatestPostsSection } from "@/components/latest-posts-section";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "社會住宅包租代管資訊站",
        url: "https://home.line88.tw",
        description:
          "提供社會住宅包租代管、房東出租、租客媒合、租屋補助與房屋出租管理相關資訊。"
      },
      {
        "@type": "LocalBusiness",
        name: "社會住宅包租代管資訊站",
        url: "https://home.line88.tw",
        description:
          "提供社會住宅包租代管、房屋出租管理、租客媒合與租屋補助相關諮詢服務，協助房東安心出租。",
        areaServed: "TW",
        serviceType: [
          "社會住宅包租代管",
          "房屋出租管理",
          "租客媒合",
          "租屋補助諮詢"
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "什麼是社會住宅包租代管？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "社會住宅包租代管是由專業單位協助房東出租房屋、管理租務與租客媒合的住宅服務模式。"
            }
          },
          {
            "@type": "Question",
            name: "房東加入包租代管有什麼好處？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "房東可透過包租代管降低自行管理出租的時間成本，並透過專業協助提升出租效率與租務管理穩定度。"
            }
          },
          {
            "@type": "Question",
            name: "包租代管適合哪些房東？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "適合沒有時間管理出租、想降低空租風險、希望穩定出租，或想了解政府社會住宅包租代管方案的房東。"
            }
          },
          {
            "@type": "Question",
            name: "租客可以申請租屋補助嗎？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "符合資格的租客可依政府規定申請租屋補助，實際資格與金額依各地政府公告為準。"
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        <div className="pt-24 md:pt-36 pb-8">
          <HeroSection />
        </div>

        <LatestPostsSection />

        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            SOCIAL HOUSING RENTAL MANAGEMENT
          </p>

          <h2 className="mt-3 text-2xl font-black text-foreground md:text-4xl">
            社會住宅包租代管資訊站
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            本站整理社會住宅包租代管、房東出租、租客媒合、
            房屋出租管理與租屋補助相關資訊。
            若你想了解自己的房屋是否適合加入包租代管，
            可直接透過 LINE 免費諮詢。
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              房東安心出租
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              包租代管諮詢
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              租屋補助資訊
            </div>
          </div>

          <LineConsultButton className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(31,78,121,0.28)] transition-all hover:-translate-y-0.5">
            加入 LINE 免費諮詢
          </LineConsultButton>
        </section>
      </main>

      <Footer />
    </div>
  );
}