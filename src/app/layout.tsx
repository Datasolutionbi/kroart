import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import CursorParticles from "@/components/CursorParticles";

import FluidSimulation from "@/components/FluidSimulation";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  metadataBase: new URL("https://kro.art"),
  title: "KRO.Art | Paula Lopez Edition",
  description: "Explora el universo artístico de Paula Lopez. Una experiencia inmersiva en el arte del error y la estética de alta fidelidad.",
  keywords: ["Paula Lopez", "KRO.Art", "Art Gallery", "Digital Art", "Antonio García Villarán", "Contemporary Art"],
  authors: [{ name: "Paula Lopez" }],
  openGraph: {
    title: "KRO.Art | Paula Lopez Edition",
    description: "Una experiencia inmersiva en el arte contemporáneo de Paula Lopez.",
    url: "https://kro.art",
    siteName: "KRO.Art",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KRO.Art - Paula Lopez Edition",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRO.Art | Paula Lopez Edition",
    description: "Explora el universo artístico de Paula Lopez.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/logo-kro.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Paula Lopez",
  "url": "https://kro.art",
  "image": "https://kro.art/logo-kro.jpg",
  "sameAs": [
    "https://www.instagram.com/kro_lopezart"
  ],
  "jobTitle": "Editor & Artist",
  "worksFor": {
    "@type": "Organization",
    "name": "KRO.Art"
  },
  "description": "Editora jefe y artista principal de la edición digital KRO.Art."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                 document.documentElement.classList.add('is-touch');
               }
             `
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-zinc-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FluidSimulation colorScheme="neutral" intensity={0.25} />
          <SmoothScroll>
            <div className="hidden [.is-touch_&]:hidden md:block">
              <CustomCursor />
              <CursorParticles />
            </div>
            <Navbar />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
