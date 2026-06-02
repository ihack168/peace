import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "遺產繼承怎麼辦？拋棄繼承、限定繼承、遺產稅與不動產繼承整理",
  description:
    "親人過世後，家屬可能需要面對遺產繼承、拋棄繼承、限定繼承、遺產稅與不動產繼承。本頁整理常見流程與注意事項，協助快速了解方向。",
  alternates: {
    canonical: "/inheritance",
  },
  openGraph: {
    title: "遺產繼承怎麼辦？繼承流程與常見問題整理",
    description:
      "整理遺產繼承、拋棄繼承、限定繼承、遺產稅與不動產繼承常見問題。",
    url: "/inheritance",
    type: "website",
  },
}

const checks = [
  {
    title: "確認繼承人",
    text: "先確認依法可能涉及的繼承人與親屬關係。",
  },
  {
    title: "確認財產",
    text: "整理存款、不動產、保險、車輛與其他可能財產。",
  },
  {
    title: "確認負債",
    text: "除了財產，也應確認是否有貸款、債務或保證責任。",
  },
  {
    title: "確認期限",
    text: "拋棄繼承、限定繼承與稅務申報通常都有期限。",
  },
]

const topics = [
  ["遺產繼承", "/blog/inheritance"],
  ["拋棄繼承", "/blog/renunciation-of-inheritance"],
  ["限定繼承", "/blog/limited-inheritance"],
  ["遺囑撰寫", "/blog/will-writing"],
  ["遺產稅", "/blog/estate-tax"],
  ["不動產繼承", "/blog/real-estate-inheritance"],
]

const related = [
  ["後事流程", "/funeral-process"],
  ["殯葬費用", "/pricing"],
  ["喪葬補助", "/subsidy"],
  ["塔位納骨塔", "/memorial"],
]

const faqs = [
  {
    q: "遺產繼承第一步要做什麼？",
    a: "通常可先整理繼承人、財產、負債與相關文件，再確認是否需要辦理繼承、拋棄繼承或限定繼承。",
  },
  {
    q: "拋棄繼承有期限嗎？",
    a: "拋棄繼承通常有法定期限，實際期限與辦理方式建議向法院、律師或專業人員確認。",
  },
  {
    q: "限定繼承是什麼？",
    a: "限定繼承通常是指繼承人以繼承所得遺產為限負清償責任，實際適用與程序應依法律規定確認。",
  },
  {
    q: "不動產繼承要注意什麼？",
    a: "不動產繼承可能涉及繼承人確認、稅務、登記與過戶文件，建議向地政、稅務或專業人員確認。",
  },
  {
    q: "遺產稅什麼時候申報？",
    a: "遺產稅申報有一定期限與文件要求，實際申報規定建議向國稅局或專業人員確認。",
  },
]

export default function InheritancePage() {
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
          <span className="text-primary">法律繼承</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              INHERITANCE
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              遺產繼承怎麼辦？
              <span className="block text-primary">
                拋棄繼承、限定繼承與不動產繼承整理
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              親人過世後，家屬除了處理後事，也可能需要面對遺產繼承、拋棄繼承、限定繼承、遺產稅與不動產繼承等問題。本頁整理常見方向，協助快速了解重點。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/funeral-process"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5"
              >
                查看後事流程
              </Link>

              <Link
                href="/subsidy"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                查看喪葬補助
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/inheritance-hero.webp"
              alt="遺產繼承與不動產繼承文件整理"
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
            <p className="mt-2 font-bold text-foreground">繼承人與親屬關係</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">再確認</p>
            <p className="mt-2 font-bold text-foreground">財產、負債與文件</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">注意期限</p>
            <p className="mt-2 font-bold text-foreground">避免錯過重要程序</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            BEFORE INHERITANCE
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            繼承前先確認哪些事情？
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            繼承問題通常不是只看財產，也要同時確認負債、文件與期限。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
                PROCESS
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                常見繼承流程
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                實際流程會依個案不同而變化，若涉及法律、稅務或不動產登記，建議洽詢相關主管機關或專業人員。
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
              <Image
                src="/images/inheritance-timeline.webp"
                alt="台灣遺產繼承流程圖"
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
            <Image
              src="/images//images/inheritance-property.webp"
              alt="不動產繼承與房屋繼承文件"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
              PROPERTY INHERITANCE
            </p>
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              不動產繼承要特別注意
            </h2>
            <p className="mt-5 text-lg leading-9 text-muted-foreground">
              房屋、土地等不動產繼承，可能涉及繼承人確認、稅務申報、文件準備與登記過戶。若情況複雜，建議向地政、稅務或法律專業人員確認。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
              TOPICS
            </p>
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              常見繼承主題
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(([title, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-3xl border border-border bg-background p-6 font-bold text-foreground shadow-sm transition-all hover:-translate-y-1 hover:text-primary hover:shadow-[0_18px_50px_rgba(23,75,115,0.10)]"
              >
                {title}
                <span className="mt-4 block text-sm text-primary">
                  閱讀說明 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            遺產繼承常見問題
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
        <div className="rounded-[2.5rem] border border-border bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] bg-secondary">
              <Image
                src="/images/inheritance-documents.webp"
                alt="遺產繼承文件整理"
                width={1200}
                height={900}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
                RELATED INFORMATION
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                正在處理親人後事？
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                如果您目前正在處理親人後事，可先閱讀本站整理的後事流程、殯葬費用、喪葬補助與塔位納骨塔資訊。
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {related.map(([title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-3xl border border-border bg-background p-5 font-bold text-foreground transition-all hover:-translate-y-1 hover:text-primary"
                  >
                    {title}
                    <span className="mt-3 block text-sm text-primary">
                      查看資訊 →
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-8 text-sm leading-7 text-muted-foreground">
                本頁僅整理一般資訊方向，不提供法律、稅務或登記代辦服務；如涉及實際個案，建議洽詢相關主管機關或專業人員。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}