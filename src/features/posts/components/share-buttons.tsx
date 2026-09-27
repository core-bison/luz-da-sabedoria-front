"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${title} — ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={copyLink} className={buttonClasses({ variant: "secondary", size: "sm" })}>
        {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
        <span aria-live="polite">{copied ? "Link copiado" : "Copiar link"}</span>
      </button>
      <button type="button" onClick={shareOnWhatsApp} className={buttonClasses({ variant: "secondary", size: "sm" })}>
        <MessageCircle aria-hidden />
        WhatsApp
      </button>
    </div>
  );
}
