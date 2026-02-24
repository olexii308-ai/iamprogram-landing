'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type HintActionType = 'swipe-horizontal' | 'tap' | 'scroll';

interface TextHintProps {
    type: HintActionType;
    onDismiss?: () => void;
    ukText?: string;
    enText?: string;
    language: 'uk' | 'en';
}

export function TextHint({ type, onDismiss, ukText, enText, language }: TextHintProps) {
    const [isTouch, setIsTouch] = useState<boolean | null>(null);

    useEffect(() => {
        setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    if (isTouch === null) return null;

    // Default translations based on action and device
    let defaultUk = '';
    let defaultEn = '';

    switch (type) {
        case 'swipe-horizontal':
            defaultUk = isTouch ? '👈 Свайпайте вбік для інших опцій' : '👈 Гортайте вбік для інших опцій';
            defaultEn = isTouch ? '👈 Swipe for more options' : '👈 Scroll for more options';
            break;
        case 'tap':
            defaultUk = isTouch ? 'Тапніть, щоб спробувати 👇' : 'Клікніть, щоб спробувати 👇';
            defaultEn = isTouch ? 'Tap here to try 👇' : 'Click here to try 👇';
            break;
        case 'scroll':
            defaultUk = 'Гортайте вниз';
            defaultEn = 'Scroll down';
            break;
    }

    const displayText = language === 'uk' ? (ukText || defaultUk) : (enText || defaultEn);

    // Render pure chevron for scroll, text bubbles for others
    if (type === 'scroll') {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-2 pointer-events-none"
                    aria-hidden="true"
                >
                    <span className="text-xs font-medium text-slate-400 tracking-widest uppercase font-mono">
                        {displayText}
                    </span>
                    <motion.svg
                        className="w-5 h-5 text-emerald-500/50"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m0 0l-7-7 7 7z" />
                    </motion.svg>
                </motion.div>
            </AnimatePresence>
        );
    }

    // The Text Bubble Hint (V3)
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                className="relative z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 shadow-[0_4px_30px_rgba(99,102,241,0.2)]"
                role="tooltip"
            >
                {/* Text Instruction */}
                <span className="text-sm font-medium text-indigo-100 whitespace-nowrap">
                    {displayText}
                </span>

                {/* Explicit Dismiss Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDismiss?.();
                    }}
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 text-indigo-200 hover:text-white transition-colors border border-transparent hover:border-indigo-400/30"
                    aria-label="Закрити підказку"
                >
                    <X size={14} />
                </button>

                {/* Pointing Tail (CSS triangle) */}
                {type === 'tap' && (
                    <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-indigo-400/30 drop-shadow-md" />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
