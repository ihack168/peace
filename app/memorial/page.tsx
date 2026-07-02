import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "塔位與納骨塔資訊｜公立私立納骨塔、塔位價格、買賣轉讓與晉塔指南",
  description:
    "整理塔位與納骨塔常見問題，包含公立納骨塔、私立納骨塔、塔位價格、塔位買賣、塔位轉讓、選位與晉塔流程，協助家屬快速了解下一步。",
  alternates: {
    canonical: "/memorial",
  },
  openGraph: {
    title: "塔位與納骨塔資訊｜價格、選位、買賣轉讓與晉塔指南",
    description:
      "了解納骨塔、公立私立塔位、塔位價格、買賣轉讓與晉塔安排，協助家屬快速釐清安奉選擇。",
    url: "/memorial",
    type: "website",
  },
}

const factors = [
  {
    title: "公立或私立",
    text: "公立納骨塔與私立納骨塔在申請資格、價格、管理方式與位置選擇上可能不同。",
  },
  {
    title: "地區與位置",
    text: "不同縣市、交通距離、樓層、座向與位置，都可能影響塔位選擇。",
  },
  {
    title: "使用需求",
    text: "需先確認是個人塔位、夫妻塔位、家族塔位，或是短期暫厝安排。",
  },
  {
    title: "後續管理",
    text: "管理費、祭拜便利性、環境維護與家屬探視方便性都應一起考量。",
  },
]

const topics = [
  ["納骨塔介紹", "/blog/columbarium"],
  ["公立納骨塔", "/blog/public-columbarium"],
  ["私立納骨塔", "/blog/private-columbarium"],
  ["塔位買賣", "/blog/columbarium-trading"],
  ["塔位轉讓", "/blog/columbarium-transfer"],
  ["塔位選位指南", "/blog/columbarium-selection"],
  ["晉塔指南", "/blog/urn-placement-guide"],
]

const faqs = [
  {
    q: "納骨塔和塔位是什麼？",
    a: "納骨塔是安奉骨灰罐的場所，塔位則是骨灰罐安放的位置。家屬通常會依照地區、價格、交通、管理與祭拜便利性來選擇。",
  },
  {
    q: "公立納骨塔和私立納骨塔差在哪？",
    a: "公立納骨塔通常會有申請資格與地區限制，私立納骨塔則選擇較多，但價格、管理方式與服務內容會因業者而不同。",
  },
  {
    q: "塔位價格為什麼差很多？",
    a: "塔位價格會受到地區、公立或私立、樓層、座向、位置、型式、管理方式與市場供需影響。",
  },
  {
    q: "塔位可以買賣或轉讓嗎？",
    a: "部分塔位可能涉及買賣或轉讓，但需確認原契約、管理單位規定、權利文件與過戶流程，建議先查清楚再決定。",
  },
  {
    q: "不知道該選哪種塔位怎麼辦？",
    a: "可以先確認預算、地區、祭拜便利性、是否已有骨灰罐、是否急需晉塔，再請專人協助釐清適合的方向。",
  },
]

export default function MemorialPage() {
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
          <span className="text-primary">塔位納骨塔</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              MEMORIAL & COLUMBARIUM
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              塔位與納骨塔怎麼選？
              <span className="block text-primary">
                公立私立、價格、買賣轉讓一次看
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              選塔位時，家屬最常遇到的問題是：公立還是私立、價格差在哪、能不能買賣轉讓、晉塔流程怎麼安排。這一頁幫你先釐清重點，避免臨時決定。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LineConsultButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
                LINE 詢問塔位問題
              </LineConsultButton>

              <Link
                href="/blog/columbarium-selection"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                看塔位選位指南
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/memorial-hero.webp"
              alt="塔位與納骨塔諮詢服務"
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
            <p className="text-3xl font-black text-primary">先確認</p>
            <p className="mt-2 font-bold text-foreground">公立、私立或暫厝需求</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">再比較</p>
            <p className="mt-2 font-bold text-foreground">地區、價格與管理方式</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">可先問</p>
            <p className="mt-2 font-bold text-foreground">避免買錯或流程卡住</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            HOW TO CHOOSE
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            選塔位前，先看這 4 個重點
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            塔位不是只看價格，還要考慮家屬祭拜方便、地點、管理與後續使用需求。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {factors.map((item, index) => (
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
                COMMON QUESTIONS
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                常見塔位與納骨塔問題
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                如果你正在比較塔位，建議先確認公立私立、價格、轉讓規定與晉塔流程，再決定下一步。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                幫我確認塔位方向
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
              src="/images/memorial-hero.webp"
              alt="納骨塔與塔位選擇諮詢"
              width={1600}
              height={900}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
              BUY OR TRANSFER
            </p>
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              塔位買賣或轉讓要注意什麼？
            </h2>
            <p className="mt-5 text-lg leading-9 text-muted-foreground">
              塔位若涉及買賣或轉讓，建議先確認權利文件、管理單位規定、是否可過戶、費用項目與後續管理責任，避免日後產生爭議。
            </p>

            <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground">
              LINE 詢問塔位轉讓
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
            塔位納骨塔常見問題
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
                不知道該選哪種塔位？
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-primary-foreground/85">
                你可以先告訴我們：想找哪個地區、預算大約多少、是否已有骨灰罐、是否急需晉塔。我們協助你先釐清方向。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-primary shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                LINE 立即詢問
              </LineConsultButton>
            </div>

            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src="/images/memorial-hero.webp"
                alt="塔位納骨塔專人諮詢"
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