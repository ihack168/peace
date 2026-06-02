"use client"

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFpZDhMveHhdOYdDkh02JpWk28jUCBqikyM-Urg_6Uw2jTH7d8ZluKxinKTWh5_20N/exec"

const LINE_ADD_URL = "https://line.me/R/ti/p/~0910933178"

const VENDOR_ID = "peace"
const VENDOR_NAME = "台灣生命資訊網"

const DISTRICTS = [
  "台北",
  "新北",
  "桃園",
  "新竹",
  "台中",
  "彰化",
  "雲林",
  "嘉義",
  "台南",
  "高雄",
]

const SERVICE_TYPES = ["後事", "塔位", "生前契約", "法律", "補助"]

interface LineConsultButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function LineConsultButton({
  children,
  className = "",
  onClick,
}: LineConsultButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState<"district" | "service" | "form">(
    "district"
  )
  const [district, setDistrict] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneLast3, setPhoneLast3] = useState("")
  const [serviceBlocked, setServiceBlocked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetModal = () => {
    setShowModal(false)
    setModalStep("district")
    setDistrict("")
    setServiceType("")
    setLastName("")
    setPhoneLast3("")
    setServiceBlocked(false)
    setLoading(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setModalStep("district")
    setDistrict("")
    setServiceType("")
    setLastName("")
    setPhoneLast3("")
    setServiceBlocked(false)
  }

  const handleSelectDistrict = (selectedDistrict: string) => {
    setDistrict(selectedDistrict)
    setModalStep("service")
  }

  const handleSelectService = (selectedService: string) => {
    setServiceType(selectedService)

    if (selectedService === "法律" || selectedService === "補助") {
      setServiceBlocked(true)
      return
    }

    setServiceBlocked(false)
    setModalStep("form")
  }

  const handleSubmitLineConsult = async () => {
    const cleanLastName = lastName.trim()
    const cleanPhoneLast3 = phoneLast3.trim()

    if (!district) {
      alert("請先選擇地區")
      return
    }

    if (!serviceType) {
      alert("請先選擇需要的服務內容")
      return
    }

    if (serviceType === "法律" || serviceType === "補助") {
      alert("很抱歉，我們不提供此項諮詢")
      return
    }

    if (!cleanLastName) {
      alert("請輸入貴姓")
      return
    }

    if (!/^\d{3}$/.test(cleanPhoneLast3)) {
      alert("請輸入手機末 3 碼")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "lineConsult",
          vendorId: VENDOR_ID,
          vendorName: VENDOR_NAME,
          district,
          serviceType,
          lastName: cleanLastName,
          phoneLast3: cleanPhoneLast3,
          sourcePage: window.location.href,
        }),
      })

      const result = await res.json()

      if (!result.success) {
        alert(result.message || "送出失敗，請稍後再試")
        return
      }

      resetModal()
      window.open(LINE_ADD_URL, "_blank", "noopener,noreferrer")
    } catch (error) {
      alert("送出失敗，請稍後再試")
    } finally {
      setLoading(false)
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8">
      <div className="my-auto w-full max-w-sm rounded-2xl bg-white p-6 text-left shadow-xl">
        {modalStep === "district" && (
          <>
            <h3 className="text-center text-2xl font-black tracking-wide text-foreground">
              請選擇服務地區
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
              先選擇所在地區，方便我們判斷可協助的服務範圍。
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {DISTRICTS.map((item) => (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-base font-black transition-all ${
                    district === item
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="district-line-consult"
                    checked={district === item}
                    onChange={() => handleSelectDistrict(item)}
                    className="h-5 w-5"
                  />
                  {item}
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={resetModal}
              className="mt-6 w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
            >
              取消
            </button>
          </>
        )}

        {modalStep === "service" && (
          <>
            <h3 className="text-center text-2xl font-black tracking-wide text-foreground">
              需要哪一類服務？
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
              已選擇地區：{district}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {SERVICE_TYPES.map((item) => (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-base font-black transition-all ${
                    serviceType === item
                      ? item === "法律" || item === "補助"
                        ? "border-red-600 bg-red-100 text-red-700 shadow-md"
                        : "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="service-line-consult"
                    checked={serviceType === item}
                    onChange={() => handleSelectService(item)}
                    className="h-5 w-5"
                  />
                  {item}
                </label>
              ))}
            </div>

            {serviceBlocked && (
              <p className="mt-5 rounded-2xl border-2 border-red-500 bg-red-50 px-4 py-4 text-center text-base font-black text-red-700 shadow-sm">
                很抱歉，我們不提供此項諮詢
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalStep("district")
                  setServiceType("")
                  setServiceBlocked(false)
                }}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
              >
                上一步
              </button>

              <button
                type="button"
                onClick={resetModal}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
              >
                取消
              </button>
            </div>
          </>
        )}

        {modalStep === "form" && (
          <>
            <h3 className="text-xl font-black text-foreground">
              LINE 免費諮詢
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              地區：{district}｜服務：{serviceType}
              <br />
              請留下貴姓與手機末 3 碼，送出後會自動開啟 LINE 加好友。
            </p>

            <div className="mt-5">
              <label className="text-sm font-semibold text-foreground">
                貴姓
              </label>

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="例如：王"
                className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-foreground">
                手機末 3 碼
              </label>

              <input
                value={phoneLast3}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 3)
                  setPhoneLast3(value)
                }}
                placeholder="例如：168"
                inputMode="numeric"
                maxLength={3}
                className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalStep("service")
                  setLastName("")
                  setPhoneLast3("")
                }}
                disabled={loading}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground"
              >
                上一步
              </button>

              <button
                type="button"
                onClick={handleSubmitLineConsult}
                disabled={loading}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                {loading ? "送出中..." : "送出並加 LINE"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick?.()
          handleOpenModal()
        }}
        className={className}
      >
        {children}
      </button>

      {mounted && showModal && createPortal(modalContent, document.body)}
    </>
  )
}