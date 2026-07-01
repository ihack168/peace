"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { LineConsultButton } from "@/components/line-consult-button"

type NavItem = { label: string; href: string }
type NavGroup = { title: string; items: NavItem[] }
type NavMenu = {
  label: string
  href: string
  description: string
  // A menu has either a flat `items` list, or multi-column `groups`.
  // Using groups (with headers) instead of one long flat list gives
  // crawlers / LLMs a clearer "mini sitemap" signal (GEO) while also
  // avoiding duplicate/competing pages for the same topic (SEO).
  items?: NavItem[]
  groups?: NavGroup[]
}

// 6 主分類（原本 8 個），依主題權威性（topical authority）整併，
// 避免同主題內容分散在多個分類（keyword cannibalization）。
// 例如「生前契約」原本同時出現在 費用／服務 兩處，現在集中到「生前規劃」。
const navMenus: NavMenu[] = [
  {
    label: "生前規劃",
    href: "/pre-planning",
    description: "及早規劃，減輕家人未來負擔",
    items: [
      { label: "預立後事規劃", href: "/blog/funeral-pre-planning" },
      { label: "高齡族規劃", href: "/blog/elderly-funeral-planning" },
      { label: "生前契約價格", href: "/blog/pre-need-contract-price" },
      { label: "生前契約服務", href: "/blog/pre-need-contract-service" },
    ],
  },
  {
    label: "後事流程",
    href: "/funeral-process",
    description: "從親人過世到晉塔，完整步驟說明",
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
    label: "殯葬服務",
    href: "/funeral-services",
    description: "禮儀公司、服務項目與殯葬用品總整理",
    groups: [
      {
        title: "服務項目",
        items: [
          { label: "禮儀公司怎麼選", href: "/blog/how-to-choose-funeral-home" },
          { label: "治喪委託流程", href: "/blog/funeral-entrustment-process" },
          { label: "禮儀師服務介紹", href: "/blog/funeral-director-services" },
          { label: "靈堂佈置服務", href: "/blog/memorial-hall-setup-service" },
          { label: "助念服務", href: "/blog/chanting-service" },
          { label: "遺體美容服務", href: "/blog/mortuary-cosmetology-service" },
        ],
      },
      {
        title: "殯葬用品",
        items: [
          { label: "棺木種類與選購", href: "/blog/coffin-selection-guide" },
          { label: "骨灰罈選購指南", href: "/blog/urn-selection-guide" },
          { label: "壽衣禮儀服飾", href: "/blog/burial-clothing" },
          { label: "往生被介紹", href: "/blog/buddhist-burial-shroud" },
          { label: "罐頭塔與腳尾飯", href: "/blog/funeral-offerings" },
          { label: "手尾錢習俗", href: "/blog/inheritance-money-custom" },
          { label: "法會用品準備", href: "/blog/buddhist-ceremony-supplies" },
        ],
      },
    ],
  },
  {
    label: "塔位納骨塔",
    href: "/memorial",
    description: "公立、私立塔位選購與晉塔指南",
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
    label: "費用與補助",
    href: "/pricing",
    description: "殯葬費用試算，以及各項政府補助申請",
    groups: [
      {
        title: "殯葬費用",
        items: [
          { label: "喪葬費用怎麼算", href: "/blog/funeral-cost" },
          { label: "告別式費用", href: "/blog/farewell-ceremony-cost" },
          { label: "火化費用", href: "/blog/cremation-cost" },
          { label: "靈堂費用", href: "/blog/memorial-hall-cost" },
          { label: "禮車費用", href: "/blog/funeral-car-cost" },
          { label: "塔位價格", href: "/blog/columbarium-price" },
        ],
      },
      {
        title: "喪葬補助",
        items: [
          { label: "勞保死亡給付", href: "/blog/labor-insurance-death-benefit" },
          { label: "國保死亡給付", href: "/blog/national-pension-death-benefit" },
          { label: "農保喪葬補助", href: "/blog/farmer-insurance-funeral-subsidy" },
          { label: "軍公教補助", href: "/blog/public-sector-funeral-subsidy" },
          { label: "各縣市喪葬補助", href: "/blog/city-funeral-subsidy" },
          { label: "補助申請流程", href: "/blog/funeral-subsidy-application" },
        ],
      },
    ],
  },
  {
    label: "法律繼承",
    href: "/inheritance",
    description: "遺產繼承、遺囑與稅務相關知識",
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

// 攤平單一選單的所有連結（不分 items / groups），方便手機版共用渲染邏輯
function getMenuItems(menu: NavMenu): NavItem[] {
  if (menu.items) return menu.items
  if (menu.groups) return menu.groups.flatMap((g) => g.items)
  return []
}

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

  // 統一管理 body overflow 鎖定與選單關閉，避免手機選單開合邏輯重複
  const setMobileMenuState = (open: boolean) => {
    setMobileOpen(open)
    if (!open) setOpenMobileMenu(null)

    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "unset"
    }
  }

  const toggleMenu = () => setMobileMenuState(!mobileOpen)
  const closeMobileMenu = () => setMobileMenuState(false)

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

            {navMenus.map((menu) => {
              const isGrouped = Boolean(menu.groups)

              return (
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

                  <div
                    className={`invisible absolute left-1/2 top-full z-[80] mt-3 -translate-x-1/2 rounded-3xl border border-border/70 bg-white/95 p-3 opacity-0 shadow-[0_22px_70px_rgba(23,75,115,0.16)] backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                      isGrouped ? "w-[480px]" : "w-[260px]"
                    }`}
                  >
                    <div className="mb-2 border-b border-border/60 px-3 pb-3">
                      <p className="text-sm font-black text-foreground">
                        {menu.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {menu.description}
                      </p>
                    </div>

                    {isGrouped ? (
                      <div className="grid grid-cols-2 gap-2">
                        {menu.groups!.map((group) => (
                          <div key={group.title}>
                            <p className="px-3 pb-1 pt-1 text-xs font-bold text-primary/70">
                              {group.title}
                            </p>
                            <div className="grid gap-1">
                              {group.items.map((item) => (
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
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-1">
                        {menu.items!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

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
                const flatItems = getMenuItems(menu)

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
                      <div className="pb-4">
                        <Link
                          href={menu.href}
                          onClick={closeMobileMenu}
                          className="mb-1 block rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-primary"
                        >
                          查看{menu.label}總覽
                        </Link>

                        {menu.groups ? (
                          menu.groups.map((group) => (
                            <div key={group.title} className="mt-2">
                              <p className="px-4 pb-1 pt-2 text-xs font-bold text-primary/70">
                                {group.title}
                              </p>
                              <div className="grid gap-1">
                                {group.items.map((item) => (
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
                            </div>
                          ))
                        ) : (
                          <div className="grid gap-1">
                            {flatItems.map((item) => (
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
                    )}
                  </div>
                )
              })}

              <LineConsultButton className="mt-6 flex h-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(23,75,115,0.28)]">
                LINE 詢問後事流程
              </LineConsultButton>

              <div className="mt-8 text-sm leading-7 text-muted-foreground">
                <p>生前規劃｜後事流程｜殯葬服務｜塔位納骨塔｜費用與補助｜法律繼承</p>
                <p>提供家屬清楚、低壓力的資訊整理與諮詢協助</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}