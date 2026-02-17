'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { content } from '../lib/content';
import { EncryptionVisualizer } from './EncryptionVisualizer';

export function ZeroKnowledgeSection() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = content[language][role].zeroKnowledge;

    const openWaitlist = () => {
        window.dispatchEvent(new CustomEvent('open-waitlist', { detail: { source: 'security-block' } }));
    };

    if (!t) return null; // Safety check

    return (
        <section id="security-block" className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6">
                            Security First
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {t.title}
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            {t.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {t.points.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-emerald-500 mt-1">✓</span>
                                    <span className="text-slate-300">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={openWaitlist}
                            className="text-white border-b border-emerald-500 pb-0.5 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                        >
                            {t.cta} →
                        </button>
                    </motion.div>

                    {/* Visualizer */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                        <EncryptionVisualizer />

                        {/* Technical Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#0F172A] p-4 rounded-xl border border-slate-700 shadow-xl hidden md:block">
                            <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Encryption Standard</div>
                            <div className="text-white font-bold font-mono">AES-256-GCM + RSA-4096</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
