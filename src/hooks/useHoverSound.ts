"use client";

import { useRef, useCallback } from "react";

interface UseHoverSoundOptions {
    volume?: number;
    enabled?: boolean;
}

export function useHoverSound(soundUrl: string, options: UseHoverSoundOptions = {}) {
    const { volume = 0.2, enabled = true } = options;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Inicializar audio lazy
    const initAudio = useCallback(() => {
        if (!audioRef.current && enabled) {
            audioRef.current = new Audio(soundUrl);
            audioRef.current.volume = volume;
        }
    }, [soundUrl, volume, enabled]);

    const playSound = useCallback(() => {
        if (!enabled) return;

        initAudio();

        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset para permitir múltiples plays rápidos
            audioRef.current.play().catch(() => {
                // Silenciar errores de autoplay (requiere interacción del usuario)
            });
        }
    }, [enabled, initAudio]);

    return { playSound };
}

// Preset de sonidos comunes
export const SOUND_PRESETS = {
    hover: "/sounds/hover.mp3",
    click: "/sounds/click.mp3",
    swipe: "/sounds/swipe.mp3",
    transition: "/sounds/transition.mp3",
};
