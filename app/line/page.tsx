"use client"

import Image from "next/image"
import { useEffect } from "react"
import { LineConsultButton } from "@/components/line-consult-button"

export default function LinePage() {
  useEffect(() => {
    document.body.style.background = "#f8fafc"

    return () => {
      document.body.style.background = ""
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-4">
      <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-border/70 bg-white/90 text-center shadow-[0_20px_80px_rgba(31,78,121,0.12)] backdrop-blur">

        {/* 專員照片 */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/line-consultant.png"
            alt="台灣生命資訊網禮儀諮詢專員"
            width={800}
            height={1000}
            priority
            className="
              h-[300px]
              md:h-[360px]
              w-full
              object-cover
              object-top
            "
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        {/* 內容 */}
        <div className="px-6 pb-7 pt-1">

          <p className="text-xs font-semibold tracking-[0.25em] text-primary">
            TAIWAN FUNERAL CONSULTATION
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
            後事流程免費諮詢
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            家人剛往生不知道該怎麼辦？
            <br />
            加入 LINE，由專人協助您了解後事流程、
            治喪安排、殯葬服務與相關費用。
          </p>

          {/* 真人感提示 */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm text-primary">
            🙏 專人即時回覆・可先免費諮詢
          </div>

          {/* LINE 按鈕 */}
          <div className="mt-8">
            <LineConsultButton
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-primary
                px-10
                py-5
                text-base
                font-black
                text-primary-foreground
                shadow-[0_18px_44px_rgba(31,78,121,0.28)]
                transition-all
                hover:-translate-y-1
                hover:shadow-[0_22px_54px_rgba(31,78,121,0.36)]
              "
            >
              立即加入 LINE 諮詢
            </LineConsultButton>
          </div>

          {/* 賣點 */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
              後事流程
            </div>

            <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
              禮儀服務
            </div>

            <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
              塔位資訊
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            提供往生後第一步、治喪流程、告別式安排、
            火化流程、靈骨塔與塔位資訊、生前契約及相關費用諮詢。
          </p>
        </div>
      </div>
    </main>
  )
}