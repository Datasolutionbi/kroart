"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function HeroSection() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden scroll-snap-align-start">
            <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: "circOut" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/20 to-primary z-10" />
                <Image
                    src="/images/koi.png"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover grayscale brightness-50 opacity-40"
                    alt="Obra de arte de fondo - KRO.Art"
                    priority
                />
            </motion.div>

            <div className="relative z-20 text-center space-y-12 md:space-y-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="artence-cap text-[8px] md:text-[10px]">Elite Digital Magazine / 2025</span>
                    <h1 className="artence-title text-white flex flex-col overflow-hidden [text-wrap:balance]">
                        <div className="relative inline-block pb-2 md:pb-4">
                            {typeof window !== 'undefined' && window.innerWidth < 768 ? (
                                // Mobile: Animate words instead of characters for performance
                                "KRO . ART".split(" ").map((word, wi) => (
                                    <div key={wi} className="inline-block">
                                        {word.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ y: "100%", opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 1,
                                                    ease: [0.16, 1, 0.3, 1],
                                                    delay: (wi * 4 + i) * 0.04
                                                }}
                                                className="inline-block whitespace-pre text-5xl sm:text-7xl"
                                            >
                                                {char === "." ? (
                                                    <span className="text-accent-emerald">{char}</span>
                                                ) : (
                                                    char
                                                )}
                                            </motion.span>
                                        ))}
                                        {wi === 0 && <span className="inline-block text-5xl sm:text-7xl">&nbsp;</span>}
                                    </div>
                                ))
                            ) : (
                                // Desktop: High-quality character animation
                                "KRO . ART".split(" ").map((word, wi) => (
                                    <div key={wi} className="inline-block">
                                        {word.split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ y: "110%", opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 1,
                                                    ease: [0.16, 1, 0.3, 1],
                                                    delay: (wi * 4 + i) * 0.05
                                                }}
                                                className="inline-block whitespace-pre text-5xl sm:text-7xl md:text-9xl"
                                            >
                                                {char === "." ? (
                                                    <span className="italic text-accent-emerald">{char}</span>
                                                ) : (
                                                    char
                                                )}
                                            </motion.span>
                                        ))}
                                        {wi === 0 && <span className="inline-block text-5xl sm:text-7xl md:text-9xl">&nbsp;</span>}
                                    </div>
                                ))
                            )}
                        </div>
                    </h1>
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: "100%", opacity: 0, letterSpacing: "1.5em" }}
                            animate={{ y: 0, opacity: 0.6, letterSpacing: "0.2em" }}
                            transition={{ delay: 1.2, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="artence-subtitle !text-zinc-400 !text-lg md:!text-2xl uppercase font-black"
                        >
                            Paula Lopez
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="flex flex-col items-center gap-6 md:gap-10 mt-6 md:mt-0"
                >
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-white/5 p-1 backdrop-blur-3xl overflow-hidden group relative">
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
                            width={160}
                            height={160}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
                            alt="Retrato de Paula Lopez - Editora"
                            priority
                        />
                    </div>
                    <Magnetic>
                        <button className="framer-btn group border-accent-emerald/10 hover:border-accent-emerald/30 scale-90 md:scale-100 overflow-hidden focus-visible:ring-2 focus-visible:ring-accent-emerald/50 active:scale-95 transition-transform" aria-label="Explorar la edición actual">
                            <div className="absolute inset-0 bg-accent-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="relative z-10 flex items-center gap-3 md:gap-4 group-hover:text-accent-emerald transition-colors duration-500 text-xs md:text-sm">
                                Explore Edition <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-accent-emerald" />
                            </span>
                        </button>
                    </Magnetic>
                </motion.div>
            </div>

            <div className="absolute left-10 bottom-10 space-y-2 hidden lg:block">
                <span className="text-[7px] uppercase tracking-[0.6em] text-zinc-800 font-bold block">Scroll To Navigate / 2025</span>
                <div className="w-40 h-[0.5px] bg-white/5" />
            </div>
        </section>
    );
}
