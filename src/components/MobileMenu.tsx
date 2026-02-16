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
                    className="fixed inset-0 z-[150] bg-primary flex flex-col items-center justify-center p-20 lg:hidden touch-none"
                >
                    <div className="absolute top-8 left-8 text-white/20 text-[8px] font-mono uppercase tracking-[0.4em] animate-pulse lg:hidden">
                        &larr; Drag to close
                    </div>
                    <button
                        className="absolute top-8 right-8 p-3 text-zinc-500 hover:text-white transition-colors"
                        onClick={onClose}
                        aria-label="Cerrar menú"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    <div className="flex flex-col gap-10 text-center w-full">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                onClick={onClose}
                                className="artence-title !text-4xl md:!text-6xl hover:text-accent-emerald transition-colors tracking-tighter"
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
