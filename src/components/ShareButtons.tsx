"use client";

import { useState } from "react";
import { formatEUR } from "@/lib/calculations";

interface ShareButtonsProps {
  careerName: string;
  netoMensual: number;
  shareUrl: string;
}

export default function ShareButtons({ careerName, netoMensual, shareUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const text = `Según esta calculadora, un/a ${careerName} en España gana ${formatEUR(
    netoMensual
  )} netos al mes. Calcula el tuyo:`;

  const links = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
      className: "bg-[#25D366] hover:bg-[#1ebc59]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.9 9.9 0 004.71 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.16 8.16 0 01-1.26-4.36c0-4.51 3.67-8.18 8.19-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 012.4 5.79c0 4.51-3.68 8.18-8.19 8.18z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      className: "bg-black hover:bg-neutral-800",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.6 22H1.5l8.1-9.3L1 2h7.2l4.9 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      className: "bg-[#0A66C2] hover:bg-[#0952a0]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.02 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.5c0-1.55-.03-3.55-2.16-3.55-2.17 0-2.5 1.7-2.5 3.44V23h-4.5V8.25z" />
        </svg>
      ),
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-text">Comparte tu resultado</p>
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition ${link.className}`}
            aria-label={`Compartir en ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-secondary transition hover:border-primary hover:text-primary cursor-pointer"
        >
          {copied ? "¡Copiado!" : "Copiar enlace"}
        </button>
      </div>
    </div>
  );
}
