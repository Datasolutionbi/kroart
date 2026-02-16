"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const glowConfig = { damping: 60, stiffness: 80 }; // Even softer, slower lag for atmospheric feel
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const glowX = useSpring(mouseX, glowConfig);
    const glowY = useSpring(mouseY, glowConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isInteractive = target.closest("button, a, .group");
            setIsHovering(!!isInteractive);

            if (target.closest(".magazine-mask")) {
                setCursorText("VIEW");
            } else {
                setCursorText("");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
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
