"use client"

import Image from "next/image"
import { LineConsultButton } from "@/components/line-consult-button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute right-0 top-32 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="mb-5 inline-flex rounded-full border border-primary/20 bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            後事流程｜生命禮儀｜費用資訊｜安心諮詢
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
            台灣生命資訊網
            <span className="block text-primary">
              後事與禮儀資訊平台
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground md:mx-0 md:text-lg">
            整理殯葬流程、喪禮費用、塔位資訊、
            生前規劃與治喪注意事項，
            協助家屬在重要時刻快速理解流程，
            做出安心、透明、不慌亂的安排。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <LineConsultButton
              className="
                rounded-full
                bg-primary
                px-7 py-3.5
                text-sm font-semibold
                text-primary-foreground
                shadow-[0_14px_36px_rgba(23,75,115,0.28)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-[0_18px_44px_rgba(23,75,115,0.38)]
              "
            >
              LINE 免費諮詢
            </LineConsultButton>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 rounded-3xl border border-border/70 bg-white/80 p-4 shadow-sm backdrop-blur">
            <div>
              <p className="text-xl font-black text-foreground">
                流程
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                清楚整理
              </p>
            </div>

            <div>
              <p className="text-xl font-black text-foreground">
                費用
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                透明參考
              </p>
            </div>

            <div>
              <p className="text-xl font-black text-foreground">
                安心
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                專人協助
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-white to-accent/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white p-3 shadow-[0_24px_80px_rgba(23,75,115,0.16)]">
            <Image
              src="/images/hero.png"
              alt="台灣生命資訊網後事與生命禮儀資訊平台"
              width={720}
              height={860}
              className="h-[420px] w-full rounded-[2rem] object-cover md:h-[560px]"
              priority
            />

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
              <p className="text-sm font-bold text-foreground">
                後事安排與生命禮儀資訊
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                從臨終準備、治喪流程到費用規劃，
                提供清楚、低壓力、可理解的資訊整理。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}