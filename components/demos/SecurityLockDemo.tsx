'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

const uiText = {
    uk: {
        title: 'Розблокування даних',
        subtitle: 'Введіть пароль шифрування',
        passwordLabel: 'Пароль шифрування',
        placeholder: '••••••••••••',
        autoLock: 'Автоблокування о',
        unlocking: 'Розшифровка...',
        unlock: 'Розблокувати',
        forgot: 'Забули пароль? Використати код відновлення',
        accessGranted: 'Доступ надано',
        successMsg: 'Ваші дані успішно розшифровані локально на цьому пристрої.',
        lockAgain: 'Заблокувати знову'
    },
    en: {
        title: 'Unlock Data',
        subtitle: 'Enter encryption password',
        passwordLabel: 'Encryption Password',
        placeholder: '••••••••••••',
        autoLock: 'Auto-lock at',
        unlocking: 'Decrypting...',
        unlock: 'Unlock',
        forgot: 'Forgot password? Use recovery code',
        accessGranted: 'Access Granted',
        successMsg: 'Your data successfully decrypted locally on this device.',
        lockAgain: 'Lock Again'
    }
};

export function SecurityLockDemo() {
    const { language } = useLanguage();
    const t = uiText[language];

    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUnlock = () => {
        if (!password) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsUnlocked(true);
        }, 1500);
    };

    return (
        <div className="w-full h-full min-h-[500px] bg-black text-slate-300 font-sans selection:bg-emerald-500/30 flex flex-col items-center justify-center rounded-xl overflow-hidden border border-slate-900 shadow-2xl relative">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-black to-black pointer-events-none" />

            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <motion.div
                        key="lock-screen"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        className="relative z-10 w-full max-w-md p-8"
                    >
                        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="p-6 text-center border-b border-slate-700/50">
                                <motion.div
                                    initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                    className="text-4xl mb-4"
                                >
                                    🔐
                                </motion.div>
                                <h2 className="text-xl font-bold text-white mb-1">{t.title}</h2>
                                <p className="text-xs text-slate-400">{t.subtitle}</p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6 bg-[#162032]">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.passwordLabel}</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#0F172A] border border-emerald-500/50 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono tracking-widest"
                                            placeholder={t.placeholder}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <div className={`w-2 h-2 rounded-full ${password.length > 0 ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                                    <span className="text-slate-400">🕒</span>
                                    <span className="text-xs text-slate-300">{t.autoLock} <span className="text-white font-bold">18:00</span> (Europe/Kyiv)</span>
                                </div>

                                <button
                                    onClick={handleUnlock}
                                    disabled={!password || isLoading}
                                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${password
                                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t.unlocking}
                                        </>
                                    ) : (
                                        t.unlock
                                    )}
                                </button>

                                <div className="text-center">
                                    <button className="text-[10px] text-amber-500 hover:text-amber-400 transition-colors">
                                        {t.forgot}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center z-10"
                    >
                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(16,185,129,0.5)] mx-auto mb-6">
                            🔓
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t.accessGranted}</h3>
                        <p className="text-slate-400 max-w-xs mx-auto">
                            {t.successMsg}
                        </p>
                        <button
                            onClick={() => { setIsUnlocked(false); setPassword(''); }}
                            className="mt-8 px-6 py-2 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-white transition-all text-sm"
                        >
                            {t.lockAgain}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
