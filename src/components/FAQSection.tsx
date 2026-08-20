"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faq";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="overflow-hidden rounded-xl border border-border bg-surface">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-5 w-5 flex-shrink-0 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && <p className="px-4 pb-4 text-sm leading-relaxed text-text-muted">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
