"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { client } from "@/lib/sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface Post {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  videoId?: string
  tags: string[]
  publishedAt: string
  htmlContent?: string
}

function optimizeSanityImageUrl(url?: string) {
  if (!url) return ""

  if (!url.includes("cdn.sanity.io/images")) return url

  if (url.includes("auto=format")) return url

  return `${url}${url.includes("?") ? "&" : "?"}auto=format`
}

function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedTag = searchParams.get("tag") || "全部"

  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const postsPerPage = 9

  useEffect(() => {
    setPage(1)
  }, [selectedTag])

  useEffect(() => {
    async function fetchSanityPosts() {
      setLoading(true)

      try {
        const start = (page - 1) * postsPerPage
        const end = start + postsPerPage

        const tagFilter = selectedTag !== "全部" ? `&& $selectedTag in tags` : ""

        const count = await client.fetch(
          `count(*[_type == "post" ${tagFilter}])`,
          { selectedTag },
          { cache: "no-store" }
        )

        setTotalPosts(count)

        const result = await client.fetch(
          `*[_type == "post" ${tagFilter}] | order(_createdAt desc) [$start...$end] {
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
        )

        const processedPosts = result.map((post: any) => {
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
                pureText.substring(0, 100) +
                (pureText.length > 100 ? "..." : "")
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
        })

        setPosts(processedPosts)
      } catch (err) {
        console.error("Sanity 抓取失敗:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSanityPosts()

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [page, selectedTag])

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || [])
    return ["全部", ...Array.from(new Set(tags))]
  }, [posts])

  const totalPages = Math.ceil(totalPosts / postsPerPage) || 1

  const handleTagClick = (tag: string) => {
    setActiveVideo(null)

    if (tag === "全部") {
      router.push("/blog")
      return
    }

    router.push(`/blog?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute left-1/2 top-20 -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute right-0 top-80 -z-10 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <header>
              <p className="mb-3 text-sm font-medium tracking-[0.2em] text-primary">
                BEAUTY JOURNAL
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                最新文章
              </h1>

              <p className="mt-4 text-muted-foreground">
                {selectedTag === "全部"
                  ? "醫美療程、肌膚保養與術後照護知識"
                  : `目前分類：${selectedTag}`}
              </p>
            </header>

            <p className="rounded-full border border-border bg-white/70 px-5 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              共 {totalPosts} 篇文章
            </p>
          </div>

          <div className="mb-12 flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(217,143,143,0.28)]"
                    : "border-border bg-white/70 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-40">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            </div>
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-[2rem] border border-border/70 bg-white/80 shadow-[0_10px_40px_rgba(120,80,70,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(217,143,143,0.14)]"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        {activeVideo === post.id && post.videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1`}
                            className="h-full w-full border-none"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        ) : (
                          <div className="relative h-full w-full">
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
                                <div
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setActiveVideo(post.id)
                                  }}
                                  className="pointer-events-auto flex h-12 w-16 cursor-pointer items-center justify-center rounded-2xl bg-white/90 shadow-xl backdrop-blur transition-transform duration-300 group-hover:scale-110"
                                >
                                  <div className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-primary" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex min-h-[260px] flex-col p-6">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleTagClick(tag)}
                              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                                selectedTag === tag
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                              }`}
                            >
                              #{tag}
                            </button>
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
                    之後會陸續分享醫美療程、保養與術後照護內容。
                  </p>

                  {selectedTag !== "全部" && (
                    <button
                      onClick={() => handleTagClick("全部")}
                      className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      查看全部文章
                    </button>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-20 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="mr-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30"
                  >
                    上一頁
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`h-11 w-11 rounded-full border text-sm font-semibold transition-all ${
                          page === num
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(217,143,143,0.28)]"
                            : "border-border bg-white/70 text-muted-foreground hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {num}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="ml-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30"
                  >
                    下一頁
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  )
}