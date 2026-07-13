import Link from "next/link"
import { client } from "@/lib/sanity"
import { LatestPostCard, type LatestPost } from "@/components/latest-post-card"

interface RawPost {
  id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  mainImage?: string
  htmlContent?: string
  videoId?: string
  tags: string[]
  publishedAt: string
}

function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""
  if (!url.includes("cdn.sanity.io/images")) return url
  if (url.includes("auto=format")) return url
  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

function processPost(post: RawPost): LatestPost {
  let extractedImg = ""
  let extractedDesc = post.description || ""

  if (post.htmlContent) {
    const imgMatch = post.htmlContent.match(/<img[^>]+src="([^">]+)"/)

    if (imgMatch && imgMatch[1]) {
      extractedImg = optimizeSanityImageUrl(imgMatch[1])
    }

    if (!extractedDesc || extractedDesc === "點擊閱讀詳情...") {
      const pureText = post.htmlContent.replace(/<[^>]*>?/gm, "").trim()
      extractedDesc =
        pureText.substring(0, 100) + (pureText.length > 100 ? "..." : "")
    }
  }

  if (!extractedDesc) extractedDesc = "點擊閱讀詳情..."

  const youtubeThumb = post.videoId
    ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
    : ""

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: extractedDesc,
    thumbnail:
      extractedImg ||
      youtubeThumb ||
      optimizeSanityImageUrl(post.imageUrl) ||
      optimizeSanityImageUrl(post.mainImage) ||
      "",
    videoId: post.videoId,
    tags: Array.isArray(post.tags) ? post.tags : [],
    publishedAt: post.publishedAt,
  }
}

// 首頁「最新文章」區塊，改成 Server Component 在伺服器端直接抓資料，
// 原始 HTML 就會包含真正的文章卡片與連結，而不是只有一顆轉圈圈的 loading。
export async function LatestPostsSection() {
  const rawPosts: RawPost[] = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc) [0...6] {
      "id": _id,
      title,
      "slug": slug.current,
      description,
      "imageUrl": imageUrl,
      "mainImage": mainImage.asset->url,
      htmlContent,
      "videoId": youtubeVideoId,
      "tags": tags,
      "publishedAt": coalesce(publishedAt, _createdAt)
    }`,
    {},
    { cache: "no-store" }
  )

  const posts = rawPosts.map(processPost)

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            LATEST ARTICLES
          </p>

          <h2 className="mt-3 text-2xl font-black text-foreground md:text-4xl">
            最新文章
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            整理後事流程、生命禮儀、殯葬服務與塔位費用相關資訊。
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex justify-center rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary"
        >
          查看全部文章 →
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <LatestPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-border bg-white/60 py-24 text-center shadow-sm backdrop-blur">
          <p className="text-xl font-bold text-foreground">
            暫時沒有最新文章
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            之後會陸續分享後事流程、生命禮儀與殯葬服務相關內容。
          </p>
        </div>
      )}
    </section>
  )
}