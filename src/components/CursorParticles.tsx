"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
}

export default function CursorParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        let particleId = 0;

        const handleMouseMove = (e: MouseEvent) => {

            // Crear partícula cada 50ms (throttled)
            const newParticle: Particle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
            };

            setParticles((prev) => [...prev.slice(-10), newParticle]); // Mantener solo últimas 10
        };

        // Throttle para performance
        let lastTime = 0;
        const throttledHandler = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastTime > 80) { // Slightly slower generation for elite performance
                handleMouseMove(e);
                lastTime = now;
            }
        };

        window.addEventListener("mousemove", throttledHandler, { passive: true });
        return () => window.removeEventListener("mousemove", throttledHandler);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9997] hidden lg:block overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{ opacity: 0.4, scale: 1, x: particle.x, y: particle.y }}
                    animate={{ opacity: 0, scale: 0, x: particle.x + (Math.random() - 0.5) * 40, y: particle.y + (Math.random() - 0.5) * 40 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-1 h-1 bg-accent-emerald/30 rounded-full"
                    style={{ left: -2, top: -2, willChange: "transform" }}
                />
            ))}
        </div>
    );
}
