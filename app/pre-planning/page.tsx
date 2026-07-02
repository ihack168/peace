import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "生前規劃與生前契約｜預立後事、高齡族規劃與契約注意事項",
  description:
    "整理生前規劃、生前契約、預立後事、高齡族後事安排與契約注意事項，協助家屬與本人提前了解流程、費用與安排方向。",
  alternates: {
    canonical: "/pre-planning",
  },
  openGraph: {
    title: "生前規劃與生前契約｜預立後事與高齡族後事安排",
    description:
      "了解生前契約、預立後事規劃、契約比較與注意事項，協助提前安排後事，減少家屬臨時壓力。",
    url: "/pre-planning",
    type: "website",
  },
}

const reasons = [
  {
    title: "減少家屬壓力",
    text: "提前確認後事方向，能降低家屬臨時決定與意見分歧。",
  },
  {
    title: "掌握費用方向",
    text: "先了解儀式、火化、塔位與服務內容，避免臨時倉促選擇。",
  },
  {
    title: "保留個人意願",
    text: "可提前表達想要簡約、傳統、宗教或特定形式的安排。",
  },
  {
    title: "避免資訊落差",
    text: "生前先釐清流程與契約內容，日後家屬較不容易慌亂。",
  },
]

const topics = [
  ["生前契約", "/blog/pre-need-contract"],
  ["生前契約比較", "/blog/pre-need-contract-comparison"],
  ["生前契約注意事項", "/blog/pre-need-contract-notes"],
  ["預立後事規劃", "/blog/funeral-pre-planning"],
  ["高齡族規劃", "/blog/elderly-funeral-planning"],
]

const faqs = [
  {
    q: "什麼是生前規劃？",
    a: "生前規劃是指本人或家屬在事情發生前，先了解後事流程、費用、儀式形式、塔位與相關安排，減少日後臨時決定的壓力。",
  },
  {
    q: "生前契約一定要買嗎？",
    a: "不一定。生前契約只是其中一種方式，是否需要購買，應依照個人需求、預算、契約內容與家屬共識評估。",
  },
  {
    q: "生前契約要注意什麼？",
    a: "建議確認服務內容、費用項目、履約方式、可否變更、退費條件與公司可信度，再決定是否簽約。",
  },
  {
    q: "高齡族適合先做後事規劃嗎？",
    a: "適合先了解方向。提前討論後事安排、文件、費用與塔位，可減少家屬未來面對突發狀況時的壓力。",
  },
  {
    q: "不知道怎麼開始規劃怎麼辦？",
    a: "可以先確認是否已有塔位、是否有宗教需求、希望簡約或完整儀式、預算大約多少，再請專人協助整理方向。",
  },
]

export default function PrePlanningPage() {
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
          <span className="text-primary">生前規劃</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              PRE PLANNING
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              生前規劃怎麼做？
              <span className="block text-primary">
                生前契約、預立後事與高齡族安排
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              生前規劃不是忌諱，而是提前把後事方向、費用、儀式與家屬共識整理清楚。越早釐清，未來家屬越不需要在慌亂中做決定。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LineConsultButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
                LINE 詢問生前規劃
              </LineConsultButton>

              <Link
                href="/blog/pre-need-contract"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                看生前契約說明
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/pre-planning-hero.webp"
              alt="生前規劃與生前契約諮詢"
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
            <p className="text-3xl font-black text-primary">先整理</p>
            <p className="mt-2 font-bold text-foreground">個人意願與家屬共識</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">再確認</p>
            <p className="mt-2 font-bold text-foreground">費用、契約與塔位</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">可先問</p>
            <p className="mt-2 font-bold text-foreground">避免未來臨時慌亂</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            WHY PLAN
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            為什麼要先做生前規劃？
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            生前規劃的重點不是一次決定所有細節，而是先讓本人與家屬知道未來大方向。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
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
                TOPICS
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                生前規劃常見主題
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                如果你正在考慮生前契約或預立後事，建議先看清楚內容、費用、變更與退費條件，再決定是否簽約。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                幫我確認規劃方向
              </LineConsultButton>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {topics.map(([title, href]) => (
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
              src="/images/pre-planning-hero.webp"
              alt="高齡族後事規劃與生前契約諮詢"
              width={1600}
              height={900}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
              CONTRACT NOTES
            </p>
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              生前契約簽約前要注意什麼？
            </h2>
            <p className="mt-5 text-lg leading-9 text-muted-foreground">
              簽約前建議確認服務項目、費用是否透明、可否變更、是否能退費、履約方式與公司信譽。不要只看價格，也要看未來是否真的用得到。
            </p>

            <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground">
              LINE 詢問契約注意事項
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
            生前規劃常見問題
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
        <div className="overflow-hidden rounded-[2.5rem] bg-primary">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 text-primary-foreground md:p-12">
              <h2 className="text-3xl font-black md:text-5xl">
                想先規劃，但不知道從哪開始？
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-primary-foreground/85">
                你可以先告訴我們：是否已有塔位、是否有宗教需求、希望簡約或完整儀式、是否考慮生前契約。我們協助你整理方向。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-primary shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                LINE 立即詢問
              </LineConsultButton>
            </div>

            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src="/images/pre-planning-hero.webp"
                alt="生前規劃專人諮詢"
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