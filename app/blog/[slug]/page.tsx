import { client } from "@/lib/sanity"
import { createImageUrlBuilder } from "@sanity/image-url"
import { PortableText } from "@portabletext/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

  let cleaned = html

  for (const keyword of bannedKeywords) {
    const regex = new RegExp(`[^<]*${keyword}[^<]*`, "g")
    cleaned = cleaned.replace(regex, "")
  }

  return cleaned
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
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url: `${siteUrl}/blog/${slug}`,
      siteName,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url() }]
        : [],
      locale: "zh_TW",
      type: "article",
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

      <Navbar />

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

          <article className="prose max-w-none">
            {post.htmlContent ? (
              <div
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
              <center><ShareBar /></center>
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