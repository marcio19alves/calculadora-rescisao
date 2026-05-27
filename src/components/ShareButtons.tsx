"use client";

import { useCallback } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export default function ShareButtons({
  title,
  url,
  className = "",
}: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shareUrl);
      const el = e.currentTarget;
      const orig = el.innerHTML;
      el.innerHTML = "✅ Copiado!";
      el.classList.remove("bg-gray-500", "hover:bg-gray-600");
      el.classList.add("bg-green-600");
      setTimeout(() => {
        el.innerHTML = orig;
        el.classList.remove("bg-green-600");
        el.classList.add("bg-gray-500", "hover:bg-gray-600");
      }, 2000);
    } catch {
      alert("Não foi possível copiar. Copie manualmente: " + shareUrl);
    }
  }, [shareUrl]);

  const buttons = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`,
      icon: "📱",
      bg: "bg-green-500 hover:bg-green-600",
      aria: "Compartilhar no WhatsApp",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "📘",
      bg: "bg-blue-600 hover:bg-blue-700",
      aria: "Compartilhar no Facebook",
    },
    {
      name: "Twitter / X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: "🐦",
      bg: "bg-gray-800 hover:bg-gray-900",
      aria: "Compartilhar no Twitter / X",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "🔗",
      bg: "bg-blue-700 hover:bg-blue-800",
      aria: "Compartilhar no LinkedIn",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "✈️",
      bg: "bg-sky-500 hover:bg-sky-600",
      aria: "Compartilhar no Telegram",
    },
    {
      name: "Copiar Link",
      href: "#",
      icon: "📋",
      bg: "bg-gray-500 hover:bg-gray-600",
      aria: "Copiar link",
      copiar: true,
    },
  ];

  return (
    <div className={`${className}`}>
      <p className="text-sm font-medium text-gray-600 mb-2">
        📤 Compartilhe esta ferramenta
      </p>
      <div className="flex flex-wrap gap-2">
        {buttons.map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target={btn.href !== "#" ? "_blank" : undefined}
            rel={btn.href !== "#" ? "noopener noreferrer" : undefined}
            onClick={btn.copiar ? handleCopy : undefined}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white font-medium transition-all ${btn.bg}`}
            aria-label={btn.aria}
          >
            <span className="text-sm">{btn.icon}</span>
            <span className="hidden sm:inline">{btn.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
