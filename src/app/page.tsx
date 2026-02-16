"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import EditorialLoader from "@/components/sections/EditorialLoader";
import HeroSection from "@/components/sections/HeroSection";
import ArtGallery from "@/components/sections/ArtGallery";
import Manifesto from "@/components/sections/Manifesto";
import Footer from "@/components/sections/Footer";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-primary/10 animate-pulse" />
});

const Timeline = dynamic(() => import("@/components/Timeline"), {
  ssr: false,
});


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant minimum loading time to ensure smooth entrance
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const timelineItems = [
    {
      year: "2024",
      title: "The Dance",
      description: "Koi fish dancing on water, symbolizing courage and transformation.",
      image: "/images/koi.png"
    },
    {
      year: "2024",
      title: "Majestic",
      description: "Silent wisdom embodied in the majestic elephant.",
      image: "/images/elephant.png"
    },
    {
      year: "2024",
      title: "The Spirit",
      description: "Raw energy and strength of the bull spirit.",
      image: "/images/toro.png"
    }
  ];

  const galleryArtworks = [
    {
      id: "danza",
      title: "The Dance",
      sub: "Danza sobre el Agua",
      meta: "Masterpiece / No. 001",
      description: "In dance on the water, they hold stories of courage, transformation, and hope. A digital revelation of the soul.",
      image: "/images/koi.png",
      accent: "oklch(0.7 0.12 10)",
      medium: "Digital Art",
      year: "2024"
    },
    {
      id: "elefante",
      title: "Majestic",
      sub: "Silent Wisdom",
      meta: "Wisdom Series / No. 002",
      description: "The majestic elephant embodies rectitude, reason, and temperance. Silence is the highest form of power.",
      image: "/images/elephant.png",
      accent: "oklch(0.7 0.12 10)",
      medium: "Digital Art",
      year: "2024"
    },
    {
      id: "toro",
      title: "The Spirit",
      sub: "Toro Bravo",
      meta: "Raw Energy / No. 003",
      description: "Strength, focus, and raw energy emerging from the heart of the earth. The bull never looks back.",
      image: "/images/toro.png",
      accent: "oklch(0.7 0.12 10)",
      medium: "Digital Art",
      year: "2024"
    }
  ];

  return (
    <main className="relative bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <EditorialLoader />}
      </AnimatePresence>

      <Scene3D />

      <HeroSection />
      <ArtGallery artworks={galleryArtworks} />
      <Timeline items={timelineItems} />
      <Manifesto />
      <Footer />
    </main>
  );
}
