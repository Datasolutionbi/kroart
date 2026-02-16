"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useState } from "react";

export default function Scene3D() {
    // Lazy initialization: detecta WebGL una sola vez sin causar re-renders
    const [isWebGLSupported] = useState(() => {
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            return !!gl;
        } catch {
            return false;
        }
    });

    // Fallback atmospheric gradient if WebGL is not available
    if (!isWebGLSupported) {
        return (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#d4a1a6_0%,_transparent_70%)] animate-pulse" />
            </div>
        );
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                onCreated={({ gl }) => {
                    gl.setClearColor('black', 0);
                }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                dpr={isMobile ? [1, 1] : [1, 2]} // Force 1.0 DPR on mobile
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#65eba4" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#d4a1a6" />

                <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
                    <Sphere args={[1.2, isMobile ? 32 : 128, isMobile ? 32 : 128]} scale={2.5}>
                        <MeshDistortMaterial
                            color="#10b981"
                            speed={2.5}
                            distort={0.3}
                            radius={1}
                            roughness={0.1}
                            metalness={0.8}
                            emissive="#10b981"
                            emissiveIntensity={0.2}
                        />
                    </Sphere>
                </Float>

                {/* Post-processing: Human Error Effects (Disabled on mobile for performance) */}
                {!isMobile && (
                    <EffectComposer>
                        <Noise
                            opacity={0.15}
                            blendFunction={BlendFunction.OVERLAY}
                        />
                        <ChromaticAberration
                            offset={[0.002, 0.002]}
                            blendFunction={BlendFunction.NORMAL}
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
}
