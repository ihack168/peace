"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { LineConsultButton } from "@/components/line-consult-button";
import { LatestPostsSection } from "@/components/latest-posts-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "台灣生命資訊網",
        url: "https://peace.line88.tw",
        description:
          "提供後事流程、生命禮儀、殯葬服務、塔位資訊、喪禮費用與家屬諮詢相關資訊。",
      },
      {
        "@type": "Organization",
        name: "台灣生命資訊網",
        url: "https://peace.line88.tw",
        description:
          "台灣生命資訊網整理後事流程、生命禮儀、塔位資訊、殯葬服務與喪禮費用觀念，協助家屬了解治喪安排方向。",
        areaServed: "TW",
      },
      {
        "@type": "Service",
        name: "後事流程與生命禮儀資訊諮詢",
        provider: {
          "@type": "Organization",
          name: "台灣生命資訊網",
        },
        areaServed: "TW",
        serviceType: [
          "後事流程資訊",
          "生命禮儀諮詢",
          "殯葬服務資訊",
          "塔位資訊",
          "喪禮費用觀念",
          "家屬諮詢協助",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "往生後第一步要做什麼？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "往生後通常需要先確認死亡證明、遺體接運、冰存與後續治喪安排。實際流程會依往生地點與家屬需求不同而調整。",
            },
          },
          {
            "@type": "Question",
            name: "喪禮費用通常包含哪些項目？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "喪禮費用常見包含遺體接運、冰存、禮儀服務、告別式場地、花藝布置、宗教儀式、火化、骨灰罈與塔位等項目。",
            },
          },
          {
            "@type": "Question",
            name: "殯葬服務可以先詢問流程嗎？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "可以。家屬可先詢問目前狀況、往生地點、宗教需求與預算方向，再由專人協助說明後續流程。",
            },
          },
          {
            "@type": "Question",
            name: "塔位資訊需要事先了解嗎？",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "建議可提前了解塔位位置、費用、管理方式與家屬需求，避免在治喪期間倉促決定。",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main>
        <div className="pt-24 pb-8 md:pt-36">
          <HeroSection />
        </div>

        <ServicesSection />

        <LatestPostsSection />

        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            TAIWAN LIFE INFORMATION
          </p>

          <h2 className="mt-3 text-2xl font-black text-foreground md:text-4xl">
            台灣生命資訊網
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            本站整理後事流程、生命禮儀、殯葬服務、
            塔位資訊、喪禮費用與家屬常見問題。
            若你正在面對臨終、往生或治喪安排，
            可以先透過 LINE 詢問流程，了解下一步方向。
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              後事流程整理
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              生命禮儀資訊
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              塔位與費用觀念
            </div>
          </div>

          <LineConsultButton className="mt-8 inline-flex rounded-full bg-[#06C755] px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
            LINE 詢問後事流程
          </LineConsultButton>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}