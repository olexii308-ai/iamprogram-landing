'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

const uiText = {
    uk: {
        record: 'Клінічний запис #4921',
        syncing: 'Синхронізація...',
        synced: 'Зашифровано і збережено',
        localTitle: 'Ваш пристрій (Ваші ключі)',
        localPlaceholder: 'Клієнт повідомив про покращення якості сну...',
        localDecrypted: 'РОЗШИФРОВАНО',
        serverTitle: 'Сервер Bravery (Нульовий доступ)',
        serverEncrypted: 'ЗАШИФРОВАНО',
        footer: 'Ви пишете звичайним текстом. Ми зберігаємо лише зашифрований шум.'
    },
    en: {
        record: 'Client Record #4921',
        syncing: 'Syncing Encrypted Blob...',
        synced: 'Encrypted & Synced',
        localTitle: 'Local Device (Your Keys)',
        localPlaceholder: 'Patient reported improved sleep quality...',
        localDecrypted: 'DECRYPTED',
        serverTitle: 'Bravery Server (Zero Access)',
        serverEncrypted: 'ENCRYPTED',
        footer: 'You type plainly. We store only the scrambled noise.'
    }
};

export function SecurityDemo() {
    const { language } = useLanguage();
    const t = uiText[language];

    const [text, setText] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    const encrypted = useMemo(() => {
        const chars = "0101010101XYZ@#%&";
        const sourceText = text || t.localPlaceholder;
        let seed = 0;

        for (let i = 0; i < sourceText.length; i++) {
            seed = (seed * 31 + sourceText.charCodeAt(i)) % 2147483647;
        }

        let result = "";
        for (let i = 0; i < sourceText.length * 1.5; i++) {
            seed = (seed * 1103515245 + 12345) % 2147483647;
            result += chars.charAt(seed % chars.length);
        }
        return result;
    }, [text, t.localPlaceholder]);

    const triggerSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <div className="w-full h-full min-h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        🔒
                    </div>
                    <span className="font-semibold text-white">{t.record}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="text-slate-400">{isSyncing ? t.syncing : t.synced}</span>
                </div>
            </div>

            {/* Split View: Local vs Server */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Local View */}
                <div className="space-y-2">
                    <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{t.localTitle}</div>
                    <div className="h-full bg-slate-800 rounded-lg p-4 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)] relative group">
                        <textarea
                            value={text}
                            onChange={(e) => { setText(e.target.value); triggerSync(); }}
                            className="w-full h-full bg-transparent resize-none focus:outline-none text-slate-200 text-sm font-mono"
                            spellCheck={false}
                        />
                        <div className="absolute top-2 right-2 text-[10px] text-indigo-400 opacity-50">{t.localDecrypted}</div>
                    </div>
                </div>

                {/* Server View */}
                <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">{t.serverTitle}</div>
                    <div className="h-full bg-slate-950 rounded-lg p-4 border border-slate-800 relative overflow-hidden">
                        <div className="font-mono text-xs text-emerald-700 break-all leading-relaxed select-none blur-[0.5px]">
                            {encrypted}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2 right-2 text-[10px] text-slate-600 opacity-50">{t.serverEncrypted}</div>

                        {/* Flowing data animation */}
                        {isSyncing && (
                            <motion.div
                                initial={{ top: '100%' }}
                                animate={{ top: '-100%' }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-slate-500">
                {t.footer}
            </div>
        </div>
    );
}
