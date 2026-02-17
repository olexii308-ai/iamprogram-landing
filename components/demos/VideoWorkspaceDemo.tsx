'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

const uiText = {
    uk: {
        tabs: [
            { id: 'notes', label: 'Нотатки', icon: '📝' },
            { id: 'soap', label: 'SOAP', icon: '📋' },
            { id: 'tools', label: 'Інструменти', icon: '🛠️' },
            { id: 'client', label: 'Клієнт', icon: '👤' },
            { id: 'checklists', label: 'Чек-лісти', icon: '✅' },
        ],
        sessionTitle: 'Сесія №12: Тривожність',
        encryptionActive: 'E2EE Active',
        notesPlaceholder: 'Почніть писати...',
        notesDefault: 'Клієнт повідомляє про...',
        autoSave: 'Автозбереження',
        quickPhrases: ['Скарги на сон', 'Покращення', 'Регрес', 'Домашнє завдання'],
        soapSections: [
            { id: 'Subjective', label: 'Subjective' },
            { id: 'Objective', label: 'Objective' },
            { id: 'Assessment', label: 'Assessment' },
            { id: 'Plan', label: 'Plan' }
        ],
        aiSuggest: 'AI Suggest',
        soapPlaceholder: 'Заповніть секцію',
        tools: [
            { icon: '🖥️', label: 'Демонстрація', sub: 'Share Screen' },
            { icon: '🎨', label: 'Біла дошка', sub: 'Collaboration' },
            { icon: '👀', label: 'EMDR Тікер', sub: 'Eye Movement' },
            { icon: '🌬️', label: 'Дихання', sub: 'Pacing Guide' },
            { icon: '📊', label: 'Опитувальник', sub: 'Send to Client' },
            { icon: '🎵', label: 'Аудіо', sub: 'Play Ambience' },
        ],
        clientName: 'Олексій К.',
        clientMeta: '32 роки • IT-спеціаліст',
        lastSession: 'Остання сесія',
        lastSessionDate: '12 Лютого',
        homework: 'Домашнє завдання',
        homeworkStatus: 'Виконано (85%)',
        focusTitle: 'Фокус сесії',
        focusDesc: 'Клієнт повідомляв про високий рівень стресу на роботі. Перевірити техніки заземлення.',
        checklistItems: ['Check-in (Настрій, Події)', 'Перевірка домашнього завдання', 'Встановлення аженди', 'Робота по протоколу', 'Призначення нового ДЗ', 'Зворотній зв\'язок'],
        selfMuted: 'Ви (Muted)',
        phaseProcessing: 'Фаза: Опрацювання',
        workspaceBeta: 'Workspace'
    },
    en: {
        tabs: [
            { id: 'notes', label: 'Notes', icon: '📝' },
            { id: 'soap', label: 'SOAP', icon: '📋' },
            { id: 'tools', label: 'Tools', icon: '🛠️' },
            { id: 'client', label: 'Client', icon: '👤' },
            { id: 'checklists', label: 'Checklists', icon: '✅' },
        ],
        sessionTitle: 'Session #12: Anxiety',
        encryptionActive: 'E2EE Active',
        notesPlaceholder: 'Start typing...',
        notesDefault: 'Client reports...',
        autoSave: 'Autosave',
        quickPhrases: ['Sleep complaints', 'Improvement', 'Regression', 'Homework'],
        soapSections: [
            { id: 'Subjective', label: 'Subjective' },
            { id: 'Objective', label: 'Objective' },
            { id: 'Assessment', label: 'Assessment' },
            { id: 'Plan', label: 'Plan' }
        ],
        aiSuggest: 'AI Suggest',
        soapPlaceholder: 'Fill section',
        tools: [
            { icon: '🖥️', label: 'Screen Share', sub: 'Share Screen' },
            { icon: '🎨', label: 'Whiteboard', sub: 'Collaboration' },
            { icon: '👀', label: 'EMDR Ticker', sub: 'Eye Movement' },
            { icon: '🌬️', label: 'Breathing', sub: 'Pacing Guide' },
            { icon: '📊', label: 'Questionnaire', sub: 'Send to Client' },
            { icon: '🎵', label: 'Audio', sub: 'Play Ambience' },
        ],
        clientName: 'Alex K.',
        clientMeta: '32 y.o. • IT Specialist',
        lastSession: 'Last Session',
        lastSessionDate: 'Feb 12',
        homework: 'Homework',
        homeworkStatus: 'Done (85%)',
        focusTitle: 'Session Focus',
        focusDesc: 'Client reported high stress at work. Review grounding techniques.',
        checklistItems: ['Check-in (Mood, Events)', 'Homework Review', 'Agenda Setting', 'Protocol Work', 'Assign New Homework', 'Feedback'],
        selfMuted: 'You (Muted)',
        phaseProcessing: 'Phase: Processing',
        workspaceBeta: 'Workspace'
    }
};

export function VideoWorkspaceDemo() {
    const { language } = useLanguage();
    const t = uiText[language];

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('notes');
    const [timer, setTimer] = useState('48:12');

    // Simulate audio levels
    const [audioLevels, setAudioLevels] = useState([10, 20, 15, 30, 25]);
    useEffect(() => {
        const interval = setInterval(() => {
            setAudioLevels(Array(5).fill(0).map(() => Math.random() * 40 + 10));
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'notes':
                return (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3 bg-slate-800/50 p-2 rounded-lg border border-white/5">
                            <span className="text-xs font-medium text-slate-300">{t.sessionTitle}</span>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {t.encryptionActive}
                            </div>
                        </div>
                        <div className="relative flex-1">
                            <textarea
                                className="w-full h-full bg-slate-950/30 rounded-lg border border-white/5 p-4 text-sm text-slate-300 resize-none focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950/50 transition-all font-mono leading-relaxed custom-scrollbar"
                                placeholder={t.notesPlaceholder}
                                defaultValue={t.notesDefault}
                            />
                            <div className="absolute bottom-4 right-4 text-[10px] text-slate-500">{t.autoSave}</div>
                        </div>

                        {/* Quick Phrases */}
                        <div className="mt-3 flex gap-2 flex-wrap">
                            {t.quickPhrases.map(tag => (
                                <button key={tag} className="text-[10px] px-2 py-1 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'soap':
                return (
                    <div className="space-y-4 h-full overflow-y-auto pr-1">
                        {t.soapSections.map((section, idx) => {
                            const colors = ['indigo', 'emerald', 'amber', 'blue'];
                            const color = colors[idx];
                            return (
                                <div key={section.id} className="space-y-1 group">
                                    <div className="flex justify-between items-center">
                                        <label className={`text-[10px] font-bold text-${color}-400 uppercase tracking-widest flex items-center gap-2`}>
                                            <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500 group-hover:scale-125 transition-transform`} />
                                            {section.label}
                                        </label>
                                        <button className="text-[10px] text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">{t.aiSuggest}</button>
                                    </div>
                                    <textarea
                                        rows={3}
                                        className={`w-full bg-slate-950/30 rounded border border-white/5 p-3 text-xs text-slate-300 focus:border-${color}-500/50 focus:ring-1 focus:ring-${color}-500/20 transition-all placeholder:text-slate-600`}
                                        placeholder={`${t.soapPlaceholder} ${section.label}...`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            case 'tools':
                return (
                    <div className="grid grid-cols-2 gap-3">
                        {t.tools.map((tool, i) => (
                            <button key={i} className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/80 border border-white/5 hover:border-indigo-500/30 text-left transition-all group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors" />
                                <div className="relative z-10">
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                    <div className="text-xs font-bold text-slate-200">{tool.label}</div>
                                    <div className="text-[10px] text-slate-500">{tool.sub}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                );
            case 'client':
                return (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
                            <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center text-2xl mb-3 shadow-lg border-2 border-slate-600 relative">
                                👤
                                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-800" />
                            </div>
                            <h4 className="font-bold text-white text-lg">{t.clientName}</h4>
                            <div className="text-xs text-slate-400 mb-3">{t.clientMeta}</div>
                            <div className="flex justify-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">GAD</span>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/20">Sleep</span>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-800/30 border border-white/5 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">{t.lastSession}</span>
                                <span className="text-white">{t.lastSessionDate}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">{t.homework}</span>
                                <span className="text-emerald-400">{t.homeworkStatus}</span>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-amber-500 text-xs">⚠️</span>
                                <span className="text-[10px] text-amber-300 font-bold uppercase">{t.focusTitle}</span>
                            </div>
                            <p className="text-xs text-amber-100/70 leading-relaxed">{t.focusDesc}</p>
                        </div>
                    </div>
                );
            case 'checklists':
                return (
                    <div className="space-y-1">
                        {t.checklistItems.map((item, i) => (
                            <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors group">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border border-slate-600 checked:bg-indigo-500 checked:border-indigo-500 transition-all" defaultChecked={i < 2} />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 text-[10px] pointer-events-none">✓</span>
                                </div>
                                <span className="text-xs text-slate-300 peer-checked:text-slate-500 peer-checked:line-through transition-all select-none">{item}</span>
                            </label>
                        ))}
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="relative w-full aspect-square md:aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row font-sans selection:bg-indigo-500/30">
            {/* Main Video Area */}
            <div className="flex-1 relative bg-slate-900 overflow-hidden group">
                {/* Simulated Video Feed (Client) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-[#1e293b] to-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-t from-slate-700 to-slate-600 flex items-center justify-center mx-auto mb-6 relative shadow-2xl">
                            <span className="text-5xl">👤</span>
                            {/* Speaking Animation */}
                            <div className="absolute -bottom-2 flex gap-1 items-end justify-center h-8">
                                {audioLevels.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: h }}
                                        transition={{ duration: 0.1 }}
                                        className="w-1.5 bg-emerald-500 rounded-full opacity-80"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Network / Encryption Status overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <span className="text-xs font-mono text-white tracking-widest">{timer}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                        <div className="flex items-end gap-0.5 h-3">
                            <div className="w-0.5 h-1 bg-emerald-500" />
                            <div className="w-0.5 h-2 bg-emerald-500" />
                            <div className="w-0.5 h-3 bg-emerald-500" />
                        </div>
                        <span className="text-[10px] text-slate-400">HD • 24ms</span>
                    </div>
                </div>

                {/* Simulated Self View */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-800 rounded-lg border border-slate-700 shadow-2xl overflow-hidden hidden md:flex items-center justify-center group/pip hover:scale-105 transition-transform cursor-pointer">
                    <span className="text-2xl">👨‍⚕️</span>
                    <div className="absolute bottom-1 left-1 text-[8px] bg-black/60 px-1.5 rounded text-white backdrop-blur-sm">{t.selfMuted}</div>
                    <div className="absolute inset-0 bg-black/0 group-hover/pip:bg-black/20 transition-colors" />
                </div>

                {/* Top Right Widgets */}
                <div className="absolute top-4 right-4 hidden md:flex flex-col items-end gap-2">
                    <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-indigo-500/30 shadow-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            ⏱️
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.phaseProcessing}</div>
                            <div className="w-24 h-1 bg-slate-700 mt-1 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-indigo-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Controls Bar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 p-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl z-10 transition-all duration-300 hover:scale-105 hover:bg-slate-950">
                    <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all border border-white/5 hover:border-white/20 active:scale-95">
                        🎤
                    </button>
                    <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all border border-white/5 hover:border-white/20 active:scale-95">
                        📹
                    </button>
                    <div className="w-px h-6 bg-white/10 my-auto" />
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all border ${isSidebarOpen ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 hover:text-white border-white/5'}`}
                    >
                        🛠️
                    </button>
                    <button className="w-11 h-11 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-500 flex items-center justify-center transition-all border border-emerald-500/20">
                        😊
                    </button>
                    <button
                        className="w-12 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] active:scale-95 ml-2"
                    >
                        📞
                    </button>
                </div>
            </div>

            {/* Floating Sidebar (Panel) */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="h-full bg-[#0B1120] border-l border-slate-800 flex flex-col shadow-2xl relative z-20"
                    >
                        {/* Panel Header */}
                        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-[#0F172A]">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-sm">{t.workspaceBeta}</h3>
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">Beta</span>
                            </div>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500 hover:text-white transition-colors">✕</button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-800 bg-[#0B1120]">
                            {t.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 min-w-[60px] py-3 text-[10px] font-medium flex flex-col items-center gap-1.5 transition-all relative ${activeTab === tab.id
                                        ? 'text-white bg-slate-800/50'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                                        }`}
                                >
                                    <span className="text-base">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Panel Content (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-4 bg-[#0B1120] custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {renderTabContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
