'use client';

import { motion } from 'framer-motion';
import { useRole } from './RoleContext';
import { useLanguage } from './LanguageCtx';
import { content, moduleTranslations } from '../lib/content';

export function Features() {
    const { role } = useRole();
    const { language } = useLanguage();
    const t = content[language][role];
    const m = moduleTranslations[language];

    const featuresList = [
        { id: 'cabinet', icon: "🗂️" },
        { id: 'tools', icon: "📊" },
        { id: 'security', icon: "🛡️" },
        { id: 'library', icon: "📚" },
        { id: 'ai-assistant', icon: "🤖" },
        { id: 'ai-trainer', icon: "🎓" },
        { id: 'ai-analyst', icon: "📈" },
        { id: 'analytics', icon: "📉" }
    ];

    // Filter and sort features based on prioritization
    const displayedFeatures = featuresList.sort((a, b) => {
        const indexA = t.features.prioritizedModules.indexOf(a.id);
        const indexB = t.features.prioritizedModules.indexOf(b.id);

        // If both are prioritized, sort by priority order
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // If only A is prioritized, it comes first
        if (indexA !== -1) return -1;
        // If only B is prioritized, it comes first
        if (indexB !== -1) return 1;
        // Otherwise keep original order
        return 0;
    });

    return (
        <section id="features-block" className="py-24 bg-slate-950 relative">
            <div className="container px-4 mx-auto">
                <motion.div
                    key={`header-${role}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.features.title}</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {t.features.description}
                    </p>
                </motion.div>

                {/* AI Persona Highlight */}
                <motion.div
                    key={`persona-${role}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
                    <h3 className="text-2xl font-bold text-indigo-300 mb-2">
                        {language === 'uk' ? 'Ваш Copilot:' : 'Your Copilot:'} {t.aiPersona.highlight.toUpperCase()}
                    </h3>
                    <p className="text-lg text-indigo-100 italic">&ldquo;{t.aiPersona.description}&rdquo;</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 group-hover:via-indigo-500/5 group-hover:to-indigo-500/10 transition-all duration-500" />

                            <div className="relative z-10">
                                <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                    {m[feature.id].title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {m[feature.id].description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
