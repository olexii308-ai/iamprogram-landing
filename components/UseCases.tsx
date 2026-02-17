'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { content } from '../lib/content';
import { VideoWorkspaceDemo } from './demos/VideoWorkspaceDemo';
import { AIChatDemo } from './demos/AIChatDemo';
import { SecurityDemo } from './demos/SecurityDemo';
import { ClientProfileDemo } from './demos/ClientProfileDemo';
import { ToolsCatalogDemo } from './demos/ToolsCatalogDemo';
import { CalendarBookingDemo } from './demos/CalendarBookingDemo';
import { SecurityLockDemo } from './demos/SecurityLockDemo';
import { VoiceSupervisorDemo } from './demos/VoiceSupervisorDemo';

export function UseCases() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = content[language][role];
    const [activeCaseIndex, setActiveCaseIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);

    // Hide hint after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    const activeCase = t.useCases[activeCaseIndex];

    const renderDemo = (type: string) => {
        switch (type) {
            case 'client-profile': return <ClientProfileDemo />;
            case 'video-workspace': return <VideoWorkspaceDemo />;
            case 'tools-catalog': return <ToolsCatalogDemo />;
            case 'calendar-booking': return <CalendarBookingDemo />;
            case 'security-lock': return <SecurityLockDemo />;
            case 'voice-supervisor': return <VoiceSupervisorDemo />;
            case 'ai-chat': return <AIChatDemo />;
            case 'secure-dashboard': return <SecurityDemo />;
            default: return null;
        }
    };

    return (
        <section id="use-cases-block" className="py-24 relative overflow-hidden bg-[#020617]">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-emerald-900/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-indigo-400 font-medium mb-4">
                        {language === 'uk' ? 'Можливості платформи' : 'Platform Features'}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {language === 'uk' ? 'Що ви отримаєте від платформи' : 'What You Get From The Platform'}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {language === 'uk'
                            ? 'Спробуйте інтерактивні демо наших ключових можливостей для вашої ролі.'
                            : 'Experience our key features customized for your role with these interactive demos.'}
                    </p>

                    {/* Interaction Hint Animation */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-emerald-400 text-sm font-medium animate-bounce"
                            >
                                <span>👆</span>
                                <span>{language === 'uk' ? 'Спробуйте клікнути!' : 'Try clicking!'}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Scenarios Menu */}
                    <div className="lg:col-span-4 flex flex-col gap-3 relative">
                        {/* Finger pointing hint overlay for first item */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="absolute top-8 -left-12 z-50 text-4xl hidden lg:block"
                                >
                                    👉
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {t.useCases.map((useCase, index) => (
                            <button
                                key={useCase.id}
                                onClick={() => setActiveCaseIndex(index)}
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${activeCaseIndex === index
                                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                                    : 'bg-slate-900/20 border-white/5 hover:bg-slate-800/40 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${activeCaseIndex === index ? 'bg-indigo-500/20 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                                        }`}>
                                        {useCase.image}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-base mb-1 transition-colors ${activeCaseIndex === index ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                            }`}>
                                            {useCase.title}
                                        </h3>
                                        <p className={`text-xs leading-relaxed transition-colors ${activeCaseIndex === index ? 'text-slate-300' : 'text-slate-500'
                                            }`}>
                                            {useCase.description}
                                        </p>
                                    </div>
                                    {activeCaseIndex === index && (
                                        <div className="text-indigo-400 self-center">
                                            →
                                        </div>
                                    )}
                                </div>
                                {activeCaseIndex === index && (
                                    <motion.div
                                        layoutId="active-glow-border"
                                        className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Interactive Demo Stage */}
                    <div className="lg:col-span-8 relative">
                        {/* Browser/Window Frame */}
                        <div className="relative sticky top-24 w-full bg-[#1E293B] rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col">
                            {/* Window Header */}
                            <div className="h-10 bg-[#0F172A] border-b border-slate-800 flex items-center px-4 justify-between shrink-0">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800/50 border border-white/5 text-[10px] text-slate-400">
                                    <span>🔒</span>
                                    <span>bravery.academy/demo/{activeCase.type}</span>
                                </div>
                                <div className="w-10" /> {/* Spacer for centering */}
                            </div>

                            {/* Window Content */}
                            <div className="relative bg-[#020617] p-1 h-[600px] md:h-auto md:aspect-[4/3] overflow-hidden">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={activeCase.type}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-white/5"
                                    >
                                        {renderDemo(activeCase.type)}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Background Glow for Window */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-indigo-500/5 blur-[80px] -z-10 rounded-full" />
                    </div>
                </div>

                {/* "More tools" button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <button
                        onClick={() => document.getElementById('tools-catalog-block')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25 inline-flex items-center gap-3"
                    >
                        {language === 'uk' ? 'Більше інструментів' : 'More Tools'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
