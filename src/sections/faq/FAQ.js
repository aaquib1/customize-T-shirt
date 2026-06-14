"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need design experience to use the studio?",
    answer:
      "No. The customizer is built for anyone — pick a garment, add your text or artwork, and the live preview shows exactly how it will look.",
  },
  {
    question: "Will my design be saved if I close the tab?",
    answer:
      "Yes. Selecting 'Save Draft' stores your design in your browser, so it's there when you come back to the customizer.",
  },
  {
    question: "What file types can I upload?",
    answer: "You can upload PNG and JPG images for your custom artwork.",
  },
  {
    question: "Can I order in bulk for my team or brand?",
    answer:
      "Yes — the Brand plan includes bulk pricing and shared brand assets for teams ordering at scale.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium text-ink md:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-muted md:text-base">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
