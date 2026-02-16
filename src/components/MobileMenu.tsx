"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x > 100 || velocity.x > 500) {
                            onClose();
                        }
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="fixed inset-0 z-[150] bg-primary/95 backdrop-blur-[50px] flex flex-col items-center justify-center p-20 lg:hidden touch-none"
                >
                    <div className="absolute top-10 left-10 text-white/30 text-xs font-mono uppercase tracking-widest animate-pulse lg:hidden">
                        &larr; Drag to close
                    </div>
                    <button
                        className="absolute top-10 right-10 p-4 text-zinc-400 hover:text-white transition-colors"
                        onClick={onClose}
                        aria-label="Cerrar menú"
                    >
                        <X size={40} strokeWidth={1} />
                    </button>

                    <div className="flex flex-col gap-12 text-center w-full">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                onClick={onClose}
                                className="artence-title !text-6xl md:!text-8xl hover:text-accent-emerald transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    <div className="absolute bottom-20 flex flex-col items-center gap-8">
                        <span className="text-[8px] uppercase tracking-[1em] text-zinc-700 font-bold">Follow the error</span>
                        <div className="w-20 h-[1px] bg-zinc-800" />
                        <a href="https://www.instagram.com/kro_lopezart?igsh=MXMyZjBlcmwxNDN3bA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-500 hover:text-white transition-colors">INSTAGRAM / @KRO_LOPEZART</a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
