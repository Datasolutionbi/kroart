"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FluidSimulationProps {
    className?: string;
    intensity?: number;
    colorScheme?: "emerald" | "purple" | "blue";
}

// Particle class outside component
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number, intensity: number, colors: string[]) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * intensity;
        this.vy = (Math.random() - 0.5) * intensity;
        this.radius = Math.random() * 100 + 50;
        const colorIndex = Math.floor(Math.random() * colors.length);
        this.color = colors[colorIndex] + (Math.random() * 0.3 + 0.1) + ")";
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }
}

export default function FluidSimulation({
    className = "",
    intensity = 0.5,
    colorScheme = "emerald"
}: FluidSimulationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Color schemes
        const colors = {
            emerald: ["rgba(16, 185, 129, ", "rgba(5, 150, 105, ", "rgba(4, 120, 87, "],
            purple: ["rgba(168, 85, 247, ", "rgba(147, 51, 234, ", "rgba(126, 34, 206, "],
            blue: ["rgba(59, 130, 246, ", "rgba(37, 99, 235, ", "rgba(29, 78, 216, "],
        };

        const selectedColors = colors[colorScheme];

        // Create particles
        const particles: Particle[] = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 50000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height, intensity, selectedColors));
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw(ctx);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [intensity, colorScheme, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none opacity-30 ${className}`}
            style={{ filter: "blur(40px)" }}
        />
    );
}
