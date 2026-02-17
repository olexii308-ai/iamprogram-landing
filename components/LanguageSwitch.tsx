'use client';

import { useLanguage } from './LanguageCtx';
import { motion } from 'framer-motion';

export function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
            <button
                onClick={() => setLanguage('uk')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'uk'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white'
                    }`}
            >
                UA
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'en'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-300 hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
