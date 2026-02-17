'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

const uiText = {
    uk: {
        tabs: ['Особиста справа', 'План терапії', 'Сесії (2)', 'Інструменти (3)', 'Завдання', 'Фідбек', 'Аналітика', 'Нотатки', 'Хронологія'],
        bookingCodeLabel: 'Код для повторного бронювання',
        copy: 'Копіювати',
        copied: 'Скопійовано!',
        videoLink: 'Посилання на відеодзвінок',
        resetLink: '⟳ Оновити',
        link: 'Посилання',
        accessCode: 'Код доступу',
        copyAll: '❐ Копіювати все для клієнта',
        contacts: 'Контакти',
        clickToDecrypt: 'Клікніть, щоб розшифрувати',
        clinicalData: 'Клінічні дані',
        tagsLabel: 'Теги та діагнози:',
        noTags: 'Теги відсутні',
        sessions: 'Сесій',
        tools: 'Інструментів',
        phase1Title: 'Фаза 1: Стабілізація та Безпека',
        phase1Goal: 'Мета: Зменшення гострих симптомів та встановлення альянсу.',
        step1: 'Встановлення терапевтичного альянсу',
        step1Desc: 'Обговорення конфіденційності, сетінгу та очікувань.',
        completedOn: 'Виконано',
        step2: 'Психоедукація про тривожність',
        step2Desc: 'Пояснення механізму "бий або біжи", цикл тривоги.',
        step3: 'Навчання технікам заземлення',
        step3Desc: 'Дихання 4-7-8, техніка 5-4-3-2-1.',
        phase2Title: 'Фаза 2: Глибинне Опрацювання (CBT)',
        phase2Goal: 'Мета: Зміна когнітивних викривлень та поведінкових патернів.',
        step4: 'Ідентифікація автоматичних думок',
        step4Desc: 'Ведення щоденника думок (Thought Record).',
        addNextSteps: '+ Додати наступні кроки (Експозиція, Поведінкові експерименти)',
        session1Title: 'Первинна консультація',
        session1Time: '14 Лют, 10:00 • 50 хв',
        btnNotes: 'Нотатки',
        session2Title: 'Планова сесія',
        session2Time: '21 Лют, 10:00 • 50 хв',
        btnJoin: 'Приєднатися',
        gad7Desc: 'Опитувальник генералізованої тривоги',
        gad7Level: 'Помірна тривога',
        gad7Score: '13 / 21 балів',
        lastUpdate: 'Останнє',
        bdiDesc: 'Шкала депресії Бека',
        bdiLevel: 'Мінімальна',
        bdiScore: '9 / 63 балів',
        sleepDiary: 'Щоденник Сну',
        sleepDesc: 'Моніторинг якості та тривалості',
        avgWeek: 'Середнє за тиждень',
        task1: 'Щоденник настрою',
        task1Time: '3 дні поспіль',
        task2: 'Техніка "Заземлення"',
        task2Desc: 'При нападі тривоги',
        active: 'Активне',
        feedbackScore: '⭐ 5.0',
        feedbackText: '"Дуже вдячний за сесію. Техніки дихання справді допомогли вчора ввечері."',
        insightTitle: 'AI-Інсайт: Кореляція сну та тривожності',
        insightText: 'Ми помітили, що зниження якості сну (менше 6 годин) на 90% корелює з підвищенням рівня тривожності наступного дня.',
        chartMood: 'Динаміка Настрою',
        chartSleep: 'Сон vs Панічні Атаки',
        attendance: 'Відвідуваність',
        homework: 'Домашки',
        gadLevel: 'Рівень GAD-7',
        encryptedNote: '🔒 Зашифровано (Zero-Knowledge)',
        noteText: 'Клієнт згадував про покращення сну. Проте тривожність ще зберігається на рівні 6/10. Плануємо працювати з КПТ-протоколом "Панічні атаки" наступного разу...',
        event1: 'Заплановано сесію',
        event2: 'Виконано завдання',
        event3: 'Заповнено GAD-7',
        event4: 'Створено акаунт',
        statusActive: 'Активний',
        edit: 'Редагувати'
    },
    en: {
        tabs: ['Profile', 'Therapy Plan', 'Sessions (2)', 'Tools (3)', 'Tasks', 'Feedback', 'Analytics', 'Notes', 'Timeline'],
        bookingCodeLabel: 'Rebooking Code',
        copy: 'Copy',
        copied: 'Copied!',
        videoLink: 'Video Call Link',
        resetLink: '⟳ Refresh',
        link: 'Link',
        accessCode: 'Access Code',
        copyAll: '❐ Copy all for client',
        contacts: 'Contacts',
        clickToDecrypt: 'Click to decrypt',
        clinicalData: 'Clinical Data',
        tagsLabel: 'Tags & Diagnoses:',
        noTags: 'No tags',
        sessions: 'Sessions',
        tools: 'Tools',
        phase1Title: 'Phase 1: Stabilization & Safety',
        phase1Goal: 'Goal: Reduce acute symptoms and establish alliance.',
        step1: 'Establishing therapeutic alliance',
        step1Desc: 'Discussing confidentiality, setting, and expectations.',
        completedOn: 'Completed',
        step2: 'Psychoeducation on anxiety',
        step2Desc: 'Explaining "fight or flight" mechanism, anxiety cycle.',
        step3: 'Grounding techniques training',
        step3Desc: '4-7-8 breathing, 5-4-3-2-1 technique.',
        phase2Title: 'Phase 2: Deep Processing (CBT)',
        phase2Goal: 'Goal: Changing cognitive distortions and behavioral patterns.',
        step4: 'Identifying automatic thoughts',
        step4Desc: 'Keeping a Thought Record.',
        addNextSteps: '+ Add next steps (Exposure, Behavioral Experiments)',
        session1Title: 'Initial Consultation',
        session1Time: 'Feb 14, 10:00 • 50 min',
        btnNotes: 'Notes',
        session2Title: 'Scheduled Session',
        session2Time: 'Feb 21, 10:00 • 50 min',
        btnJoin: 'Join',
        gad7Desc: 'Generalized Anxiety Disorder-7',
        gad7Level: 'Moderate Anxiety',
        gad7Score: '13 / 21 points',
        lastUpdate: 'Last',
        bdiDesc: 'Beck Depression Inventory',
        bdiLevel: 'Minimal',
        bdiScore: '9 / 63 points',
        sleepDiary: 'Sleep Diary',
        sleepDesc: 'Quality and duration monitoring',
        avgWeek: 'Weekly average',
        task1: 'Mood Diary',
        task1Time: '3 days in a row',
        task2: '"Grounding" Technique',
        task2Desc: 'During anxiety attack',
        active: 'Active',
        feedbackScore: '⭐ 5.0',
        feedbackText: '"Very grateful for the session. The breathing techniques really helped last night."',
        insightTitle: 'AI-Insight: Sleep & Anxiety Correlation',
        insightText: 'We noticed that reduced sleep quality (less than 6 hours) correlates 90% with increased anxiety levels the next day.',
        chartMood: 'Mood Dynamics',
        chartSleep: 'Sleep vs Panic Attacks',
        attendance: 'Attendance',
        homework: 'Homework',
        gadLevel: 'GAD-7 Level',
        encryptedNote: '🔒 Encrypted (Zero-Knowledge)',
        noteText: 'Client mentioned sleep improvement. However, anxiety remains at 6/10. Planning to work with CBT "Panic Attacks" protocol next time...',
        event1: 'Session scheduled',
        event2: 'Task completed',
        event3: 'GAD-7 filled',
        event4: 'Account created',
        statusActive: 'Active',
        edit: 'Edit'
    }
};

export function ClientProfileDemo() {
    const { language } = useLanguage();
    const t = uiText[language];

    // IDs for tabs: 0=Profile, 1=Plan, 2=Sessions, 3=Tools, 4=Tasks, 5=Feedback, 6=Analytics, 7=Notes, 8=Timeline
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({ 'step-1': true, 'step-2': true, 'step-4': true });

    const handleCopy = (setter: (val: boolean) => void) => {
        setter(true);
        setTimeout(() => setter(false), 2000);
    };

    const toggleStep = (id: string) => {
        setCompletedSteps(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderTabContent = () => {
        // 'Profile' -> 0
        if (activeTabIdx === 0) {
            return (
                <div className="space-y-6">
                    {/* Booking Code */}
                    <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-700/30 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1">
                                {t.bookingCodeLabel}
                            </div>
                            <div className="font-mono text-lg text-yellow-500 font-bold tracking-wide">
                                C-MLNY1R16-V0SR
                            </div>
                        </div>
                        <button
                            onClick={() => handleCopy(setCopiedCode)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded bg-yellow-900/20 hover:bg-yellow-900/30 text-yellow-600 text-xs font-medium transition-colors border border-yellow-700/30"
                        >
                            {copiedCode ? t.copied : t.copy}
                        </button>
                    </div>

                    {/* Video Link */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white">{t.videoLink}</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-mono">E2EE</span>
                            </div>
                            <button className="text-xs text-slate-500 hover:text-white transition-colors">
                                {t.resetLink}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* Link Field */}
                            <div className="relative group">
                                <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">{t.link}</div>
                                <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                                    <code className="text-sm text-indigo-400 font-mono truncate max-w-[80%]">
                                        https://self-supervision.bravery.academy/call/bravery-Y7j0aH7pcD86
                                    </code>
                                    <button onClick={() => handleCopy(setCopiedLink)} className="text-slate-500 hover:text-white transition-colors">
                                        {copiedLink ? '✓' : '❐'}
                                    </button>
                                </div>
                            </div>

                            {/* Access Code Field */}
                            <div className="relative group">
                                <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">{t.accessCode}</div>
                                <div className="flex items-center justify-between p-3 rounded bg-slate-950 border border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                                    <code className="text-lg text-white font-mono font-bold tracking-widest">
                                        1 4 9 1 7 1
                                    </code>
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        ❐
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-2 rounded border border-slate-700 text-slate-400 text-xs font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            {t.copyAll}
                        </button>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Contacts (E2EE) */}
                        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-white">{t.contacts}</span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-mono">E2EE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowContacts(!showContacts)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showContacts ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                    <button className="text-slate-500 hover:text-white transition-colors">✎</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">EMAIL</div>
                                    <div className={`text-sm ${showContacts ? 'text-white' : 'text-slate-600 blur-[2px] select-none'}`}>
                                        {showContacts ? 'client.email@example.com' : 'client.hidden@secure.net'}
                                    </div>
                                </div>
                                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">PHONE</div>
                                    <div className={`text-sm ${showContacts ? 'text-white' : 'text-slate-600 blur-[2px] select-none'}`}>
                                        {showContacts ? '+380 50 123 45 67' : '+380 XX XXX XX XX'}
                                    </div>
                                </div>
                            </div>

                            {!showContacts && (
                                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-white font-medium bg-slate-900 px-3 py-1 rounded-full border border-white/10 shadow-xl">
                                        {t.clickToDecrypt}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Clinical Data */}
                        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-emerald-400">⚡</span>
                                <span className="text-sm font-semibold text-white">{t.clinicalData}</span>
                            </div>

                            <div className="mb-4">
                                <div className="text-xs text-slate-500 mb-1">{t.tagsLabel}</div>
                                <div className="text-sm text-slate-600 italic">{t.noTags}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                                    <div className="text-[10px] text-slate-500 uppercase">{t.sessions}</div>
                                    <div className="text-2xl font-bold text-white mt-1">2</div>
                                </div>
                                <div className="p-3 rounded bg-slate-950 border border-slate-800">
                                    <div className="text-[10px] text-slate-500 uppercase">{t.tools}</div>
                                    <div className="text-2xl font-bold text-white mt-1">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        // 'Therapy Plan' -> 1
        if (activeTabIdx === 1) {
            return (
                <div className="space-y-8 pr-2">
                    {/* Phase 1 */}
                    <div className="relative pl-6 border-l-2 border-indigo-500/30">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        <div className="mb-4">
                            <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">{t.phase1Title}</div>
                            <div className="text-xs text-indigo-300">{t.phase1Goal}</div>
                        </div>

                        <div className="space-y-3">
                            <div onClick={() => toggleStep('step-1')} className="group flex items-start gap-4 cursor-pointer p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-all hover:border-indigo-500/30">
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${completedSteps['step-1'] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 group-hover:border-indigo-500'}`}>
                                    {completedSteps['step-1'] && <span className="text-xs text-white">✓</span>}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium transition-colors ${completedSteps['step-1'] ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.step1}</div>
                                    <div className="text-[10px] text-slate-500 mt-1">{t.step1Desc}</div>
                                </div>
                                {completedSteps['step-1'] && <span className="ml-auto text-[10px] text-emerald-500 font-mono">{t.completedOn} 10.02</span>}
                            </div>

                            <div onClick={() => toggleStep('step-2')} className="group flex items-start gap-4 cursor-pointer p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-all hover:border-indigo-500/30">
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${completedSteps['step-2'] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 group-hover:border-indigo-500'}`}>
                                    {completedSteps['step-2'] && <span className="text-xs text-white">✓</span>}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium transition-colors ${completedSteps['step-2'] ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.step2}</div>
                                    <div className="text-[10px] text-slate-500 mt-1">{t.step2Desc}</div>
                                </div>
                                {completedSteps['step-2'] && <span className="ml-auto text-[10px] text-emerald-500 font-mono">{t.completedOn} 14.02</span>}
                            </div>

                            <div onClick={() => toggleStep('step-3')} className="group flex items-start gap-4 cursor-pointer p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-all hover:border-indigo-500/30">
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${completedSteps['step-3'] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 group-hover:border-indigo-500'}`}>
                                    {completedSteps['step-3'] && <span className="text-xs text-white">✓</span>}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium transition-colors ${completedSteps['step-3'] ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.step3}</div>
                                    <div className="text-[10px] text-slate-500 mt-1">{t.step3Desc}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative pl-6 border-l-2 border-slate-700">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                        <div className="mb-4">
                            <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">{t.phase2Title}</div>
                            <div className="text-xs text-slate-400">{t.phase2Goal}</div>
                        </div>

                        <div className="space-y-3">
                            <div onClick={() => toggleStep('step-4')} className="group flex items-start gap-4 cursor-pointer p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-all hover:border-indigo-500/30">
                                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${completedSteps['step-4'] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 group-hover:border-indigo-500'}`}>
                                    {completedSteps['step-4'] && <span className="text-xs text-white">✓</span>}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium transition-colors ${completedSteps['step-4'] ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.step4}</div>
                                    <div className="text-[10px] text-slate-500 mt-1">{t.step4Desc}</div>
                                </div>
                                {completedSteps['step-4'] && <span className="ml-auto text-[10px] text-emerald-500 font-mono">{t.completedOn} 20.02</span>}
                            </div>

                            <div className="p-3 rounded-lg border border-dashed border-slate-800 text-center text-xs text-slate-500">
                                {t.addNextSteps}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        // 'Sessions (2)' -> 2
        if (activeTabIdx === 2) {
            return (
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center group hover:border-indigo-500/30 transition-colors">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-xl">✅</div>
                            <div>
                                <div className="font-semibold text-white">{t.session1Title}</div>
                                <div className="text-xs text-slate-500">{t.session1Time}</div>
                            </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                            {t.btnNotes}
                        </button>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center group hover:border-indigo-500/30 transition-colors">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-xl">📅</div>
                            <div>
                                <div className="font-semibold text-white">{t.session2Title}</div>
                                <div className="text-xs text-slate-500">{t.session2Time}</div>
                            </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                            {t.btnJoin}
                        </button>
                    </div>
                </div>
            );
        }
        // 'Tools (3)' -> 3
        if (activeTabIdx === 3) {
            return (
                <div className="space-y-4">
                    {/* GAD-7 */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 transition-colors hover:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-lg font-bold text-white">GAD-7</div>
                                <div className="text-xs text-slate-500">{t.gad7Desc}</div>
                            </div>
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                {t.gad7Level}
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                            <div className="w-[65%] h-full bg-gradient-to-r from-emerald-500 to-amber-500" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>{t.gad7Score}</span>
                            <span>{t.lastUpdate}: 14.02</span>
                        </div>
                    </div>

                    {/* BDI-II */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 transition-colors hover:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-lg font-bold text-white">BDI-II</div>
                                <div className="text-xs text-slate-500">{t.bdiDesc}</div>
                            </div>
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                {t.bdiLevel}
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                            <div className="w-[15%] h-full bg-emerald-500" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>{t.bdiScore}</span>
                            <span>{t.lastUpdate}: 10.02</span>
                        </div>
                    </div>

                    {/* Sleep Diary */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 transition-colors hover:border-slate-700 flex items-center justify-between">
                        <div>
                            <div className="text-lg font-bold text-white">{t.sleepDiary}</div>
                            <div className="text-xs text-slate-500">{t.sleepDesc}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-400">7.2 h</div>
                            <div className="text-[10px] text-slate-500">{t.avgWeek}</div>
                        </div>
                    </div>
                </div>
            );
        }
        // 'Tasks' -> 4
        if (activeTabIdx === 4) {
            return (
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                        <div className="w-6 h-6 rounded border-2 border-slate-700 flex items-center justify-center text-transparent hover:border-indigo-500 cursor-pointer">✓</div>
                        <div className="flex-1 opacity-50">
                            <div className="text-sm font-medium text-slate-300 line-through">{t.task1}</div>
                            <div className="text-[10px] text-slate-500">{t.task1Time}</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                        <div className="w-6 h-6 rounded border-2 border-indigo-500/50 flex items-center justify-center text-transparent hover:border-indigo-500 cursor-pointer"></div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-white">{t.task2}</div>
                            <div className="text-[10px] text-indigo-400">{t.task2Desc}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{t.active}</span>
                    </div>
                </div>
            );
        }
        // 'Feedback' -> 5
        if (activeTabIdx === 5) {
            return (
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-4xl mb-3">{t.feedbackScore}</div>
                    <p className="text-sm text-slate-300 italic mb-4">{t.feedbackText}</p>
                    <div className="text-xs text-slate-500">- 15.02.2026</div>
                </div>
            );
        }
        // 'Analytics' -> 6
        if (activeTabIdx === 6) {
            return (
                <div className="space-y-6">
                    {/* Correlation Insight */}
                    <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden">
                        <div className="flex gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{t.insightTitle}</div>
                                <div className="text-xs text-indigo-200/70 mt-1">
                                    {t.insightText}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Charts Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mood Dynamics with Gradient Area */}
                        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-48">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.chartMood}</div>
                                <div className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-mono">+15%</div>
                            </div>

                            <div className="flex-1 flex items-end gap-1 relative">
                                {/* Background grid lines */}
                                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-20">
                                    {[1, 2, 3].map(i => <div key={i} className="h-px bg-slate-700 w-full" />)}
                                </div>

                                {[35, 45, 40, 60, 55, 75, 80].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.1, type: 'spring' }}
                                        className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-sm relative group cursor-crosshair opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                            Day {i + 1}: {h}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Sleep vs Anxiety Scatter */}
                        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col h-48">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.chartSleep}</div>
                            <div className="flex-1 relative border-l border-b border-slate-700 m-2">
                                {/* Data points */}
                                {[
                                    { x: 20, y: 80, label: 'Bad sleep' },
                                    { x: 80, y: 20, label: 'Good sleep' },
                                    { x: 40, y: 60 },
                                    { x: 60, y: 40 },
                                    { x: 30, y: 70 },
                                    { x: 70, y: 30 },
                                ].map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="absolute w-2 h-2 rounded-full bg-orange-400 hover:bg-orange-300 hover:scale-150 transition-transform cursor-pointer shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                                        style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
                                    >
                                        {p.label && (
                                            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[8px] text-slate-500 whitespace-nowrap opacity-0 md:group-hover:opacity-100">
                                                {p.label}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Completion / Progress */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                            <div className="text-2xl font-bold text-white mb-1">85%</div>
                            <div className="text-[10px] text-slate-500 uppercase">{t.attendance}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                            <div className="text-2xl font-bold text-white mb-1">9/12</div>
                            <div className="text-[10px] text-slate-500 uppercase">{t.homework}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                            <div className="text-2xl font-bold text-emerald-400 mb-1">-40%</div>
                            <div className="text-[10px] text-slate-500 uppercase">{t.gadLevel}</div>
                        </div>
                    </div>
                </div>
            );
        }
        // 'Notes' -> 7
        if (activeTabIdx === 7) {
            return (
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-sm font-mono leading-relaxed">
                    <span className="text-emerald-500 mb-2 block">{t.encryptedNote}</span>
                    {t.noteText}
                </div>
            );
        }
        // 'Timeline' -> 8
        if (activeTabIdx === 8) {
            return (
                <div className="space-y-6 relative border-l border-slate-800 ml-3 pl-6 py-2">
                    {[
                        { title: t.event1, date: 'Today, 14:30', icon: '📅' },
                        { title: t.event2, date: 'Yesterday, 20:15', icon: '✅' },
                        { title: t.event3, date: '14.02, 09:00', icon: '📝' },
                        { title: t.event4, date: '10.02, 11:20', icon: '👤' },
                    ].map((event, i) => (
                        <div key={i} className="relative">
                            <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">
                                {event.icon}
                            </div>
                            <div className="text-sm font-medium text-white">{event.title}</div>
                            <div className="text-xs text-slate-500">{event.date}</div>
                        </div>
                    ))}
                </div>
            );
        }
        return null; // fallback
    };

    return (
        <div className="w-full h-full min-h-[500px] bg-[#0B1120] text-slate-300 font-sans selection:bg-emerald-500/30 flex flex-col rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0B1120]">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">C-MLNY1R16-V0SR</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
                            {t.statusActive}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">ID: 21731951...</span>
                    </div>
                </div>
                <button className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700">
                    {t.edit}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center px-6 border-b border-slate-800 bg-[#0B1120] overflow-x-auto no-scrollbar">
                {t.tabs.map((tabLabel, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTabIdx(idx)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTabIdx === idx
                            ? 'text-emerald-500 border-emerald-500'
                            : 'text-slate-500 border-transparent hover:text-slate-300'
                            }`}
                    >
                        {tabLabel}
                    </button>
                ))}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0F172A]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTabIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
