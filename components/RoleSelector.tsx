'use client';

import { useEffect, useState } from 'react';
import { useRole, UserRole } from './RoleContext';
import { useLanguage } from './LanguageCtx';
import { motion } from 'framer-motion';

const roleLabels: Record<'uk' | 'en', Record<UserRole, string>> = {
    uk: {
        default: 'Огляд',
        therapist: 'Психолог',
        clinic: 'Клініка',
        student: 'Студент-психолог'
    },
    en: {
        default: 'Overview',
        therapist: 'Psychologist',
        clinic: 'Clinic',
        student: 'Student Psychologist'
    }
};

export function RoleSelector() {
    const { role, setRole } = useRole();
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const roles: UserRole[] = ['therapist', 'clinic', 'student'];

    return (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-[16px] md:left-1/2 md:-translate-x-1/2 z-40 md:w-[95%] md:max-w-2xl py-1.5 md:py-2 px-2 md:px-0 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:pb-0 pointer-events-none flex justify-center">
            <div className="pointer-events-auto flex justify-start sm:justify-center gap-1 p-1 md:p-1.5 rounded-full bg-slate-900/90 md:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10 mx-auto md:min-w-max overflow-x-auto no-scrollbar max-w-full">
                {roles.map((r) => (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        aria-pressed={role === r}
                        className={`relative shrink-0 px-3 md:px-6 py-2 md:py-2.5 text-[11px] md:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${role === r ? 'text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        {mounted && role === r && (
                            <motion.div
                                layoutId="role-highlight"
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-white/10"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{roleLabels[language][r]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
