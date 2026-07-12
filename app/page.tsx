import type { Metadata } from "next";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { LineConsultButton } from "@/components/line-consult-button";
import { LatestPostsSection } from "@/components/latest-posts-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";

const SITE_URL = "https://peace.line88.tw";

const SITE_NAME = "台灣生命資訊網";

const PAGE_TITLE =
  "台灣生命資訊網｜後事流程、生命禮儀、塔位與喪禮費用資訊";

const PAGE_DESCRIPTION =
  "台灣生命資訊網提供後事流程、生命禮儀、殯葬服務、塔位資訊、喪禮費用與家屬諮詢相關資訊，協助家屬了解治喪安排方向。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_TW",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: PAGE_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    knowsAbout: [
      "後事流程",
      "生命禮儀",
      "殯葬服務",
      "治喪安排",
      "塔位資訊",
      "喪禮費用",
      "火化流程",
      "骨灰罈",
      "家屬諮詢",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "zh-Hant",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "後事流程與生命禮儀資訊諮詢",
    serviceType: "後事流程與生命禮儀資訊",
    description:
      "提供後事流程、生命禮儀、殯葬服務、塔位資訊、喪禮費用與治喪安排相關資訊及諮詢。",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Taiwan",
    },
    audience: {
      "@type": "Audience",
      audienceType: "需要了解後事流程與治喪安排的家屬",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "往生後第一步要做什麼？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "往生後通常需要先依往生地點確認死亡證明、遺體接運、冰存與後續治喪安排。實際流程會依醫院、住家或其他地點，以及家屬需求而有所不同。",
        },
      },
      {
        "@type": "Question",
        name: "喪禮費用通常包含哪些項目？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "喪禮費用常見包含遺體接運、冰存、禮儀服務、告別式場地、花藝布置、宗教儀式、火化、骨灰罈與塔位等項目，實際費用會依規模與需求不同。",
        },
      },
      {
        "@type": "Question",
        name: "殯葬服務可以先詢問流程嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以。家屬可先說明目前狀況、往生地點、宗教需求與預算方向，再由相關人員協助說明可能的後續流程與注意事項。",
        },
      },
      {
        "@type": "Question",
        name: "塔位資訊需要事先了解嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "建議可提前了解塔位位置、費用、管理方式、交通便利性與家屬祭拜需求，避免在治喪期間倉促決定。",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main>
        <section className="pb-8 pt-24 md:pt-36">
          <HeroSection />
        </section>

        <ServicesSection />

        <LatestPostsSection />

        <section
          aria-labelledby="life-information-introduction"
          className="mx-auto max-w-5xl px-6 py-16 text-center"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            TAIWAN LIFE INFORMATION
          </p>

          <h2
            id="life-information-introduction"
            className="mt-3 text-2xl font-black text-foreground md:text-4xl"
          >
            台灣生命資訊網
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            本站整理後事流程、生命禮儀、殯葬服務、塔位資訊、
            喪禮費用與家屬常見問題。若你正在面對臨終、往生或治喪安排，
            可先透過 LINE 詢問流程，了解接下來可能需要處理的事項。
          </p>

          <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
            <article className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              <h3 className="text-lg font-black text-foreground">
                後事流程整理
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                整理死亡證明、遺體接運、冰存、治喪與火化等常見流程。
              </p>
            </article>

            <article className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              <h3 className="text-lg font-black text-foreground">
                生命禮儀資訊
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                說明告別式、宗教儀式、會場安排與家屬常見注意事項。
              </p>
            </article>

            <article className="rounded-2xl border border-border/70 bg-white/80 p-5 shadow-sm">
              <h3 className="text-lg font-black text-foreground">
                塔位與費用觀念
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                整理骨灰罈、塔位選擇、管理方式與喪禮費用常見項目。
              </p>
            </article>
          </div>

          <LineConsultButton className="mt-8 inline-flex rounded-full bg-[#06C755] px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
            LINE 詢問後事流程
          </LineConsultButton>
        </section>

        <section
          aria-labelledby="life-information-faq"
          className="mx-auto max-w-5xl px-6 pb-16"
        >
          <div className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm md:p-10">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">
                FREQUENTLY ASKED QUESTIONS
              </p>

              <h2
                id="life-information-faq"
                className="mt-3 text-2xl font-black text-foreground md:text-4xl"
              >
                後事流程常見問題
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              <article>
                <h3 className="text-lg font-black text-foreground">
                  往生後第一步要做什麼？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  往生後通常需要先依往生地點確認死亡證明、
                  遺體接運、冰存與後續治喪安排。
                  實際流程會依醫院、住家或其他地點而有所不同。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  喪禮費用通常包含哪些項目？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  常見項目包括遺體接運、冰存、禮儀服務、告別式場地、
                  花藝布置、宗教儀式、火化、骨灰罈與塔位等。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  殯葬服務可以先詢問流程嗎？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  可以。家屬可先說明目前狀況、往生地點、宗教需求與預算方向，
                  再了解可能的處理流程與注意事項。
                </p>
              </article>

              <article>
                <h3 className="text-lg font-black text-foreground">
                  塔位資訊需要事先了解嗎？
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  建議提前了解塔位位置、價格、管理方式、交通便利性與祭拜需求，
                  避免在治喪期間因時間壓力而倉促決定。
                </p>
              </article>
            </div>

            <p className="mt-8 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-7 text-muted-foreground">
              本站內容主要提供一般資訊整理。各地殯葬流程、場館規定、
              收費方式與行政程序可能不同，實際安排仍應向所在地主管機關、
              醫療院所、殯葬設施或合格服務單位確認。
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
