import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { LineConsultButton } from "@/components/line-consult-button"

export const metadata: Metadata = {
  title: "後事流程完整指南｜親人過世怎麼辦、24小時處理流程、告別式與火化安排",
  description:
    "親人剛過世不知道怎麼辦？整理往生後24小時處理流程、死亡證明、遺體接運、告別式、火化與晉塔安排，協助家屬快速釐清下一步。",
  alternates: {
    canonical: "/funeral-process",
  },
  openGraph: {
    title: "後事流程完整指南｜親人過世後下一步怎麼做",
    description:
      "從親人過世當下、死亡證明、遺體接運、告別式、火化到晉塔，提供家屬清楚、低壓力的後事流程整理。",
    url: "/funeral-process",
    type: "website",
  },
}

const steps = [
  {
    title: "確認狀況並取得死亡證明",
    text: "若在醫院過世，通常由院方協助開立相關文件；若在家中或機構過世，家屬應先確認是否需要報請相關單位處理，再進行後續安排。",
    href: "/blog/death-certificate",
  },
  {
    title: "安排遺體接運",
    text: "確認死亡證明與家屬意願後，可安排遺體接運至殯儀館、會館或指定安置地點。",
    href: "/blog/body-transportation",
  },
  {
    title: "討論告別式形式",
    text: "依照宗教、預算、親友人數與家屬需求，規劃簡約、傳統、佛道教、基督教或客製化告別式。",
    href: "/blog/funeral-ceremony-process",
  },
  {
    title: "確認火化與晉塔安排",
    text: "告別式後通常會接續火化、撿骨、安奉骨灰罐與晉塔流程，建議提前確認日期、地點與所需文件。",
    href: "/blog/cremation-process",
  },
]

const articles = [
  ["親人過世怎麼辦", "/blog/what-to-do-when-family-passes-away"],
  ["往生後24小時流程", "/blog/first-24-hours-after-death"],
  ["死亡證明申請", "/blog/death-certificate"],
  ["遺體接運流程", "/blog/body-transportation"],
  ["告別式流程", "/blog/funeral-ceremony-process"],
  ["火化流程", "/blog/cremation-process"],
  ["晉塔流程", "/blog/urn-placement-process"],
]

const faqs = [
  {
    q: "親人剛過世第一步要做什麼？",
    a: "第一步是確認過世地點與狀況。如果是在醫院，通常先由院方協助處理死亡證明；如果是在家中、安養機構或其他地點，建議先確認是否需要報請相關單位，再安排遺體接運與後續後事流程。",
  },
  {
    q: "後事流程一定要馬上決定告別式嗎？",
    a: "不一定。家屬可以先處理死亡證明、遺體安置與接運，再逐步討論告別式日期、宗教儀式、預算與親友通知方式。",
  },
  {
    q: "如果家屬不知道流程，可以先諮詢嗎？",
    a: "可以。多數家屬在剛面對親人離世時都不熟悉流程，建議先把過世地點、是否已取得死亡證明、預計安置地點與家屬需求整理好，再請專人協助確認下一步。",
  },
]

export default function FuneralProcessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.22em] text-primary">
              FUNERAL PROCESS
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              後事流程完整指南：
              <span className="block text-primary">
                親人過世後，下一步該怎麼做？
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
              面對親人突然離世，家屬最常遇到的問題是：死亡證明怎麼申請、遺體怎麼接運、告別式要怎麼安排、火化與晉塔何時處理。這一頁幫你用最清楚的方式整理後事流程，讓你先知道現在該做什麼，再決定是否需要專人協助。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LineConsultButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#06C755] px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)] transition-all hover:-translate-y-0.5">
                LINE 詢問後事流程
              </LineConsultButton>

              <Link
                href="/blog/what-to-do-when-family-passes-away"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white px-8 text-base font-bold text-foreground transition-colors hover:bg-secondary"
              >
                先看親人過世怎麼辦
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_22px_70px_rgba(23,75,115,0.10)]">
            <Image
              src="/images/funeral-process-hero.webp"
              alt="後事流程諮詢服務"
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
            <p className="text-3xl font-black text-primary">24 小時內</p>
            <p className="mt-2 font-bold text-foreground">先處理證明與安置</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">流程透明</p>
            <p className="mt-2 font-bold text-foreground">避免家屬慌亂決定</p>
          </div>
          <div>
            <p className="text-3xl font-black text-primary">可先諮詢</p>
            <p className="mt-2 font-bold text-foreground">不確定也能先問清楚</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            STEP BY STEP
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            後事流程怎麼走？
          </h2>
          <p className="mt-5 text-lg leading-9 text-muted-foreground">
            不同家庭的宗教、預算、地區與親友安排不同，但大多數後事流程都會經過以下階段。
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
          <Image
            src="/images/funeral-process-flow.webp"
            alt="親人過世後事流程步驟圖：死亡證明、遺體接運、告別式、火化、晉塔"
            width={1600}
            height={900}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <Link
              key={step.title}
              href={step.href}
              className="group rounded-[2rem] border border-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(23,75,115,0.12)]"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-black text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="text-xl font-black text-foreground">
                  {step.title}
                </h3>
              </div>

              <p className="text-base leading-8 text-muted-foreground">
                {step.text}
              </p>

              <p className="mt-5 text-sm font-bold text-primary group-hover:underline">
                查看詳細說明 →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
                LOCAL SUPPORT
              </p>
              <h2 className="text-3xl font-black text-foreground md:text-5xl">
                為什麼建議先問清楚？
              </h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                後事安排牽涉文件、接運、場地、儀式、火化、塔位與親友通知。越早釐清流程，越能避免重複奔波、臨時加價或家屬意見混亂。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                我想先問目前狀況
              </LineConsultButton>
            </div>

            <div className="grid gap-4">
              {[
                "不知道死亡證明要去哪裡申請",
                "不知道遺體現在該送哪裡",
                "不確定告別式要簡單還是完整",
                "擔心費用不透明或臨時增加",
                "家人意見不同，需要有人協助整理流程",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-border bg-white p-5 text-lg font-bold text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            RELATED ARTICLES
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            後事流程相關文章
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

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <p className="mb-3 text-sm font-bold tracking-[0.22em] text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-black text-foreground md:text-5xl">
            後事流程常見問題
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
                不知道現在該做什麼？
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-primary-foreground/85">
                你可以先告訴我們：親人在哪裡過世、是否已有死亡證明、目前是否需要接運、希望簡單處理還是安排告別式。我們會先幫你確認下一步。
              </p>

              <LineConsultButton className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-primary shadow-[0_14px_36px_rgba(0,0,0,0.18)]">
                LINE 立即詢問
              </LineConsultButton>
            </div>

            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src="/images/funeral-consult.webp"
                alt="台灣後事流程專人諮詢"
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