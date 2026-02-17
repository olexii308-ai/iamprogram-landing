'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from './RoleContext';
import { useLanguage } from './LanguageCtx';
import { content } from '../lib/content';

export function GenerativeBackground() {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { role } = useRole();
    const { language } = useLanguage();

    useEffect(() => {
        const prompt = content[language][role].visualPrompt;
        setLoading(true);

        // Debounce slightly to avoid flickering on rapid role changes
        const timer = setTimeout(() => {
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            })
                .then(res => {
                    if (!res.ok) throw new Error('API Error');
                    return res.json();
                })
                .then(data => {
                    if (data.svg) setSvgContent(data.svg);
                    setLoading(false);
                })
                .catch(err => {
                    console.warn('Generative background failed, falling back to CSS:', err);
                    setSvgContent(null); // Ensure fallback is used
                    setLoading(false);
                });
        }, 500);

        return () => clearTimeout(timer);
    }, [role, language]);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
            <AnimatePresence mode='wait'>
                {svgContent ? (
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                ) : (
                    <motion.div
                        key="fallback"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        {/* Premium Fallback Gradients */}
                        <div className={`absolute inset-0 opacity-40 mix-blend-screen transition-colors duration-1000 ${role === 'therapist' ? 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-teal-900' :
                                role === 'clinic' ? 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-emerald-900 via-slate-900 to-cyan-900' :
                                    role === 'student' ? 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900' :
                                        'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900'
                            }`} />

                        {/* Animated Mesh/Orbs */}
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-1000" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        </div>
    );
}
