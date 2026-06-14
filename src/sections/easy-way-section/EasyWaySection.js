"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/buttons/Button";

export default function EasyWaySection() {
    return (
        <section className="overflow-hidden bg-[#F0F0F5] pt-10">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Left: illustration collage image */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative flex justify-center lg:justify-start"
                    >
                        {/* Replace src with your actual downloaded image path */}
                        <Image
                            src="/hero/banner-24.png"
                            alt="Colorful character illustrations with a t-shirt customizer UI"
                            width={640}
                            height={480}
                            className="w-full max-w-lg object-contain lg:max-w-full"
                            priority
                        />
                    </motion.div>

                    {/* Right: text + CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-start"
                    >
                        <h2 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl">
                            Free and easy way to
                            <br />
                            bring your ideas to life
                        </h2>

                        <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500">
                            Design and customize your own apparel in minutes. Upload your
                            artwork, pick your style, and get it printed — no experience
                            needed.
                        </p>

                        <div className="mt-8">
                            <Button href="/customize" size="lg">
                                Get Started
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}