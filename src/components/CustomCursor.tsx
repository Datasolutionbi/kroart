"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 450, mass: 0.5 }; // High frequency, fast response
    const glowConfig = { damping: 50, stiffness: 30, mass: 1 }; // Soft cinematic lag
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const glowX = useSpring(mouseX, glowConfig);
    const glowY = useSpring(mouseY, glowConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        let lastHoverCheck = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Immediate position update
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Throttled interactive check (Performance optimization)
            const now = Date.now();
            if (now - lastHoverCheck > 100) {
                const target = e.target as HTMLElement;
                const isInteractive = target.closest("button, a, .group, [role='button']");
                setIsHovering(!!isInteractive);

                if (target.closest(".magazine-mask")) {
                    setCursorText("VIEW");
                } else {
                    setCursorText("");
                }
                lastHoverCheck = now;
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Lens Glow Layer */}
            <motion.div
                className="absolute w-[600px] h-[600px] bg-accent-emerald/[0.03] rounded-full blur-[120px]"
                style={{
                    x: glowX,
                    y: glowY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            <motion.div
                className="absolute w-4 h-4 bg-accent-emerald rounded-full mix-blend-difference flex items-center justify-center overflow-hidden"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 4 : 1,
                }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[3px] font-black tracking-widest text-black"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>
            <motion.div
                className="absolute w-12 h-12 border border-accent-emerald/20 rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
            />
        </div>
    );
}
