"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface ImageDistortionProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    distortionIntensity?: number;
}

export default function ImageDistortion({
    src,
    alt,
    width = 800,
    height = 600,
    className = "",
    distortionIntensity = 20
}: ImageDistortionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const animationRef = useRef<number | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        const drawDistorted = () => {
            if (!isHovering.current) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Distortion effect based on mouse position
            const segments = 20;
            const segmentWidth = width / segments;
            const segmentHeight = height / segments;

            for (let y = 0; y < segments; y++) {
                for (let x = 0; x < segments; x++) {
                    const sx = x * segmentWidth;
                    const sy = y * segmentHeight;

                    // Calculate distance from mouse
                    const centerX = sx + segmentWidth / 2;
                    const centerY = sy + segmentHeight / 2;
                    const distance = Math.sqrt(
                        Math.pow(mousePos.current.x - centerX, 2) +
                        Math.pow(mousePos.current.y - centerY, 2)
                    );

                    // Apply distortion based on distance
                    const maxDistance = Math.sqrt(width * width + height * height);
                    const distortionFactor = Math.max(0, 1 - distance / maxDistance);
                    const offsetX = (mousePos.current.x - centerX) * distortionFactor * (distortionIntensity / 100);
                    const offsetY = (mousePos.current.y - centerY) * distortionFactor * (distortionIntensity / 100);

                    ctx.drawImage(
                        img,
                        sx, sy, segmentWidth, segmentHeight,
                        sx + offsetX, sy + offsetY, segmentWidth, segmentHeight
                    );
                }
            }

            animationRef.current = requestAnimationFrame(drawDistorted);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseEnter = () => {
            isHovering.current = true;
            drawDistorted();
        };

        const handleMouseLeave = () => {
            isHovering.current = false;
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
        };

        // Initial draw
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
        };

        if (img.complete) {
            ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseenter", handleMouseEnter);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseenter", handleMouseEnter);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [width, height, distortionIntensity]);

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            {/* Hidden image for canvas source */}
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="hidden"
            />
            {/* Canvas for distortion effect */}
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover cursor-pointer"
            />
        </div>
    );
}
