'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, Send } from 'lucide-react';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    labels: {
        title: string;
        description: string;
        placeholder: string;
        button: string;
        success: string;
        submitting: string;
    };
}

export function WaitlistModal({ isOpen, onClose, labels }: WaitlistModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        setTimeout(() => {
            onClose();
            // Reset after closing
            setTimeout(() => {
                setStatus('idle');
                setEmail('');
            }, 300);
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-slate-900 border border-emerald-500/20 rounded-2xl p-6 shadow-2xl shadow-emerald-500/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                                <Send className="text-emerald-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{labels.title}</h2>
                            <p className="text-slate-400">{labels.description}</p>
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-400"
                            >
                                <CheckCircle size={24} />
                                <span className="font-medium">{labels.success}</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={labels.placeholder}
                                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            {labels.submitting}
                                        </>
                                    ) : (
                                        labels.button
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
