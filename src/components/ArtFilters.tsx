"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

interface ArtFiltersProps {
    onFilterChange: (filters: { medium?: string; year?: string }) => void;
    availableMediums: string[];
    availableYears: string[];
}

export default function ArtFilters({ onFilterChange, availableMediums, availableYears }: ArtFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedium, setSelectedMedium] = useState<string | undefined>();
    const [selectedYear, setSelectedYear] = useState<string | undefined>();

    const handleMediumChange = (medium: string) => {
        const newMedium = selectedMedium === medium ? undefined : medium;
        setSelectedMedium(newMedium);
        onFilterChange({ medium: newMedium, year: selectedYear });
    };

    const handleYearChange = (year: string) => {
        const newYear = selectedYear === year ? undefined : year;
        setSelectedYear(newYear);
        onFilterChange({ medium: selectedMedium, year: newYear });
    };

    const clearFilters = () => {
        setSelectedMedium(undefined);
        setSelectedYear(undefined);
        onFilterChange({});
    };

    const activeFiltersCount = [selectedMedium, selectedYear].filter(Boolean).length;

    return (
        <>
            {/* Filter Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-32 right-10 z-40 p-4 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Filtros de galería"
            >
                <Filter size={20} className="text-white/60 group-hover:text-white transition-colors" />
                {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-emerald text-black text-xs font-black rounded-full flex items-center justify-center">
                        {activeFiltersCount}
                    </span>
                )}
            </motion.button>

            {/* Filter Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-32 right-28 z-40 w-80 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white font-serif text-xl font-bold">Filtros</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white transition-colors"
                                aria-label="Cerrar filtros"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Medium Filter */}
                        <div className="mb-6">
                            <label className="text-white/60 text-xs uppercase tracking-widest font-black mb-3 block">
                                Técnica
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableMediums.map((medium) => (
                                    <button
                                        key={medium}
                                        onClick={() => handleMediumChange(medium)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedMedium === medium
                                                ? "bg-accent-emerald text-black"
                                                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        {medium}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Year Filter */}
                        <div className="mb-6">
                            <label className="text-white/60 text-xs uppercase tracking-widest font-black mb-3 block">
                                Año
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableYears.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => handleYearChange(year)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedYear === year
                                                ? "bg-accent-emerald text-black"
                                                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-sm font-medium transition-all"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
