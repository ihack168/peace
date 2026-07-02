import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "殯葬費用怎麼算？告別式、火化、塔位與後事費用整理",
  description:
    "殯葬費用包含哪些項目？整理喪葬費用、告別式費用、火化費用、禮車、靈堂與塔位價格影響因素，協助家屬快速了解後事預算。",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "殯葬費用怎麼算？後事費用項目整理",
    description:
      "快速了解殯葬費用包含哪些項目、哪些因素會影響價格，以及家屬規劃後事預算時應先確認的重點。",
    url: "/pricing",
    type: "website",
  },
}

const priceFactors = [
  {
    title: "儀式規模",
    text: "簡約處理、家祭、公祭或完整告別式，費用組成會不同。",
  },
  {
    title: "場地安排",
    text: "殯儀館、會館、禮廳或自宅靈堂，會影響整體規劃。",
  },
  {
    title: "火化與安置",
    text: "火化日期、骨灰罈、晉塔與後續安奉方式都需確認。",
  },
  {
    title: "塔位選擇",
    text: "公立、私立、地區、樓層與位置都可能影響塔位價格。",
  },
]

const costItems = [
  ["遺體接運", "/blog/body-transportation"],
  ["靈堂費用", "/blog/memorial-hall-cost"],
  ["告別式費用", "/blog/farewell-ceremony-cost"],
  ["火化費用", "/blog/cremation-cost"],
  ["禮車費用", "/blog/funeral-car-cost"],
  ["塔位價格", "/blog/columbarium-price"],
]

const articles = [
  ["喪葬費用怎麼算", "/blog/funeral-cost"],
  ["告別式費用", "/blog/farewell-ceremony-cost"],
  ["火化費用", "/blog/cremation-cost"],
  ["靈堂費用", "/blog/memorial-hall-cost"],
  ["禮車費用", "/blog/funeral-car-cost"],
  ["塔位價格", "/blog/columbarium-price"],
  ["生前契約價格", "/blog/pre-need-contract-price"],
]

const faqs = [
  {
    q: "殯葬費用通常包含哪些項目？",
    a: "常見項目包含遺體接運、冰存或安置、靈堂布置、告別式、火化、禮車、骨灰罈、塔位與相關服務安排。",
  },
  {
    q: "告別式費用怎麼算？",
    a: "告別式費用會受到場地、儀式規模、宗教形式、花藝布置、親友人數與服務內容影響。",
  },
  {
    q: "火化費用會不會每個地方不同？",
    a: "會。火化費用可能會因地區、公立或私立設施、日期與實際安排而不同，建議依所在地與需求確認。",
  },
  {
    q: "塔位價格為什麼差很多？",
    a: "塔位價格通常與地區、公立或私立、樓層、位置、型式與管理方式有關，因此差異可能很大。",
  },
  {
    q: "不知道目前需要準備多少預算怎麼辦？",
    a: "可以先確認是否需要接運、是否要辦告別式、是否已有塔位，再依照實際狀況評估可能的費用項目。",
  },
]

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }

  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            首頁
          </Link>
          <span>/</span>
          <span className="text-primary">殯葬費用</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              FUNERAL PRICING
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              殯葬費用怎麼算？
              <span className="block text-primary">
                告別式、火化、塔位與後事費用整理
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              每個家庭需求不同，後事費用沒有單一固定價格。實際費用通常會受到儀式規模、場地、火化安排、禮車、塔位與家屬需求影響。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LineConsultButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
                LINE 詢問目前費用
              </LineConsultButton>

              <Link
                href="/blog/funeral-cost"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                看喪葬費用說明
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/pricing-hero.webp"
              alt="殯葬費用與後事預算諮詢"
              width={1600}
              height={900}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3 md:px-10">
          <div>
            <p className="text-3xl font-black text-primary">先釐清</p>
            <p className="mt-2 font-bold text-foreground">需要哪些服務項目</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">再估算</p>
            <p className="mt-2 font-bold text-foreground">告別式與火化安排</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">可先問</p>
            <p className="mt-2 font-bold text-foreground">避免家屬臨時決定</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            PRICE FACTORS
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            哪些因素會影響後事費用？
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            不是每個家庭都需要完整儀式。先確認需求，再評估費用項目，通常比較不容易被不必要的內容影響判斷。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {priceFactors.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-border bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-black text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-black text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
                COST ITEMS
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                常見後事費用項目
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                後事費用通常不是單一價格，而是由多個服務項目組成。家屬可以先確認哪些是必要項目，哪些是可選安排。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                幫我確認需要哪些項目
              </LineConsultButton>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {costItems.map(([title, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-3xl border border-border bg-white p-6 font-bold text-foreground shadow-sm transition-all hover:-translate-y-1 hover:text-primary hover:shadow-[0_18px_50px_rgba(23,75,115,0.10)]"
                >
                  {title}
                  <span className="mt-4 block text-sm text-primary">
                    查看說明 →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
            <Image
              src="/images/pricing-hero.webp"
              alt="喪葬費用透明諮詢"
              width={1600}
              height={900}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
              TRANSPARENT PRICING
            </p>
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              費用透明為什麼重要？
            </h2>
            <p className="mt-5 text-lg leading-9 text-muted-foreground">
              多數家屬第一次接觸後事安排，容易不知道哪些費用必要、哪些內容可以調整。提早了解流程與費用組成，能減少溝通成本，也能避免臨時決定造成壓力。
            </p>

            <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground">
              LINE 詢問費用組成
            </LineConsultButton>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            殯葬費用常見問題
          </h2>

          <div className="mt-10 grid gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[2rem] border border-border bg-background p-7"
              >
                <h3 className="text-xl font-black text-foreground">{faq.q}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            RELATED ARTICLES
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            殯葬費用相關文章
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-3xl border border-border bg-white p-6 font-bold text-foreground shadow-sm transition-all hover:-translate-y-1 hover:text-primary hover:shadow-[0_18px_50px_rgba(23,75,115,0.10)]"
            >
              {title}
              <span className="mt-4 block text-sm text-primary">閱讀文章 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-primary">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 text-primary-foreground md:p-12">
              <h2 className="text-3xl font-black md:text-5xl">
                不知道目前需要準備哪些費用？
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-primary-foreground/85">
                你可以先告訴我們：是否需要接運、是否規劃告別式、是否已有塔位。我們協助你確認下一步與可能需要的費用項目。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-primary shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                LINE 立即詢問
              </LineConsultButton>
            </div>

            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src="/images/pricing-hero.webp"
                alt="殯葬費用專人諮詢"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}