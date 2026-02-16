export default function Footer() {
    return (
        <footer className="py-40 border-t border-white/5 bg-primary relative z-20">
            <div className="content-spread flex flex-col lg:flex-row justify-between items-start gap-40">
                <div className="space-y-12">
                    <h4 className="font-serif font-black text-8xl text-white tracking-tighter">KRO.<span className="text-accent-emerald underline decoration-[1px] underline-offset-8">Art</span></h4>
                    <div className="max-w-md space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-black leading-loose">
                            Curated Digital Art Magazine. Edited by Paula Lopez. Exploring the boundaries of human error in the digital era. Berlin / Cologne / Metaverse.
                        </p>
                        <p className="text-[12px] text-zinc-400 font-serif italic">Est. 2025 — Modern Heritage Edition</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-32">
                    <div className="space-y-6">
                        <span className="text-[12px] uppercase tracking-[0.5em] text-zinc-500 font-black">Sections</span>
                        <ul className="space-y-4 text-[13px] uppercase tracking-[0.3em] font-bold text-zinc-400">
                            <li><a href="#" className="hover:text-accent-emerald transition-colors">Portfolio</a></li>
                            <li><a href="#" className="hover:text-accent-emerald transition-colors">Museum</a></li>
                            <li><a href="#" className="hover:text-accent-emerald transition-colors">Shop</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <span className="text-[12px] uppercase tracking-[0.5em] text-zinc-500 font-black">Connect</span>
                        <ul className="space-y-4 text-[13px] uppercase tracking-[0.3em] font-bold text-zinc-400">
                            <li><a href="https://www.instagram.com/kro_lopezart?igsh=MXMyZjBlcmwxNDN3bA%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-accent-emerald transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-accent-emerald transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-accent-emerald transition-colors">Discord</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <span className="text-[12px] uppercase tracking-[0.5em] text-zinc-500 font-black">Studio</span>
                        <p className="text-[13px] text-white hover:text-accent-emerald transition-colors cursor-pointer">studio@kro.art</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
