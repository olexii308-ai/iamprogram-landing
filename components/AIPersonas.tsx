'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { content } from '../lib/content';

export function AIPersonas() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = content[language][role];

    if (!t.aiPersonas) return null;

    return (
        <section className="py-24 bg-[#050B14] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-400 font-medium mb-4">
                        AI-Supervision
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {t.aiPersonas.title}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t.aiPersonas.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {t.aiPersonas.items.map((persona, index) => (
                        <motion.div
                            key={persona.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                                {persona.icon}
                            </div>
                            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                                {persona.role}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                                {persona.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                {persona.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
