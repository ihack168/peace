import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "喪葬補助怎麼申請？勞保、國保、農保與各縣市補助整理",
  description:
    "親人過世後可申請哪些喪葬補助？整理勞保死亡給付、國保死亡給付、農保喪葬補助、軍公教補助與各縣市補助申請方向。",
  alternates: {
    canonical: "/subsidy",
  },
  openGraph: {
    title: "喪葬補助怎麼申請？死亡給付與各類補助整理",
    description:
      "快速了解喪葬補助、死亡給付、申請資格、文件與流程，協助家屬釐清下一步。",
    url: "/subsidy",
    type: "website",
  },
}

const subsidies = [
  ["勞保死亡給付", "/blog/labor-insurance-death-benefit"],
  ["國保死亡給付", "/blog/national-pension-death-benefit"],
  ["農保喪葬補助", "/blog/farmer-insurance-funeral-subsidy"],
  ["軍公教補助", "/blog/public-sector-funeral-subsidy"],
  ["各縣市喪葬補助", "/blog/city-funeral-subsidy"],
  ["補助申請流程", "/blog/funeral-subsidy-application"],
]

const checks = [
  {
    title: "確認身分與保險別",
    text: "先確認亡者是否有勞保、國保、農保、軍公教身分或地方補助資格。",
  },
  {
    title: "確認需要哪些文件",
    text: "常見會需要死亡證明、身分資料、戶籍資料與申請相關文件。",
  },
  {
    title: "確認申請期限",
    text: "不同補助可能有不同期限，建議盡早確認，避免錯過申請時間。",
  },
]

const faqs = [
  {
    q: "親人過世可以申請哪些補助？",
    a: "依照身分、保險別與所在地不同，可能有勞保死亡給付、國保死亡給付、農保喪葬補助、軍公教補助或地方政府補助。",
  },
  {
    q: "喪葬補助申請前要先確認什麼？",
    a: "建議先確認亡者身分、保險別、戶籍地、是否備齊文件，以及是否仍在申請期限內。",
  },
  {
    q: "勞保死亡給付和喪葬補助一樣嗎？",
    a: "不一定相同。不同制度的名稱、資格、申請方式與給付內容可能不同，需依實際身分確認。",
  },
  {
    q: "補助有申請期限嗎？",
    a: "多數補助或給付都有申請期限，且規定可能不同，建議親人過世後盡快確認。",
  },
  {
    q: "不知道自己能申請哪一種怎麼辦？",
    a: "可以先整理亡者身分、保險別、戶籍地與目前文件，再協助判斷可能的補助方向。",
  },
]

export default function SubsidyPage() {
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
          <span className="text-primary">喪葬補助</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              FUNERAL SUBSIDY
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              喪葬補助怎麼申請？
              <span className="block text-primary">
                勞保、國保、農保與各縣市補助整理
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              親人過世後，家屬可能符合喪葬補助或死亡給付。先確認身分、保險別、戶籍地與文件，通常能更快知道下一步。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LineConsultButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
                LINE 詢問補助資格
              </LineConsultButton>

              <Link
                href="/blog/funeral-subsidy-application"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                看補助申請流程
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/subsidy-hero.webp"
              alt="喪葬補助與死亡給付申請諮詢"
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
            <p className="mt-2 font-bold text-foreground">身分與保險別</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">再準備</p>
            <p className="mt-2 font-bold text-foreground">死亡證明與申請文件</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">可先問</p>
            <p className="mt-2 font-bold text-foreground">避免錯過補助期限</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            COMMON SUBSIDIES
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            常見喪葬補助有哪些？
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            不同身分可能適用不同補助。家屬可先從保險別與戶籍地開始確認。
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subsidies.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-3xl border border-border bg-white p-6 font-bold text-foreground shadow-sm transition-all hover:-translate-y-1 hover:text-primary hover:shadow-[0_18px_50px_rgba(23,75,115,0.10)]"
            >
              {title}
              <span className="mt-4 block text-sm text-primary">查看說明 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
                APPLICATION PROCESS
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                喪葬補助申請流程
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                申請前先確認資格、準備文件，再依對應單位提出申請。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                LINE 詢問補助方向
              </LineConsultButton>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
              <Image
                src="/images/subsidy-process.webp"
                alt="喪葬補助申請流程圖"
                width={1600}
                height={900}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            BEFORE APPLYING
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            申請前先確認這 3 件事
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {checks.map((item, index) => (
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

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            喪葬補助常見問題
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
                不知道能申請哪些補助？
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-primary-foreground/85">
                你可以先告訴我們：亡者身分、保險別、戶籍地、是否已有死亡證明。我們協助你確認可能的補助方向。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-primary shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                LINE 立即詢問
              </LineConsultButton>
            </div>

            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src="/images/subsidy-support.webp"
                alt="喪葬補助專人協助諮詢"
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