"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ShareBarProps = {
  /** "light" 給白底網站用；"dark" 是原本的深色版面 */
  variant?: "light" | "dark";
  /** 聯絡按鈕要導去的路徑，預設 /contact */
  contactHref?: string;
};

export function ShareBar({
  variant = "light",
  contactHref = "/contact",
}: ShareBarProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const isDark = variant === "dark";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // 站內導頁改用 router.push，走 Next.js client-side transition
  // 而不是 window.location.href 整頁重新載入，切換更快也不會閃白
  const handleContact = () => {
    router.push(contactHref);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div
        className={`flex items-center gap-1 rounded-full border px-2 py-2 shadow-2xl backdrop-blur md:gap-2 md:px-4 md:py-3 ${
          isDark
            ? "border-white/10 bg-black/80 text-white"
            : "border-black/5 bg-white/95 text-gray-900 shadow-black/10"
        }`}
      >
        {/* label */}
        <span
          className={`hidden whitespace-nowrap pr-1 text-xs font-bold md:block ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          分享
        </span>

        {/* FB */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 Facebook"
          className="whitespace-nowrap rounded-full bg-blue-600 px-2 py-2 text-[11px] font-bold text-white transition hover:opacity-90 md:px-4 md:text-xs"
        >
          FB
        </a>

        {/* LINE */}
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 LINE"
          className="whitespace-nowrap rounded-full bg-green-500 px-2 py-2 text-[11px] font-bold text-white transition hover:opacity-90 md:px-4 md:text-xs"
        >
          LINE
        </a>

        {/* COPY */}
        <button
          onClick={handleCopy}
          disabled={!url}
          aria-label="複製連結"
          className={`whitespace-nowrap rounded-full px-2 py-2 text-[11px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:text-xs ${
            isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {copied ? "已複製！" : "COPY"}
        </button>

        <div
          className={`mx-1 h-5 w-px ${
            isDark ? "bg-white/20" : "bg-gray-200"
          }`}
        />

        {/* CONTACT */}
        <button
          onClick={handleContact}
          className="whitespace-nowrap rounded-full bg-[#ff8800] px-2 py-2 text-[11px] font-black text-black transition hover:scale-105 md:px-4 md:text-xs"
        >
          聯絡我 →
        </button>
      </div>
    </div>
  );
}