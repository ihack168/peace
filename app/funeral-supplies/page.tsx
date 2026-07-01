import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "殯葬用品｜台灣生命資訊網",
  description: "整理殯葬用品相關資訊，包含棺木選購、骨灰罈、壽衣禮儀服飾、往生被、法會用品等說明。",
}

const relatedArticles = [
  { label: "棺木種類與選購", href: "/blog/coffin-selection-guide" },
  { label: "骨灰罈選購指南", href: "/blog/urn-selection-guide" },
  { label: "壽衣禮儀服飾", href: "/blog/burial-clothing" },
  { label: "往生被介紹", href: "/blog/buddhist-burial-shroud" },
  { label: "罐頭塔與腳尾飯", href: "/blog/funeral-offerings" },
  { label: "手尾錢習俗", href: "/blog/inheritance-money-custom" },
  { label: "法會用品準備", href: "/blog/buddhist-ceremony-supplies" },
]

export default function FuneralSuppliesPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-10">
      <h1 className="text-3xl font-black text-foreground md:text-4xl">
        殯葬用品
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        內容整理中，之後會補上殯葬用品相關的完整介紹與比較資訊。
        以下是相關文章，可以先參考。
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {relatedArticles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="rounded-2xl border border-border bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            {article.label}
          </Link>
        ))}
      </div>
    </main>
  )
}