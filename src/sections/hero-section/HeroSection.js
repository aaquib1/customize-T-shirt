"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/buttons/Button";
import TypingText from "@/components/typing-text/TypingText";
import HeroVisual from "@/components/hero/HeroVisual";
import Stats from "@/components/stats/Stats";
import { heroPhrases, heroStats } from "@/data/hero-content";

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = heroPhrases[activeIndex];

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full bg-sage-light px-4 py-1.5 text-sm font-medium text-sage-dark">
            Create your own
          </span>

          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-4xl">
            Make the most of our
            <br />
            <TypingText words={heroPhrases} onChangeIndex={setActiveIndex} />
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Design your own T-shirts, hoodies, and apparel online. Customize,
            preview, save, and order in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/customize" size="lg" icon>
              Customize Now
            </Button>
            <Button href="/#templates" variant="secondary" size="lg">
              Browse Templates
            </Button>
          </div>

          <div className="mt-12">
            <Stats items={heroStats} />
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HeroVisual active={active} />
        </motion.div>
      </div>
    </section>
  );
}
