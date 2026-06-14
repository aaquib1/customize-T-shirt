"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Add your shirt design",
    description:
      "Choose from our library or upload your own artwork. Position it exactly where you want on a live preview of your garment.",
    image: "/hero/banner-21.jpg",
    imageSide: "left",
    imageBg: "bg-[#E6F5EE]",
  },
  {
    number: 2,
    title: "Custom artwork & review",
    description:
      "Tweak colors, resize artwork, and review every detail before you commit. Our editor makes it simple to get it just right.",
    image: "/hero/banner-22.jpg",
    imageSide: "right",
    imageBg: "bg-[#EDE9F8]",
  },
  {
    number: 3,
    title: "Enjoy your product",
    description:
      "We print, pack, and ship your order with free standard delivery. Your custom gear arrives ready to wear.",
    image: "/hero/banner-23.jpg",
    imageSide: "left",
    imageBg: "bg-[#FBE9E7]",
  },
];

function NumberCircle({ number, hovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative z-10 flex h-12 w-12 flex-shrink-0 cursor-default items-center justify-center rounded-full border-2 bg-white text-base font-semibold transition-all duration-300 ${hovered
        ? "border-[#3DBA8C] bg-[#3DBA8C] text-white"
        : "border-gray-200 text-gray-700"
        }`}
    >
      {number}
    </div>
  );
}

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How to create custom shirts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Design and order your custom apparel in three simple steps — no
            design experience required.
          </p>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:block">
          {/* Three-column grid: content | timeline | content */}
          <div className="grid grid-cols-[1fr_80px_1fr]">

            {/* ── LEFT COLUMN (images for steps 1 & 3, text for step 2) ── */}
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`flex items-center pr-12 ${i === 1 ? "justify-start" : "justify-end"}`}
                  style={{ minHeight: i === 1 ? "260px" : "340px" }}
                >
                  {step.imageSide === "left" ? (
                    /* Image block */
                    <div
                      className={`relative w-full max-w-[380px] rounded-2xl ${step.imageBg} overflow-hidden`}
                      style={{ aspectRatio: "4/3" }}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain p-6"
                      />
                    </div>
                  ) : (
                    /* Text block */
                    <div className="flex flex-col justify-center">
                      <h3 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── CENTER COLUMN: continuous dashed line + circles ── */}
            <div className="relative flex flex-col items-center">
              {/* Full-height dashed line behind everything */}
              <div
                className="absolute left-1/2 top-0 h-full -translate-x-1/2 border-l-2 border-dashed border-gray-200"
                aria-hidden="true"
              />

              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative z-10 flex items-center justify-center"
                  style={{
                    height: i === 1 ? "260px" : "340px",
                  }}
                >
                  <NumberCircle
                    number={step.number}
                    hovered={hoveredIndex === i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </div>
              ))}
            </div>

            {/* ── RIGHT COLUMN (text for steps 1 & 3, image for step 2) ── */}
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="flex items-center pl-12"
                  style={{ minHeight: i === 1 ? "260px" : "340px" }}
                >
                  {step.imageSide === "right" ? (
                    /* Image block */
                    <div
                      className={`relative w-full max-w-[380px] rounded-2xl ${step.imageBg} overflow-hidden`}
                      style={{ aspectRatio: "4/3" }}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain p-6"
                      />
                    </div>
                  ) : (
                    /* Text block */
                    <div className="flex flex-col justify-center">
                      <h3 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="flex flex-col gap-10 lg:hidden">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <NumberCircle
                  number={step.number}
                  hovered={hoveredIndex === i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {i < steps.length - 1 && (
                  <div className="mt-2 flex-1 border-l-2 border-dashed border-gray-200" />
                )}
              </div>

              {/* Right: text then image */}
              <div className="flex flex-1 flex-col gap-5 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
                <div
                  className={`relative w-full rounded-2xl ${step.imageBg} overflow-hidden`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain p-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}