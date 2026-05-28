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

const siteName = "社會住宅包租代管資訊站"
const siteUrl = "https://home.line88.tw"

const builder = createImageUrlBuilder(client)

function urlFor(source: any) {
  if (!source) return { url: () => "" }
  return builder.image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      return (
        <figure className="my-10 flex flex-col items-center">
          <img
            src={urlFor(value).url()}
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
      "mainImage": mainImage.asset->url
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
      images: post.mainImage ? [{ url: post.mainImage }] : [],
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
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current,
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute left-1/2 top-20 -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute right-0 top-96 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="mx-auto max-w-4xl">
          <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              首頁
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-primary">
              最新文章
            </Link>
            <span>/</span>
            <span className="max-w-xs truncate text-foreground">
              {post.title}
            </span>
          </nav>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            {post.title}
          </h1>

          <div className="mb-12 flex flex-wrap items-center gap-4 border-b border-border pb-8 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              撰文者：{post.authorName || siteName}
            </span>

            {publishedDate && (
              <>
                <span className="text-border">|</span>
                <span>{publishedDate}</span>
              </>
            )}
          </div>

          {post.mainImage && (
            <div className="mb-16 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_70px_rgba(120,80,70,0.12)]">
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <article
            className="
              prose max-w-none
              prose-lg md:prose-xl
              prose-p:mb-5 prose-p:leading-[1.9] prose-p:text-muted-foreground
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-5 prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:text-2xl
              prose-strong:font-bold prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-70
              prose-ul:rounded-[1.5rem] prose-ul:border prose-ul:border-border prose-ul:bg-white/70 prose-ul:p-8 prose-ul:shadow-sm
              prose-li:text-muted-foreground prose-li:marker:text-primary
              prose-table:my-10 prose-table:block prose-table:overflow-x-auto prose-table:border-collapse
              prose-thead:bg-primary/10 prose-th:border prose-th:border-border prose-th:p-4 prose-th:text-primary
              prose-td:border prose-td:border-border prose-td:p-4 prose-td:text-muted-foreground
              prose-img:rounded-[2rem] prose-img:border prose-img:border-border
              prose-blockquote:rounded-r-2xl prose-blockquote:border-l-primary prose-blockquote:bg-white/70 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-muted-foreground
            "
          >
            {post.htmlContent ? (
              <div
                className="
                  [&_table]:!my-10
                  [&_table]:!w-full
                  [&_table]:!border-collapse
                  [&_table]:!overflow-hidden
                  [&_table]:!rounded-2xl
                  [&_th]:!border
                  [&_th]:!border-border
                  [&_th]:!bg-primary/10
                  [&_th]:!p-4
                  [&_th]:!text-primary
                  [&_td]:!border
                  [&_td]:!border-border
                  [&_td]:!p-4
                  [&_td]:!text-muted-foreground
                  [&_tr]:!bg-transparent
                  [&_img]:mx-auto
                  [&_img]:my-8
                  [&_img]:block
                  [&_img]:rounded-[2rem]
                  [&_img]:border
                  [&_img]:border-border
                  [&_img]:shadow-[0_16px_50px_rgba(120,80,70,0.12)]
                  [&_p]:mb-5
                  [&_p]:leading-[1.9]
                  [&_p]:text-muted-foreground
                  [&_h2]:mt-12
                  [&_h2]:mb-6
                  [&_h2]:border-l-4
                  [&_h2]:border-primary
                  [&_h2]:pl-5
                  [&_h2]:text-3xl
                  [&_h2]:font-bold
                  [&_h2]:text-foreground
                  [&_h3]:mt-8
                  [&_h3]:text-2xl
                  [&_h3]:font-bold
                  [&_h3]:text-foreground
                  [&_li]:mb-1
                  [&_li]:text-muted-foreground
                  [&_strong]:text-foreground
                "
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            ) : (
              post.body && (
                <PortableText value={post.body} components={ptComponents} />
              )
            )}
          </article>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary"
            >
              ← 返回文章列表
            </Link>

            <LineConsultButton className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(217,143,143,0.32)] transition-all hover:-translate-y-0.5">
              預約專業諮詢 →
            </LineConsultButton>
          </div>
        </div>
      </main>

      <LineConsultButton
        className="
          fixed bottom-6 right-6 z-[9999]
          flex items-center gap-3
          rounded-full
          bg-primary
          px-6 py-4
          text-sm md:text-base
          font-semibold
          text-primary-foreground
          shadow-[0_18px_45px_rgba(217,143,143,0.35)]
          backdrop-blur-md
          border border-white/40
          transition-all duration-300
          hover:scale-105
          hover:shadow-[0_22px_60px_rgba(217,143,143,0.5)]
        "
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>

        <span>立即諮詢</span>

        <span>→</span>
      </LineConsultButton>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ "slug": slug.current }`
  const posts = await client.fetch(query)

  if (!posts) return []

  return posts.map((post: any) => ({ slug: post.slug }))
}