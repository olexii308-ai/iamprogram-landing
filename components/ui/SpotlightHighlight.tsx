'use client';

import { motion } from 'framer-motion';

export function SpotlightHighlight() {
    return (
        <div className="absolute inset-0 z-40 rounded-inherit pointer-events-none" aria-hidden="true">
            {/* The pulsing box highlight */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] border-2 border-amber-400/80 bg-amber-400/5 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
            {/* Expanding ripple */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] border border-amber-400/60"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.15 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
            />
        </div>
    );
}
