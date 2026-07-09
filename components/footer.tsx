"use client"

import { LineConsultButton } from "@/components/line-consult-button"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-white/80 px-6 py-12 backdrop-blur">
      {/* 背景光暈 */}
      <div className="absolute left-1/2 top-0 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* 左側品牌 */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-black tracking-tight text-foreground">
            台灣生命資訊網
          </h3>

          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            提供後事流程、生命禮儀、塔位資訊、
            殯葬服務、法律權益、保險理賠、
            政府補助與稅務相關資訊整理，
            協助家屬在需要時更快速了解方向。
          </p>
        </div>

        {/* 中間導覽 */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="/" className="transition-colors hover:text-primary">
            首頁
          </a>

          <a href="/blog" className="transition-colors hover:text-primary">
            最新文章
          </a>

          <a href="/#services" className="transition-colors hover:text-primary">
            服務資訊
          </a>

          <a href="/#contact" className="transition-colors hover:text-primary">
            聯絡諮詢
          </a>
        </div>

        {/* 右側聯絡 */}
        <div className="text-center md:text-right">
          <p className="text-sm font-semibold text-foreground">
            LINE 線上詢問
          </p>

          <LineConsultButton className="mt-2 inline-block text-sm font-medium text-primary transition-opacity hover:opacity-70">
            加入官方 LINE →
          </LineConsultButton>

          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            後事流程｜生命禮儀｜保險補助｜法律稅務
          </p>
        </div>
      </div>

      {/* 免責聲明 */}
      <div className="relative mx-auto mt-10 max-w-6xl rounded-2xl border border-border/60 bg-muted/30 px-5 py-4 text-center">
        <p className="text-xs leading-6 text-muted-foreground">
          免責聲明：本網站部分內容可能由 AI 協助整理，並經人工審閱後發布。
          網站內容僅供一般資訊參考，不構成法律、保險、稅務、醫療、投資或其他專業建議。
          相關法規、補助資格、保險理賠、稅務規定與申請流程，可能因政策或個案狀況而有所不同，
          實際內容請以政府機關、主管機關、保險公司、專業人士或官方公告之最新資訊為準。
        </p>
      </div>

      {/* 底部 */}
      <div className="relative mx-auto mt-6 max-w-6xl border-t border-border/60 pt-6 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          © 2026 台灣生命資訊網. All rights reserved.
        </p>
      </div>
    </footer>
  )
}