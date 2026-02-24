'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HintType = 'swipe-horizontal' | 'tap' | 'scroll';

export function AdaptiveHint({ type, label }: { type: HintType; label?: string }) {
    const [isTouch, setIsTouch] = useState<boolean | null>(null);

    useEffect(() => {
        // Safe check after mount to prevent hydration mismatch
        setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    // Don't render until we know the device type
    if (isTouch === null) return null;

    const renderIcon = () => {
        if (type === 'swipe-horizontal') {
            if (isTouch) {
                // Animated swiping hand
                return (
                    <motion.svg
                        className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 drop-shadow-lg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        animate={{ x: [-10, 10, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </motion.svg>
                );
            } else {
                // Horizontal mouse scroll indication
                return (
                    <motion.svg
                        className="w-8 h-8 text-emerald-400 drop-shadow-lg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                    </motion.svg>
                );
            }
        }

        if (type === 'tap') {
            return (
                <motion.div
                    className="relative flex items-center justify-center w-12 h-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                >
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
                </motion.div>
            );
        }

        if (type === 'scroll') {
            return (
                <motion.svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white/50"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m0 0l-7-7 7 7z" />
                </motion.svg>
            );
        }

        return null;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center"
                aria-hidden="true"
            >
                <div className={`flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl mix-blend-screen ${type === 'scroll' ? 'bg-transparent border-transparent shadow-none mix-blend-normal' : ''}`}>
                    {renderIcon()}
                    {label && (
                        <span className="mt-3 text-sm sm:text-base font-medium text-emerald-300 tracking-wide drop-shadow-md">
                            {label}
                        </span>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
