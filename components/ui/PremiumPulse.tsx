'use client';

import { motion } from 'framer-motion';

export function PremiumPulse() {
    return (
        <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden rounded-xl" aria-hidden="true">
            {/* Outer static glow */}
            <div className="absolute inset-0 ring-2 ring-inset ring-indigo-500/30 rounded-xl" />

            {/* Animated expanding pulse */}
            <motion.div
                className="absolute inset-0 rounded-xl border-2 border-indigo-400"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
            />

            {/* Inner fill glow */}
            <motion.div
                className="absolute inset-0 bg-indigo-500/5 rounded-xl mix-blend-screen"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.8 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
