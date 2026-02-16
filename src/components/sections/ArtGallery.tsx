"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Maximize2, ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Tilt from "react-parallax-tilt";
import SwipeGallery from "@/components/SwipeGallery";

interface Artwork {
    id: number | string;
    title: string;
    description: string;
    image: string;
    year: string;
    medium: string;
}

interface ArtGalleryProps {
    artworks: Artwork[];
}

// Memoized ArtworkCard component to prevent unnecessary re-renders
interface ArtworkCardProps {
    art: Artwork;
    index: number;
    onImageClick: (index: number) => void;
}

const ArtworkCard = memo(({ art, index, onImageClick }: ArtworkCardProps) => {
    const handleImageClick = useCallback(() => {
        onImageClick(index);
        if (navigator.vibrate) navigator.vibrate(10);
    }, [index, onImageClick]);

    return (
        <div className="content-spread grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative">
            <div className={`lg:col-span-8 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                <Magnetic>
                    <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1000}
                        scale={1.02}
                        transitionSpeed={1500}
                        gyroscope={false} // Disabled gyroscope on mobile for performance
                        tiltEnable={typeof window !== 'undefined' && window.innerWidth > 768} // Disable tilt on mobile
                    >
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="magazine-mask group cursor-crosshair relative noise-overlay"
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.img
                                onClick={handleImageClick}
                                src={art.image}
                                alt={art.title}
                                className="w-full aspect-[16/10] object-cover"
                                loading="lazy"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center lg:hidden opacity-0 active:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                <span className="text-[10px] uppercase tracking-widest text-white font-black bg-black/60 px-3 py-1 rounded-full">
                                    Tap to View
                                </span>
                            </div>
                        </motion.div>
                        <div className="absolute bottom-10 left-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 hidden lg:block">
                            <button className="p-5 rounded-full framer-glass hover:bg-accent-emerald hover:text-black transition-colors focus-visible:ring-2 focus-visible:ring-accent-emerald/50 outline-none" aria-label={`Ampliar imagen: ${art.title}`}>
                                <Maximize2 size={18} />
                            </button>
                        </div>
                    </Tilt>
                </Magnetic>
            </div>

            <div className={`lg:col-span-4 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"} space-y-16`}>
                <div className="space-y-4">
                    <span className="artence-cap">{art.year} / {art.medium}</span>
                    <h2 className="artence-title !text-4xl lg:!text-[4.5rem] text-white tracking-tighter flex flex-wrap gap-x-4 [text-wrap:balance]">
                        {typeof window !== 'undefined' && window.innerWidth < 768 ? (
                            // Mobile: Simple word reveal
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                {art.title}
                            </motion.span>
                        ) : (
                            // Desktop: Character reveal
                            art.title.split(" ").map((word, wordIdx) => (
                                <span key={wordIdx} className={`inline-block ${wordIdx === art.title.split(" ").length - 1 ? "pr-6" : ""}`}>
                                    {word.split("").map((char, charIdx) => (
                                        <motion.span
                                            key={charIdx}
                                            initial={{ y: "100%", opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: charIdx * 0.03 + wordIdx * 0.1
                                            }}
                                            viewport={{ once: true }}
                                            className={`inline-block ${wordIdx === art.title.split(" ").length - 1 ? "italic text-accent-emerald" : ""}`}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))
                        )}
                    </h2>
                </div>

                <p className="font-serif italic text-3xl text-zinc-500 font-light leading-snug">
                    {art.description}
                </p>

                <div className="pt-10 flex items-center gap-12">
                    <button className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors" aria-label="Compartir obra">
                        <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-xs uppercase tracking-widest font-mono">Share</span>
                    </button>
                    <button className="group flex items-center gap-4 text-accent-emerald hover:text-accent-emerald/80 transition-colors" aria-label="Ver detalles">
                        <span className="text-xs uppercase tracking-widest font-mono font-bold">View Details</span>
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
});

ArtworkCard.displayName = 'ArtworkCard';

export default function ArtGallery({ artworks }: ArtGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleImageClick = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    return (
        <>
            <section id="portfolio" className="relative z-10 py-32 space-y-[20vh] scroll-snap-align-start">
                {artworks.map((art, i) => (
                    <ArtworkCard
                        key={art.id}
                        art={art}
                        index={i}
                        onImageClick={handleImageClick}
                    />
                ))}
            </section>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <SwipeGallery
                        artworks={artworks}
                        initialIndex={selectedIndex}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
