"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    const opacity = useTransform(scrollXProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

    return (
        <section className="py-32 px-10 relative overflow-hidden">
            <div className="content-spread mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="artence-title !text-6xl text-white mb-4"
                >
                    Timeline
                </motion.h2>
                <p className="text-zinc-500 text-sm uppercase tracking-widest">
                    Scroll horizontal para explorar →
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex gap-12 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent-emerald/20"
                style={{ scrollbarWidth: 'thin' }}
            >
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ delay: i * 0.1 }}
                        className="min-w-[400px] snap-start group"
                    >
                        {/* Year Badge */}
                        <div className="mb-6">
                            <span className="inline-block px-6 py-2 bg-accent-emerald/10 border border-accent-emerald/20 rounded-full text-accent-emerald text-xs font-black tracking-widest">
                                {item.year}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-[300px] mb-6 overflow-hidden rounded-2xl">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        {/* Content */}
                        <h3 className="text-white text-2xl font-serif font-bold mb-3">
                            {item.title}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Progress Indicator */}
            <motion.div
                className="mt-8 h-1 bg-white/5 rounded-full overflow-hidden"
                style={{ opacity }}
            >
                <motion.div
                    className="h-full bg-accent-emerald"
                    style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
                />
            </motion.div>
        </section>
    );
}
