"use client";

import { motion } from "framer-motion";

export default function EditorialLoader() {
    return (
        <motion.div
            key="loader"
            className="fixed inset-0 z-[1000] bg-primary flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
        >
            <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="artence-title !text-5xl lg:!text-7xl text-white tracking-widest uppercase"
            >
                KRO.<span className="text-accent-emerald italic">Art</span>
            </motion.h4>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-accent-emerald/30"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-[8px] uppercase tracking-[0.8em] text-zinc-500 font-black"
            >
                Curating Human Error / 2025
            </motion.span>
        </motion.div>
    );
}
