'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function EncryptionVisualizer() {
    const [particles, setParticles] = useState<{ id: number; encrypted: boolean }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            setParticles(prev => [...prev.slice(-4), { id, encrypted: false }]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-64 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-between px-8 md:px-16">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Client Side (Left) */}
            <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    💻
                </div>
                <div className="text-xs font-mono text-indigo-300">CLIENT</div>
            </div>

            {/* Middle: Encryption Barrier */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent z-0" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-900 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="text-xl">🛡️</div>
            </div>

            {/* Server Side (Right) */}
            <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center text-2xl">
                    ☁️
                </div>
                <div className="text-xs font-mono text-slate-500">SERVER</div>
            </div>

            {/* Moving Particles */}
            {particles.map((p) => (
                <Particle key={p.id} />
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono">
                E2EE DATA FLOW
            </div>
        </div>
    );
}

function Particle() {
    return (
        <motion.div
            initial={{ left: '15%', opacity: 0, scale: 0 }}
            animate={{
                left: ['15%', '50%', '85%'],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
            }}
            transition={{ duration: 4, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
            <motion.div
                initial={{ backgroundColor: '#6366f1', content: '""' }} // Indigo (Raw)
                animate={{ backgroundColor: ['#6366f1', '#6366f1', '#10b981', '#10b981'] }} // Turn Emerald (Encrypted)
                transition={{ duration: 4, times: [0, 0.45, 0.55, 1] }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
            >
                <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 1] }} // Blink at transition
                    transition={{ duration: 4, times: [0, 0.45, 0.55] }}
                >
                    <ContentSwitcher />
                </motion.span>
            </motion.div>
        </motion.div>
    );
}

function ContentSwitcher() {
    const [isEncrypted, setIsEncrypted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsEncrypted(true), 1800); // Sync with animation roughly
        return () => clearTimeout(timer);
    }, []);

    return isEncrypted ? 'aes' : 'txt';
}
