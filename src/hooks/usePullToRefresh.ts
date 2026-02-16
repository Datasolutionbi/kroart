"use client";

import { useEffect, useState, useCallback } from "react";

interface UsePullToRefreshOptions {
    onRefresh: () => Promise<void> | void;
    threshold?: number; // px para activar refresh
    enabled?: boolean;
}

export function usePullToRefresh({ onRefresh, threshold = 80, enabled = true }: UsePullToRefreshOptions) {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [startY, setStartY] = useState(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (!enabled || window.scrollY > 0) return;
        setStartY(e.touches[0].clientY);
    }, [enabled]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!enabled || window.scrollY > 0 || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = Math.max(0, currentY - startY);

        if (distance > 0) {
            setPullDistance(Math.min(distance, threshold * 1.5));
        }
    }, [enabled, startY, threshold, isRefreshing]);

    const handleTouchEnd = useCallback(async () => {
        if (!enabled || isRefreshing) return;

        if (pullDistance >= threshold) {
            setIsRefreshing(true);

            // Vibración háptica
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }

            await onRefresh();

            setIsRefreshing(false);
        }

        setPullDistance(0);
    }, [enabled, pullDistance, threshold, onRefresh, isRefreshing]);

    useEffect(() => {
        if (!enabled) return;

        document.addEventListener("touchstart", handleTouchStart, { passive: true });
        document.addEventListener("touchmove", handleTouchMove, { passive: true });
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

    return {
        pullDistance,
        isRefreshing,
        isActive: pullDistance > 0,
        progress: Math.min(pullDistance / threshold, 1),
    };
}
