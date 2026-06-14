"use client";

import { AnimatePresence, motion } from "framer-motion";
import ShirtMockup, { getPrintArea } from "@/components/mockup/ShirtMockup";
import { heroBadges } from "@/data/hero-content";

export default function HeroVisual({ active }) {
  const printArea = getPrintArea(active.product);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-lg">
      {/* Ambient blobs */}
      <div className="absolute -right-10 top-6 h-64 w-64 rounded-full bg-lilac/50 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-6 bottom-10 h-48 w-48 rounded-full bg-sage/15 blur-3xl" aria-hidden="true" />

      {/* Mockup card */}
      <div className="relative grid h-full place-items-center rounded-[2rem] border border-line bg-paper shadow-premium">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.product + active.text}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative h-[78%] w-[78%]"
          >
            <ShirtMockup product={active.product} color={active.color} className="h-full w-full" />

            {active.graphic && (
              <svg
                viewBox="0 0 400 480"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <g opacity="0.9">
                  <circle
                    cx={printArea.x + printArea.width / 2}
                    cy={printArea.y + printArea.height * 0.32}
                    r="26"
                    fill="#F2A36B"
                  />
                  <rect
                    x={printArea.x + printArea.width / 2 - 36}
                    y={printArea.y + printArea.height * 0.5}
                    width="72"
                    height="10"
                    rx="5"
                    fill="#CFC6F2"
                  />
                  <rect
                    x={printArea.x + printArea.width / 2 - 24}
                    y={printArea.y + printArea.height * 0.6}
                    width="48"
                    height="8"
                    rx="4"
                    fill="#FAF6EF"
                    opacity="0.7"
                  />
                </g>
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-10 rounded-2xl border border-line bg-paper px-4 py-3 shadow-card md:-left-8"
      >
        <p className="font-display text-sm font-semibold text-ink">{heroBadges[0].label}</p>
        <p className="text-xs text-muted">{heroBadges[0].sub}</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-0 top-1/3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-card md:-right-6"
      >
        <p className="font-display text-sm font-semibold text-ink">{heroBadges[1].label}</p>
        <p className="text-xs text-muted">{heroBadges[1].sub}</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-line bg-paper px-4 py-3 shadow-card"
      >
        <p className="font-display text-sm font-semibold text-ink">{heroBadges[2].label}</p>
        <p className="text-xs text-muted">{heroBadges[2].sub}</p>
      </motion.div>
    </div>
  );
}
