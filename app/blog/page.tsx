import { client } from "@/lib/sanity"
import { Footer } from "@/components/footer"
import { ShareBar } from "@/components/share-bar"
import Link from "next/link"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

const POSTS_PER_PAGE = 9

// 文章量大時，首頁上方 tag 不要太多。
// 顯示「全部」+ 熱門前 12 個 tag，對 SEO / AEO / GEO 比較乾淨。
const TOP_TAG_LIMIT = 12

const siteUrl = "https://peace.line88.tw"
const siteName = "台灣生命禮儀資訊網"

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

interface Post extends RawPost {
  thumbnail: string
}

interface TagItem {
  name: string
  count: number
}

function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""
  if (!url.includes("cdn.sanity.io/images")) return url
  if (url.includes("auto=format")) return url
  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

function processPost(post: RawPost): Post {
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
    ...post,
    thumbnail:
      extractedImg ||
      youtubeThumb ||
      optimizeSanityImageUrl(post.imageUrl) ||
      optimizeSanityImageUrl(post.mainImage) ||
      "",
    description: extractedDesc,
    tags: Array.isArray(post.tags) ? post.tags : [],
  }
}

function buildBlogUrl(tag: string, page: number) {
  const params = new URLSearchParams()
  if (tag !== "全部") params.set("tag", tag)
  if (page > 1) params.set("page", String(page))
  const qs = params.toString()
  return qs ? `/blog?${qs}` : "/blog"
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}): Promise<Metadata> {
  const { tag } = await searchParams
  const selectedTag = tag || "全部"

  const title = selectedTag === "全部" ? "最新文章" : `${selectedTag} 相關文章`

  const description =
    selectedTag === "全部"
      ? "生命禮儀、後事流程、殯葬服務與塔位費用資訊整理。"
      : `${siteName}「${selectedTag}」主題文章整理，後事流程與生命禮儀相關知識。`

  const url =
    selectedTag === "全部"
      ? `${siteUrl}/blog`
      : `${siteUrl}/blog?tag=${encodeURIComponent(selectedTag)}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>
}) {
  const { tag, page: pageParam } = await searchParams
  const selectedTag = tag || "全部"
  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1)

  const tagFilter = selectedTag !== "全部" ? `&& $selectedTag in tags` : ""
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [allTagsRaw, totalPosts, rawPosts] = await Promise.all([
    client.fetch(`*[_type == "post"]{ tags }`, {}, { cache: "no-store" }),
    client.fetch(
      `count(*[_type == "post" ${tagFilter}])`,
      { selectedTag },
      { cache: "no-store" }
    ),
    client.fetch(
      `*[_type == "post" ${tagFilter}] | order(coalesce(publishedAt, _createdAt) desc) [$start...$end] {
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
      { start, end, selectedTag },
      { cache: "no-store" }
    ),
  ])

  const tagCountMap = new Map<string, number>()
  allTagsRaw.forEach((post: { tags?: string[] }) => {
    if (!Array.isArray(post.tags)) return
    post.tags.forEach((t) => {
      const cleanTag = String(t || "").trim()
      if (!cleanTag) return
      tagCountMap.set(cleanTag, (tagCountMap.get(cleanTag) || 0) + 1)
    })
  })

  const sortedTags = Array.from(tagCountMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  const allTags: TagItem[] = [{ name: "全部", count: allTagsRaw.length }, ...sortedTags]

  const topTags = allTags.filter((t) => t.name !== "全部").slice(0, TOP_TAG_LIMIT)

  const selectedTagItem =
    selectedTag !== "全部" && !topTags.some((t) => t.name === selectedTag)
      ? allTags.find((t) => t.name === selectedTag)
      : null

  const visibleTags: TagItem[] = [
    ...allTags.filter((t) => t.name === "全部"),
    ...topTags,
    ...(selectedTagItem ? [selectedTagItem] : []),
  ]

  const posts = rawPosts.map(processPost)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE) || 1

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute left-1/2 top-20 -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute right-0 top-80 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <header>
              <p className="mb-3 text-sm font-medium tracking-[0.2em] text-primary">
                LIFE CEREMONY JOURNAL
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                最新文章
              </h1>

              <p className="mt-4 text-muted-foreground">
                {selectedTag === "全部"
                  ? "生命禮儀、後事流程、殯葬服務與塔位費用資訊"
                  : `目前分類：${selectedTag}`}
              </p>
            </header>

            <p className="rounded-full border border-border bg-white/70 px-5 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              共 {totalPosts} 篇文章
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {visibleTags.map((tagItem) => (
                <Link
                  key={tagItem.name}
                  href={buildBlogUrl(tagItem.name, 1)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selectedTag === tagItem.name
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(217,143,143,0.28)]"
                      : "border-border bg-white/70 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  #{tagItem.name}
                  <span
                    className={`ml-1 text-[10px] ${
                      selectedTag === tagItem.name
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {tagItem.count}
                  </span>
                </Link>
              ))}
            </div>

            {allTags.length > TOP_TAG_LIMIT + 1 && (
              <p className="mt-4 text-xs text-muted-foreground/70">
                已依全站文章標籤數量排序，顯示熱門前 {TOP_TAG_LIMIT} 個主題。
              </p>
            )}
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-[2rem] border border-border/70 bg-white/80 shadow-[0_10px_40px_rgba(120,80,70,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(217,143,143,0.14)]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block h-full w-full overflow-hidden"
                    >
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                          暫無圖片
                        </div>
                      )}
                    </Link>

                    {post.videoId && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-xl backdrop-blur">
                          <div className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-primary" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex min-h-[260px] flex-col p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags?.map((t) => (
                        <Link
                          key={t}
                          href={buildBlogUrl(t, 1)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                            selectedTag === t
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                          }`}
                        >
                          #{t}
                        </Link>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-primary"
                      >
                        閱讀文章
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-border bg-white/60 py-32 text-center shadow-sm backdrop-blur">
              <p className="text-xl font-bold text-foreground">
                暫時沒有相關文章
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                之後會陸續分享生命禮儀、後事流程、殯葬服務與塔位費用資訊。
              </p>

              {selectedTag !== "全部" && (
                <Link
                  href="/blog"
                  className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  查看全部文章
                </Link>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-20 flex flex-wrap items-center justify-center gap-2">
              <Link
                href={buildBlogUrl(selectedTag, Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={`mr-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary ${
                  page === 1 ? "pointer-events-none opacity-30" : ""
                }`}
              >
                上一頁
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <Link
                  key={num}
                  href={buildBlogUrl(selectedTag, num)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                    page === num
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(217,143,143,0.28)]"
                      : "border-border bg-white/70 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {num}
                </Link>
              ))}

              <Link
                href={buildBlogUrl(selectedTag, Math.min(totalPages, page + 1))}
                aria-disabled={page >= totalPages}
                className={`ml-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary ${
                  page >= totalPages ? "pointer-events-none opacity-30" : ""
                }`}
              >
                下一頁
              </Link>
            </div>
          )}
        </div>

        <ShareBar />
      </main>

      <Footer />
    </div>
  )
}