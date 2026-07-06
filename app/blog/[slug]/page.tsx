import { client } from "@/lib/sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { PortableText } from "@portabletext/react"
import { Footer } from "@/components/footer"
import { ShareBar } from "@/components/share-bar";
import { LineConsultButton } from "@/components/line-consult-button"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export const revalidate = 0
export const dynamic = "force-dynamic"

const siteName =
  "台灣生命資訊網｜後事流程、生命禮儀、殯葬服務與塔位費用資訊"
const siteUrl = "https://peace.line88.tw"

const builder = createImageUrlBuilder(client)

function urlFor(source: any) {
  if (!source) return { url: () => "" }
  return builder.image(source)
}

/**
 * 👉 Sanity image normalize
 */
function optimizeSanityImages(html?: string) {
  if (!html) return ""

  return html.replace(
    /(https:\/\/cdn\.sanity\.io\/images\/[^"' )<>]+)/g,
    (url) => {
      if (url.includes("auto=format")) return url
      return `${url}${url.includes("?") ? "&" : "?"}auto=format`
    }
  )
}

/**
 * 🚨 清理「跨產業污染內容」
 *
 * 注意：只在「> 文字 <」之間的純文字節點內做替換，絕不觸碰標籤本身，
 * 避免把標籤名稱一起吃掉（舊版寫法會把 <p> 吃成 <，導致 <</p> 這種壞標籤）。
 * 命中關鍵字時也只刪掉該句（以中文標點斷句），而不是整段文字清空。
 */
function sanitizeContent(html: string) {
  const bannedKeywords = [
    "減肥",
    "健身",
    "保健品",
    "電商",
    "股票",
    "投資",
    "SEO",
    "行銷",
    "產品推薦",
  ]

  const keywordPattern = new RegExp(bannedKeywords.join("|"))

  return html.replace(/>([^<]*)</g, (fullMatch, text) => {
    if (!keywordPattern.test(text)) return fullMatch

    let cleaned = text
    for (const keyword of bannedKeywords) {
      // 只刪除包含關鍵字的那一句（以句號、驚嘆號、問號、換行斷句），保留同一文字節點的其他句子
      const sentenceRegex = new RegExp(
        `[^。！？\\n]*${keyword}[^。！？\\n]*[。！？]?`,
        "g"
      )
      cleaned = cleaned.replace(sentenceRegex, "")
    }

    return `>${cleaned}<`
  })
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      return (
        <figure className="my-10 flex flex-col items-center">
          <img
            src={urlFor(value).auto("format").url()}
            alt={value.alt || "文章圖片"}
            className="w-full rounded-[2rem] border border-border shadow-[0_16px_50px_rgba(120,80,70,0.12)]"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      mainImage
    }`,
    { slug }
  )

  if (!post) return {}

return {
  title: `${post.title} | ${siteName}`,
  description: post.description || post.title,
  alternates: {
    canonical: `/blog/${slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description || post.title,
    url: `${siteUrl}/blog/${slug}`,
    siteName,
    images: ogImage ? [{ url: ogImage }] : [],
    locale: "zh_TW",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description || post.title,
    images: ogImage ? [ogImage] : [],
  },
}
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      publishedAt,
      mainImage,
      body,
      htmlContent,
      "authorName": author->name,
      "tags": categories[]->title
    }`,
    { slug },
    { cache: "no-store" }
  )

  if (!post) notFound()

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  // 👉 normalize + sanitize
  const optimizedHtml = sanitizeContent(
    optimizeSanityImages(post.htmlContent || "")
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.title,
    author: {
      "@type": "Person",
      name: post.authorName || siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    url: `${siteUrl}/blog/${slug}`,
    image: post.mainImage
      ? urlFor(post.mainImage).width(1200).auto("format").url()
      : undefined,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">

          <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">首頁</Link>
            <span>/</span>
            <Link href="/blog">最新文章</Link>
            <span>/</span>
            <span className="truncate">{post.title}</span>
          </nav>

          {post.tags && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            {post.title}
          </h1>

          <div className="mb-12 text-sm text-muted-foreground">
            {post.authorName || siteName}
            {publishedDate && ` ｜ ${publishedDate}`}
          </div>

          {post.mainImage && (
            <div className="mb-16 overflow-hidden rounded-[2rem] border">
              <img
                src={urlFor(post.mainImage).auto("format").url()}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <article className="prose max-w-none prose-lg md:prose-xl prose-p:mb-5 prose-p:leading-[1.9] prose-p:text-muted-foreground prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-5 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-strong:font-bold prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-70 prose-ul:rounded-[1.5rem] prose-ul:border prose-ul:border-border prose-ul:bg-white/70 prose-ul:p-8 prose-ul:shadow-sm prose-li:text-muted-foreground prose-li:marker:text-primary prose-table:my-10 prose-table:block prose-table:overflow-x-auto prose-table:border-collapse prose-thead:bg-primary/10 prose-th:border prose-th:border-border prose-th:p-4 prose-th:text-primary prose-td:border prose-td:border-border prose-td:p-4 prose-td:text-muted-foreground prose-img:rounded-[2rem] prose-img:border prose-img:border-border prose-blockquote:rounded-r-2xl prose-blockquote:border-l-primary prose-blockquote:bg-white/70 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-muted-foreground">
            {post.htmlContent ? (
              <div
                className="[&_table]:!my-10 [&_table]:!w-full [&_table]:!border-collapse [&_table]:!overflow-hidden [&_table]:!rounded-2xl [&_th]:!border [&_th]:!border-border [&_th]:!bg-primary/10 [&_th]:!p-4 [&_th]:!text-primary [&_td]:!border [&_td]:!border-border [&_td]:!p-4 [&_td]:!text-muted-foreground [&_tr]:!bg-transparent [&_img]:mx-auto [&_img]:my-8 [&_img]:block [&_img]:rounded-[2rem] [&_img]:border [&_img]:border-border [&_img]:shadow-[0_16px_50px_rgba(120,80,70,0.12)] [&_p]:mb-5 [&_p]:leading-[1.9] [&_p]:text-muted-foreground [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:pl-5 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:mb-1 [&_li]:text-muted-foreground [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: optimizedHtml }}
              />
            ) : (
              post.body && (
                <PortableText value={post.body} components={ptComponents} />
              )
            )}
          </article>

          <div className="mt-16 flex justify-between border-t pt-8">
            <Link href="/blog">← 返回文章列表</Link>

            <LineConsultButton>預約諮詢 →</LineConsultButton>
          </div>
        </div>

        <ShareBar />
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  )

  return posts?.map((p: any) => ({ slug: p.slug })) || []
}