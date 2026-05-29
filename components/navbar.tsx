"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { LineConsultButton } from "@/components/line-consult-button"

const navMenus = [
  {
    label: "後事流程",
    href: "/funeral-process",
    items: [
      { label: "親人過世怎麼辦", href: "/blog/what-to-do-when-family-passes-away" },
      { label: "往生後24小時流程", href: "/blog/first-24-hours-after-death" },
      { label: "死亡證明申請", href: "/blog/death-certificate" },
      { label: "遺體接運流程", href: "/blog/body-transportation" },
      { label: "告別式流程", href: "/blog/funeral-ceremony-process" },
      { label: "火化流程", href: "/blog/cremation-process" },
      { label: "晉塔流程", href: "/blog/urn-placement-process" },
    ],
  },
  {
    label: "殯葬費用",
    href: "/pricing",
    items: [
      { label: "喪葬費用怎麼算", href: "/blog/funeral-cost" },
      { label: "告別式費用", href: "/blog/farewell-ceremony-cost" },
      { label: "火化費用", href: "/blog/cremation-cost" },
      { label: "靈堂費用", href: "/blog/memorial-hall-cost" },
      { label: "禮車費用", href: "/blog/funeral-car-cost" },
      { label: "塔位價格", href: "/blog/columbarium-price" },
      { label: "生前契約價格", href: "/blog/pre-need-contract-price" },
    ],
  },
  {
    label: "塔位納骨塔",
    href: "/memorial",
    items: [
      { label: "納骨塔介紹", href: "/blog/columbarium" },
      { label: "公立納骨塔", href: "/blog/public-columbarium" },
      { label: "私立納骨塔", href: "/blog/private-columbarium" },
      { label: "塔位買賣", href: "/blog/columbarium-trading" },
      { label: "塔位轉讓", href: "/blog/columbarium-transfer" },
      { label: "塔位選位指南", href: "/blog/columbarium-selection" },
      { label: "晉塔指南", href: "/blog/urn-placement-guide" },
    ],
  },
  {
    label: "生前規劃",
    href: "/pre-planning",
    items: [
      { label: "生前契約", href: "/blog/pre-need-contract" },
      { label: "生前契約比較", href: "/blog/pre-need-contract-comparison" },
      { label: "生前契約注意事項", href: "/blog/pre-need-contract-notes" },
      { label: "預立後事規劃", href: "/blog/funeral-pre-planning" },
      { label: "高齡族規劃", href: "/blog/elderly-funeral-planning" },
    ],
  },
  {
    label: "喪葬補助",
    href: "/subsidy",
    items: [
      { label: "勞保死亡給付", href: "/blog/labor-insurance-death-benefit" },
      { label: "國保死亡給付", href: "/blog/national-pension-death-benefit" },
      { label: "農保喪葬補助", href: "/blog/farmer-insurance-funeral-subsidy" },
      { label: "軍公教補助", href: "/blog/public-sector-funeral-subsidy" },
      { label: "各縣市喪葬補助", href: "/blog/city-funeral-subsidy" },
      { label: "補助申請流程", href: "/blog/funeral-subsidy-application" },
    ],
  },
  {
    label: "法律繼承",
    href: "/inheritance",
    items: [
      { label: "遺產繼承", href: "/blog/inheritance" },
      { label: "拋棄繼承", href: "/blog/renunciation-of-inheritance" },
      { label: "限定繼承", href: "/blog/limited-inheritance" },
      { label: "遺囑撰寫", href: "/blog/will-writing" },
      { label: "遺產稅", href: "/blog/estate-tax" },
      { label: "不動產繼承", href: "/blog/real-estate-inheritance" },
    ],
  },
]

const simpleLinks = [
  { label: "首頁", href: "/" },
  { label: "最新文章", href: "/blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMobileMenu(null)

    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset"
    }
  }, [pathname])

  const toggleMenu = () => {
    const nextState = !mobileOpen
    setMobileOpen(nextState)

    if (typeof document !== "undefined") {
      document.body.style.overflow = nextState ? "hidden" : "unset"
    }
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setOpenMobileMenu(null)

    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset"
    }
  }

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-[50] flex justify-center">
        <div
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-500
            ${
              scrolled
                ? "mt-4 h-16 w-[94%] max-w-7xl rounded-full border border-border/70 bg-white/90 px-5 shadow-[0_18px_50px_rgba(23,75,115,0.14)] backdrop-blur-xl md:w-[92%] md:px-7"
                : "h-20 w-full border-b border-border/60 bg-white/85 px-5 backdrop-blur-xl md:px-10"
            }
          `}
        >
          <Link href="/" className="relative z-[60] flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="台灣生命資訊網 Logo"
              className="h-10 w-10 rounded-full border border-primary/20 bg-white object-cover shadow-sm"
            />

            <div className="leading-tight">
              <span className="block whitespace-nowrap text-base font-black tracking-tight text-foreground md:text-xl">
                台灣生命資訊網
              </span>

              <span className="hidden text-xs tracking-[0.18em] text-muted-foreground lg:block">
                TAIWAN LIFE INFORMATION
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              首頁
            </Link>

            {navMenus.map((menu) => (
              <div key={menu.label} className="group relative">
                <Link
                  href={menu.href}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {menu.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </Link>

                <div className="invisible absolute left-1/2 top-full z-[80] mt-3 w-[260px] -translate-x-1/2 rounded-3xl border border-border/70 bg-white/95 p-3 opacity-0 shadow-[0_22px_70px_rgba(23,75,115,0.16)] backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-2 border-b border-border/60 px-3 pb-3">
                    <p className="text-sm font-black text-foreground">
                      {menu.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      常見搜尋與資訊整理
                    </p>
                  </div>

                  <div className="grid gap-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/blog"
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              最新文章
            </Link>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <LineConsultButton className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_rgba(23,75,115,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(23,75,115,0.35)]">
              LINE 詢問流程
            </LineConsultButton>
          </div>

          <button
            onClick={toggleMenu}
            aria-label="開啟選單"
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-white shadow-sm xl:hidden"
          >
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background px-7 pt-24 xl:hidden animate-in fade-in duration-300">
          <button
            onClick={toggleMenu}
            aria-label="關閉選單"
            className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white shadow-sm"
          >
            <div className="relative h-6 w-6">
              <span className="absolute left-0 top-1/2 h-0.5 w-full rotate-45 rounded-full bg-foreground" />
              <span className="absolute left-0 top-1/2 h-0.5 w-full -rotate-45 rounded-full bg-foreground" />
            </div>
          </button>

          <div className="mb-6">
            <p className="text-sm tracking-[0.24em] text-muted-foreground">
              TAIWAN LIFE INFORMATION
            </p>

            <p className="mt-2 text-2xl font-black text-foreground">
              台灣生命資訊網
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pb-8">
            <div className="flex w-full flex-col">
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-border py-5 text-xl font-semibold text-foreground transition-colors active:text-primary"
                >
                  {link.label}
                  <span className="text-primary">→</span>
                </Link>
              ))}

              {navMenus.map((menu) => {
                const isOpen = openMobileMenu === menu.label

                return (
                  <div key={menu.label} className="border-b border-border">
                    <button
                      onClick={() =>
                        setOpenMobileMenu(isOpen ? null : menu.label)
                      }
                      className="flex w-full items-center justify-between py-5 text-left text-xl font-semibold text-foreground transition-colors active:text-primary"
                    >
                      {menu.label}
                      <ChevronDown
                        size={20}
                        className={`text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="grid gap-1 pb-4">
                        <Link
                          href={menu.href}
                          onClick={closeMobileMenu}
                          className="rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-primary"
                        >
                          查看{menu.label}總覽
                        </Link>

                        {menu.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors active:bg-secondary active:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <LineConsultButton className="mt-6 flex h-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                LINE 詢問後事流程
              </LineConsultButton>

              <div className="mt-8 text-sm leading-7 text-muted-foreground">
                <p>後事流程｜喪葬費用｜塔位納骨塔｜生前規劃</p>
                <p>提供家屬清楚、低壓力的資訊整理與諮詢協助</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}