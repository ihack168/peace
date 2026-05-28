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
            社會住宅包租代管
          </h3>

          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            提供社會住宅包租代管、 房屋出租管理、
            租客媒合與租屋補助相關諮詢服務，
            協助房東安心出租、穩定管理。
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

          <a href="/#contact" className="transition-colors hover:text-primary">
            聯絡諮詢
          </a>
        </div>

        {/* 右側聯絡 */}
        <div className="text-center md:text-right">
          <p className="text-sm font-semibold text-foreground">
            LINE 免費諮詢
          </p>

          <LineConsultButton className="mt-2 inline-block text-sm font-medium text-primary transition-opacity hover:opacity-70">
            加入官方 LINE →
          </LineConsultButton>

          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            房東出租｜社會住宅｜包租代管
          </p>
        </div>
      </div>

      {/* 底部 */}
      <div className="relative mx-auto mt-10 max-w-6xl border-t border-border/60 pt-6 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          © 2026 凌群不動產. All rights reserved.
        </p>
      </div>
    </footer>
  )
}