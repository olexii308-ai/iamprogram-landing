'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { content } from '../lib/content';
import { useHints } from '../hooks/useHints';
import { PremiumPulse } from './ui/PremiumPulse';
import { InlineHint } from './ui/InlineHint';
import { currentFeatures, roadmapItems } from '../lib/tools-catalog';
import type { Tool } from '../lib/tools-catalog';

// ================================================================
// Component
// ================================================================

export function ToolsCatalog() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = content[language][role];
    const features = currentFeatures[language];
    const roadmap = roadmapItems[language];

    // Hint System
    const hoverHint = useHints('tools-hover');

    const totalCurrentTools = features.reduce((sum, cat) => sum + cat.tools.length, 0);
    const totalRoadmapItems = roadmap.reduce((sum, cat) => sum + cat.items.length, 0);

    return (
        <section id="tools-catalog-block" className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-900/8 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-900/8 blur-[120px] rounded-full" />
                <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-emerald-900/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                {/* ===== HEADER ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-emerald-400 font-medium mb-4">
                        {language === 'uk' ? `${totalCurrentTools} інструментів доступно` : `${totalCurrentTools} tools available`}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight balanced-text px-2">
                        {t.features.title}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {language === 'uk'
                            ? 'Повний огляд того, що вже працює сьогодні та що на підході.'
                            : 'Complete overview of what works today and what\'s coming next.'}
                    </p>
                </motion.div>

                {/* ===== CURRENT FEATURES BY CATEGORY ===== */}
                <div className="space-y-12 mb-20 relative">

                    {/* V5 Inline Hint (Above grid) */}
                    <div className="hidden md:block absolute -top-8 right-0 text-right">
                        <InlineHint show={hoverHint.showHint} language={language} type="tap" />
                    </div>
                    <div className="md:hidden mb-4">
                        <InlineHint show={hoverHint.showHint} language={language} type="tap" />
                    </div>

                    {features.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.05 }}
                        >
                            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                                <span className="text-2xl">{category.emoji}</span>
                                {category.title}
                                <span className="text-xs font-normal text-slate-500">({category.tools.length})</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.tools.map((tool, i) => (
                                    <motion.div
                                        key={tool.title}
                                        ref={catIdx === 0 && i === 0 ? hoverHint.ref as any : undefined}
                                        onMouseEnter={hoverHint.dismissHint}
                                        onTouchStart={hoverHint.dismissHint}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.03 }}
                                        className="relative p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-500 group hover:shadow-[0_0_20px_rgba(16,185,129,0.07)] overflow-hidden"
                                    >
                                        {/* Hint Pulse (Only on first item if unread) */}
                                        {catIdx === 0 && i === 0 && hoverHint.showHint && <PremiumPulse />}

                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative flex items-start gap-3">
                                            <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform shrink-0">
                                                {tool.icon}
                                            </span>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                                                    {tool.title}
                                                </h4>
                                                <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ===== DIVIDER ===== */}
                <div className="relative mb-16">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-slate-950 px-6 text-sm font-medium text-purple-400">
                            {language === 'uk' ? `Coming Soon — ${totalRoadmapItems} нових інструментів` : `Coming Soon — ${totalRoadmapItems} new tools`}
                        </span>
                    </div>
                </div>

                {/* ===== ROADMAP ===== */}
                <div className="space-y-10">
                    {roadmap.map((category, catIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.05 }}
                        >
                            <h3 className="text-base font-bold text-purple-300/80 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                {category.category}
                                <span className="text-xs font-normal text-slate-600">({category.items.length})</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                {category.items.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.02 }}
                                        className="p-3 rounded-lg bg-slate-900/20 border border-white/[0.03] hover:border-purple-500/15 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-lg opacity-40 group-hover:opacity-80 transition-opacity shrink-0">
                                                {item.icon}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-medium text-slate-400 text-xs group-hover:text-slate-300 transition-colors sm:truncate">
                                                    {item.title}
                                                </h4>
                                                <p className="text-slate-600 text-[11px] sm:text-[10px] leading-relaxed sm:truncate">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
