"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, Globe } from "lucide-react";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "Portfolio", href: "#portfolio" },
        { name: "Exhibition", href: "#exhibition" },
        { name: "Studio", href: "#studio" },
        { name: "Manifesto", href: "#about" },
    ];

    return (
        <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-[1.2s] py-10 px-10 md:px-20 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
            }`}>
            <div className={`flex items-center justify-between transition-all duration-700 ${isScrolled ? "opacity-90 hover:opacity-100" : "opacity-100"
                }`}>
                {/* Editorial Logo */}
                <div className="flex items-center gap-8 group cursor-pointer" role="banner" aria-label="Logo KRO.Art">
                    <div className="w-14 h-14 rounded-full border border-white/10 p-0.5 overflow-hidden group-hover:rotate-[360deg] transition-transform duration-1000">
                        <Image src="/logo-kro.jpg" width={56} height={56} className="w-full h-full object-cover rounded-full" alt="Paula Lopez - KRO . ART" priority />
                    </div>
                    <div className="flex flex-col relative">
                        <span className="font-serif font-black text-3xl tracking-[-0.05em] text-white">
                            KRO.<span className="text-accent-emerald underline decoration-[0.5px] underline-offset-4">Art</span>
                        </span>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[9px] uppercase tracking-[1em] text-zinc-400 font-black">Paula Lopez Edition</span>
                            <div className="flex items-center gap-1.5 ml-1">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald"></span>
                                </span>
                                <span className="text-[6px] uppercase tracking-[0.2em] text-accent-emerald font-bold">Live</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Navigation */}
                <div className="hidden lg:flex items-center gap-20">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-black text-zinc-400 hover:text-white hover:tracking-[0.8em] transition-all duration-500 tracking-[0.6em] uppercase focus-visible:text-accent-emerald outline-none"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Minimalist Actions */}
                <div className="flex items-center gap-12">
                    <a
                        href="https://www.instagram.com/kro_lopezart?igsh=MXMyZjBlcmwxNDN3bA%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram de Paula Lopez"
                        className="hidden md:flex items-center gap-4 text-[8px] uppercase tracking-[0.4em] text-zinc-500 font-bold hover:text-accent transition-colors focus-visible:text-accent outline-none"
                    >
                        <Globe size={13} className="text-zinc-600 group-hover:text-accent" />
                        <span>IG / kro_lopezart</span>
                    </a>
                    <button className="relative p-2 group outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald/50 rounded-full" aria-label="Bolsa de compras">
                        <ShoppingBag size={36} className="text-zinc-200 group-hover:text-accent-emerald transition-colors" />
                        <span className="absolute top-1 right-1 w-3 h-3 bg-accent-emerald rounded-full scale-0 group-hover:scale-100 transition-transform shadow-[0_0_15px_rgba(101,235,164,0.7)]" />
                    </button>

                    <button
                        className="p-2 text-zinc-300 hover:text-white transition-colors lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu: Editorial Full-Screen Overlay */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={navLinks}
            />
            {/* Reading Progress Bar (Elite Polish) */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-accent-emerald z-[110]"
                style={{
                    width: typeof window !== "undefined" ? `${(lastScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` : "0%"
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
        </nav>
    );
}
