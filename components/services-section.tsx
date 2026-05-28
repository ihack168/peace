"use client"

import Link from "next/link"
import {
  FileText,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  ScrollText,
  PhoneCall,
} from "lucide-react"

interface ServiceItem {
  title: string
  description: string
  icon: React.ReactNode
  link?: string
}

const services: ServiceItem[] = [
  {
    title: "後事流程資訊",
    description:
      "整理臨終到告別式期間常見流程，協助家屬快速理解需要準備的事項與安排方向。",
    icon: <FileText size={24} />,
  },
  {
    title: "生命禮儀諮詢",
    description:
      "提供治喪流程、禮儀安排與常見問題說明，降低家屬在資訊不足時的焦慮與不安。",
    icon: <HeartHandshake size={24} />,
  },
  {
    title: "塔位與殯葬資訊",
    description:
      "協助了解塔位、火化、禮廳與相關殯葬服務內容，方便家屬做後續規劃。",
    icon: <Landmark size={24} />,
  },
  {
    title: "治喪文件整理",
    description:
      "整理家屬常見需要準備的文件與行政流程，協助快速了解後續辦理方向。",
    icon: <ScrollText size={24} />,
  },
  {
    title: "家屬陪伴與協助",
    description:
      "在重要時刻提供基礎資訊與諮詢協助，讓家屬能更安心面對後續安排。",
    icon: <PhoneCall size={24} />,
  },
  {
    title: "透明資訊與費用觀念",
    description:
      "協助了解生命禮儀相關服務內容與常見費用觀念，降低資訊不透明造成的不安。",
    icon: <ShieldCheck size={24} />,
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-24"
    >
      <div className="absolute left-0 top-20 h-[240px] w-[240px] rounded-full bg-primary/10 blur-[90px]" />

      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary">
            TAIWAN LIFE INFORMATION
          </p>

          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            後事與生命禮儀
            <span className="block text-primary">
              常見資訊整理
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            從後事流程、禮儀安排、塔位資訊、
            文件準備到常見費用觀念，
            提供家屬更容易理解的資訊整理與諮詢方向，
            降低面對重大事件時的混亂與壓力。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const CardContent = (
              <div className="group relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/85 p-7 shadow-[0_10px_40px_rgba(23,75,115,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(23,75,115,0.14)]">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                    查看資訊
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            )

            if (service.link) {
              return (
                <Link
                  key={service.title}
                  href={service.link}
                  className="block"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div key={service.title}>
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}