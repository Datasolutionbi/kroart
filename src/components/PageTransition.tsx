"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Magazine-style page flip effect
export function MagazinePageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{
                    opacity: 0,
                    rotateY: -15,
                    transformPerspective: 1000,
                }}
                animate={{
                    opacity: 1,
                    rotateY: 0,
                    transformPerspective: 1000,
                }}
                exit={{
                    opacity: 0,
                    rotateY: 15,
                    transformPerspective: 1000,
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Custom easing
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Curtain reveal effect
export function CurtainTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
