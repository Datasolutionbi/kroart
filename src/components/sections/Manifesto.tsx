"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
    return (
        <section id="about" className="py-32 px-10 relative overflow-hidden scroll-snap-align-start">
            <div className="content-spread text-center space-y-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="relative"
                >
                    <h3 className="artence-title !text-4xl lg:!text-6xl text-white max-w-5xl mx-auto leading-tight flex flex-wrap justify-center gap-x-6">
                        {"Digital Art is the new".split(" ").map((word, wIdx) => (
                            <span key={wIdx} className="inline-block overflow-hidden">
                                {word.split("").map((char, cIdx) => (
                                    <motion.span
                                        key={cIdx}
                                        initial={{ opacity: 0.1, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: cIdx * 0.02 + wIdx * 0.1 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                        <span className="italic text-accent-emerald overflow-hidden inline-block">
                            {"Renaissance".split("").map((char, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ opacity: 0.1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.05 + 0.8 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="inline-block overflow-hidden">
                            {" of Human Error.".split(" ").map((word, wIdx) => (
                                <span key={wIdx} className="inline-block overflow-hidden">
                                    {word.split("").map((char, cIdx) => (
                                        <motion.span
                                            key={cIdx}
                                            initial={{ opacity: 0.1, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: cIdx * 0.02 + wIdx * 0.1 + 1.2 }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    </h3>
                </motion.div>

                <div className="flex justify-center pt-24">
                    <button className="framer-btn !px-24 scale-150 active:scale-95 transition-transform">Get Access</button>
                </div>
            </div>
        </section>
    );
}
