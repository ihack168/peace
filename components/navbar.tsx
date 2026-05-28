"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LineConsultButton } from "@/components/line-consult-button"

const navLinks = [
  { label: "首頁", href: "/" },
  { label: "最新文章", href: "/blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)

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

    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset"
    }
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[50] flex justify-center pointer-events-none">
        <div
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-500
            ${
              scrolled
                ? "mt-4 h-16 w-[92%] max-w-6xl rounded-full border border-border/70 bg-white/90 px-5 shadow-[0_18px_50px_rgba(31,78,121,0.14)] backdrop-blur-xl md:w-[86%] md:px-7"
                : "h-20 w-full border-b border-border/60 bg-white/80 px-5 backdrop-blur-xl md:px-10"
            }
          `}
        >
          <Link
            href="/"
            className="relative z-[60] flex items-center gap-3"
          >
            <img
              src="/images/logo.png"
              alt="社會住宅包租代管資訊站 Logo"
              className="h-10 w-10 rounded-full border border-primary/20 bg-white object-cover shadow-sm"
            />

            <div className="leading-tight">
              <span className="block text-base font-black tracking-tight text-foreground md:text-xl">
                社會住宅包租代管資訊站
              </span>

              <span className="hidden text-xs tracking-[0.18em] text-muted-foreground md:block">
                RENTAL MANAGEMENT SERVICE
              </span>
            </div>
          </Link>

          {/* 電腦版 */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[15px] md:text-base font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}

                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            ))}

            <LineConsultButton className="rounded-full bg-primary px-6 py-3 text-sm md:text-base font-semibold text-primary-foreground shadow-[0_10px_30px_rgba(31,78,121,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(31,78,121,0.35)]">
              LINE 免費諮詢
            </LineConsultButton>
          </div>

          {/* 手機漢堡 */}
          <button
            onClick={toggleMenu}
            aria-label="開啟選單"
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-white shadow-sm md:hidden"
          >
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
          </button>
        </div>
      </nav>

      {/* 手機選單 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background px-7 pt-24 md:hidden animate-in fade-in duration-300">
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

          <div className="mb-8">
            <p className="text-sm tracking-[0.24em] text-muted-foreground">
              RENTAL MANAGEMENT
            </p>

            <p className="mt-2 text-2xl font-black text-foreground">
              社會住宅包租代管資訊站
            </p>
          </div>

          <div className="flex w-full flex-col">
            {navLinks.map((link) => (
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

            {/* 手機版聯絡方式 */}
            <LineConsultButton className="flex items-center justify-between border-b border-border py-5 text-xl font-semibold text-foreground transition-colors active:text-primary">
              <>
                聯絡方式
                <span className="text-primary">→</span>
              </>
            </LineConsultButton>
          </div>

          {/* 手機版 CTA */}
          <LineConsultButton className="mt-8 flex h-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_14px_36px_rgba(31,78,121,0.28)]">
            加入 LINE 免費諮詢
          </LineConsultButton>

          <div className="mt-auto pb-8 text-sm leading-7 text-muted-foreground">
            <p>房東安心出租｜租客穩定入住｜專業租務管理</p>

            <p>社會住宅包租代管與租屋補助諮詢服務</p>
          </div>
        </div>
      )}
    </>
  )
}