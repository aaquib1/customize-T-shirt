"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
    {
        id: 0,
        label: "Premium quality custom t-shirts",
        title: "Easy to create & customize",
        description:
            "Design your own t-shirt in minutes with our intuitive drag-and-drop editor. Upload artwork, pick colors, and preview before you order.",
    },
    {
        id: 1,
        label: "Thousands of free templates",
        title: "Start from a template",
        description:
            "Browse thousands of professionally designed templates across every category. Customize any template to make it uniquely yours.",
    },
    {
        id: 2,
        label: "Free standard shipping",
        title: "Delivered to your door",
        description:
            "Every order ships free with standard delivery. Express options available at checkout for when you need it fast.",
    },
];

export default function PrintingMadeEasy() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = features[activeIndex];

    return (
        <section className="overflow-hidden bg-[#F0F0F5] py-16 md:py-24">
            {/* Header */}
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="text-center">
                    <h2 className="font-display text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        T-shirt printing made easy.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
                        Design, preview, and order custom apparel online. No minimums, no
                        hassle — just great prints delivered to your door.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left: feature accordion */}
                    <div className="space-y-2">
                        {features.map((feature, i) => (
                            <div key={feature.id}>
                                {/* Feature trigger row */}
                                <button
                                    onClick={() => setActiveIndex(i)}
                                    className={`w-full text-left transition-colors duration-200 ${activeIndex === i
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <span
                                        className={`block text-base font-semibold py-3 ${activeIndex !== i ? "border-b border-gray-200" : ""
                                            }`}
                                    >
                                        {feature.label}
                                    </span>
                                </button>

                                {/* Expanded card */}
                                <AnimatePresence initial={false}>
                                    {activeIndex === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="rounded-2xl bg-white p-6 shadow-sm mt-1 mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {feature.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Divider below expanded card */}
                                {activeIndex === i && (
                                    <div className="border-b border-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: laptop / hero visual */}


                    {/* Laptop image — replace src with your downloaded asset */}
                    <div className="z-10 w-full max-w-lg mx-auto">
                        <Image
                            src="/hero/banner-25.png"
                            alt="T-shirt printing platform shown on a laptop screen"
                            width={620}
                            height={480}
                            className="w-full object-contain drop-shadow-none"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}