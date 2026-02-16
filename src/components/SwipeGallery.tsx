"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Artwork {
    id: number | string;
    title: string;
    description: string;
    image: string;
    year: string;
    medium: string;
}

interface SwipeGalleryProps {
    artworks: Artwork[];
    initialIndex?: number;
    onClose: () => void;
}

export default function SwipeGallery({ artworks, initialIndex = 0, onClose }: SwipeGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [[page, direction], setPage] = useState([initialIndex, 0]);

    const paginate = (newDirection: number) => {
        const newIndex = currentIndex + newDirection;
        if (newIndex >= 0 && newIndex < artworks.length) {
            setCurrentIndex(newIndex);
            setPage([newIndex, newDirection]);

            // Vibración háptica al cambiar
            if (navigator.vibrate) {
                navigator.vibrate(5);
            }
        }
    };

    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = Math.abs(offset.x) * velocity.x;

        if (swipe < -10000) {
            paginate(1); // Swipe left → next
        } else if (swipe > 10000) {
            paginate(-1); // Swipe right → prev
        }
    };

    const currentArt = artworks[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 lg:backdrop-blur-xl flex flex-col"
        >
            {/* Header */}
            <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-6">
                <span className="text-white/50 text-xs font-mono">
                    {currentIndex + 1} / {artworks.length}
                </span>
                <button
                    onClick={onClose}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                    aria-label="Cerrar galería"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Swipe Area */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 flex items-center justify-center p-6"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={currentArt.image}
                                alt={currentArt.title}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority={currentIndex === 0}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows (Desktop) */}
                {currentIndex > 0 && (
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors hidden lg:block"
                        aria-label="Obra anterior"
                    >
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                )}
                {currentIndex < artworks.length - 1 && (
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors hidden lg:block"
                        aria-label="Siguiente obra"
                    >
                        <ChevronRight size={24} className="text-white" />
                    </button>
                )}
            </div>

            {/* Info Footer */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-2xl font-serif font-bold mb-2">{currentArt.title}</h3>
                <p className="text-white/60 text-sm">{currentArt.year} / {currentArt.medium}</p>
            </div>

            {/* Swipe Hint (Mobile) */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono uppercase tracking-widest lg:hidden animate-pulse">
                ← Swipe →
            </div>
        </motion.div>
    );
}
