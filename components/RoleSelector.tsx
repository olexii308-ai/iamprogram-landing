'use client';

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

    const roles: UserRole[] = ['therapist', 'clinic', 'student'];

    return (
        <div className="fixed top-[10px] left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl overflow-x-auto no-scrollbar py-2">
            <div className="flex justify-center min-w-max gap-1 p-1.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10 mx-auto">
                {roles.map((r) => (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`relative px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${role === r ? 'text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        {role === r && (
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
