"use client"

import {
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react"

const contacts = [
  {
    label: "LINE 詢問後事流程",
    description:
      "可先詢問臨終準備、往生後流程、告別式安排、塔位資訊與費用觀念，協助家屬先釐清方向。",
    href: "https://line.me/R/ti/p/@你的LINEID",
    icon: <MessageCircle size={28} />,
  },
  {
    label: "電話資訊諮詢",
    description:
      "若家屬目前情況較急，可透過電話詢問後續流程與可協助事項，先了解下一步怎麼安排。",
    href: "tel:0900000000",
    icon: <Phone size={28} />,
  },
  {
    label: "服務與協助地區",
    description:
      "提供台灣各地後事流程、生命禮儀、塔位與相關殯葬服務資訊諮詢，實際服務內容可進一步確認。",
    href: "https://maps.google.com",
    icon: <MapPin size={28} />,
  },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24"
    >
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary">
            CONTACT INFORMATION
          </p>

          <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            家屬資訊諮詢
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            面對臨終、往生或後事安排時，
            家屬常會不知道第一步該怎麼做。
            你可以先透過 LINE 或電話詢問流程，
            了解目前情況適合怎麼處理。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative overflow-hidden rounded-[2rem]
                border border-border/70
                bg-white/85
                p-7
                shadow-[0_10px_40px_rgba(23,75,115,0.08)]
                backdrop-blur
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-primary/30
                hover:shadow-[0_20px_60px_rgba(23,75,115,0.14)]
              "
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-5">
                <div
                  className="
                    flex h-16 w-16 flex-shrink-0 items-center justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                >
                  {contact.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {contact.label}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {contact.description}
                  </p>

                  <div className="mt-5 flex items-center text-sm font-semibold text-primary">
                    查看聯絡方式

                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://line.me/R/ti/p/@你的LINEID"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              rounded-full
              bg-[#06C755]
              px-8 py-4
              text-sm font-semibold
              text-primary-foreground
              shadow-[0_14px_36px_rgba(23,75,115,0.28)]
              transition-all
              hover:-translate-y-0.5
              hover:shadow-[0_18px_44px_rgba(23,75,115,0.38)]
            "
          >
            LINE 詢問後事流程
          </a>

          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            後事流程｜生命禮儀｜塔位資訊｜費用觀念｜家屬諮詢協助
          </p>
        </div>
      </div>
    </section>
  )
}