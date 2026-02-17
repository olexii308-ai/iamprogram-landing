'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { faqContent } from '../lib/faq';

export function FAQ() {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState(0);

    const items = faqContent[language];

    const copy = language === 'uk'
        ? {
            badge: 'FAQ',
            title: 'Питання, які задають найчастіше',
            description: 'Коротко про безпеку, AI-супервізію, beta-пілоти та корпоративні сценарії.',
            cta: 'Записатися в лист очікування'
        }
        : {
            badge: 'FAQ',
            title: 'Frequently asked questions',
            description: 'Quick answers about security, AI supervision, beta pilots, and enterprise scenarios.',
            cta: 'Join the waitlist'
        };

    const openWaitlist = () => {
        window.dispatchEvent(new CustomEvent('open-waitlist', { detail: { source: 'faq' } }));
    };

    return (
        <section id="faq-block" className="py-24 bg-[#050B14] border-t border-white/5">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
                        {copy.badge}
                    </span>
                    <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tight">{copy.title}</h2>
                    <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">{copy.description}</p>
                </motion.div>

                <div className="space-y-3">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={item.question}
                                className="rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                                >
                                    <span className="font-semibold text-white">{item.question}</span>
                                    <span className={`text-emerald-300 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="px-5 pb-4 text-slate-300 leading-relaxed">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-10">
                    <button
                        onClick={openWaitlist}
                        className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
                    >
                        {copy.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
