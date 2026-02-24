'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { content } from '../lib/content';
import { useHints } from '../hooks/useHints';
import { PremiumPulse } from './ui/PremiumPulse';
import { InlineHint } from './ui/InlineHint';

// ================================================================
// Content from FEATURES_OVERVIEW.md — properly structured
// ================================================================

interface Tool {
    icon: string;
    title: string;
    description: string;
}

interface ToolCategory {
    emoji: string;
    title: string;
    tools: Tool[];
}

const currentFeatures: Record<'uk' | 'en', ToolCategory[]> = {
    uk: [
        {
            emoji: '🏥',
            title: 'Кабінет психолога',
            tools: [
                { icon: '👥', title: 'Список клієнтів', description: 'Безпечний список із псевдонімами, швидкий пошук на боці браузера.' },
                { icon: '📅', title: 'Календар і розклад', description: 'Календар сесій (онлайн/офлайн), швидке відкриття Live Session.' },
                { icon: '📋', title: 'Картка сесії', description: 'Інформація про сесію, посилання на клієнта — все в encryptedBlob.' },
            ]
        },
        {
            emoji: '📝',
            title: 'Нотатки та документація',
            tools: [
                { icon: '✏️', title: 'Вільні нотатки', description: 'Автозбереження кожні кілька секунд, тільки зашифрований вигляд.' },
                { icon: '🏷️', title: 'SOAP-нотатки', description: 'Структура Subjective/Objective/Assessment/Plan з двоетапним редагуванням.' },
                { icon: '☑️', title: 'Чек-листи сесії', description: 'Структурування сесії з інтеграцією у Live Session на дзвінку.' },
                { icon: '⚡', title: 'Генератор нотаток з інструментів', description: 'Результати тестів автоматично формують основу для SOAP.' },
            ]
        },
        {
            emoji: '🧰',
            title: 'Інструменти та автоматизація',
            tools: [
                { icon: '📊', title: 'Психологічні інструменти', description: 'BDI-II, Y-BOCS, DOCS, SMER-щоденник — з авто-підрахунком.' },
                { icon: '📈', title: 'Динаміка інструментів', description: 'Графіки зміни балів у часі, побудовані в браузері після розшифровки.' },
                { icon: '⏱️', title: 'КПТ-годинник', description: 'Ділить сесію на етапи: agenda, середина, підсумки, домашнє завдання.' },
                { icon: '⏳', title: 'Session Timer', description: 'Прогрес-бар тривалості з попередженням за 5 хв до кінця.' },
                { icon: '💾', title: 'Auto-save & Sync', description: 'Фоновий Sync Service, жодних ручних "Save".' },
            ]
        },
        {
            emoji: '🎥',
            title: 'Безпечні відеодзвінки',
            tools: [
                { icon: '📹', title: 'Відеопанель', description: 'Захищений токен для кімнати, старт без логінів в сторонні сервіси.' },
                { icon: '⚙️', title: 'Налаштування дзвінка', description: 'Вибір камери, мікрофона, шумоподавлення, якість відео.' },
                { icon: '📡', title: 'Індикатор якості', description: 'Візуальний індикатор з\'єднання та кількість учасників.' },
                { icon: '⌨️', title: 'Гарячі клавіші', description: 'Ctrl+M мікрофон, Ctrl+E камера, Ctrl+1-5 вкладки панелі.' },
            ]
        },
        {
            emoji: '🖥️',
            title: 'Інструменти на дзвінку',
            tools: [
                { icon: '🪟', title: 'Плаваюча панель', description: 'Нотатки, SOAP, інструменти, клієнт, чек-листи — поверх відео.' },
                { icon: '🕐', title: 'КПТ-годинник на дзвінку', description: 'Мінімізоване вікно з етапами, не заважає відео.' },
                { icon: '👁️', title: 'Secure Blur', description: 'Розмиття при неактивності, panic mode для захисту даних.' },
            ]
        },
        {
            emoji: '📉',
            title: 'Аналітика та статистика',
            tools: [
                { icon: '📊', title: 'Аналітика практики', description: 'Кількість сесій, активність по днях, топ інструментів.' },
                { icon: '📈', title: 'Динаміка по клієнту', description: 'Графіки зміни тривоги, депресії, обсесій у часі.' },
                { icon: '🏢', title: 'Аналітика для клінік', description: 'Агреговані показники без PII — тільки сумарні графіки.' },
            ]
        },
        {
            emoji: '🤖',
            title: 'AI-помічник / AI-супервізор',
            tools: [
                { icon: '📋', title: 'Pre-session Briefing', description: 'Нагадування: інструменти, бали, на що звернути увагу.' },
                { icon: '💡', title: 'On-call Hints', description: 'Рекомендації яку вкладку відкрити, нагадування про ризики.' },
                { icon: '🧠', title: 'Post-session Reflection', description: 'Рефлексія: що було сильним, що покращити, що на супервізію.' },
            ]
        },
    ],
    en: [
        {
            emoji: '🏥',
            title: 'Psychologist Cabinet',
            tools: [
                { icon: '👥', title: 'Client List', description: 'Secure list with pseudonyms, browser-side search.' },
                { icon: '📅', title: 'Calendar & Schedule', description: 'Session calendar (online/offline), quick Live Session launch.' },
                { icon: '📋', title: 'Session Card', description: 'Session info, client context — all in encryptedBlob.' },
            ]
        },
        {
            emoji: '📝',
            title: 'Notes & Documentation',
            tools: [
                { icon: '✏️', title: 'Free-text Notes', description: 'Auto-save every few seconds, encrypted storage only.' },
                { icon: '🏷️', title: 'SOAP Notes', description: 'Subjective/Objective/Assessment/Plan with two-stage editing.' },
                { icon: '☑️', title: 'Session Checklists', description: 'Structure sessions with Live Session integration.' },
                { icon: '⚡', title: 'Notes Generator', description: 'Test results automatically form SOAP note drafts.' },
            ]
        },
        {
            emoji: '🧰',
            title: 'Tools & Automation',
            tools: [
                { icon: '📊', title: 'Psychological Tools', description: 'BDI-II, Y-BOCS, DOCS, mood diaries — with auto-scoring.' },
                { icon: '📈', title: 'Tool Dynamics', description: 'Score change graphs over time, built in browser after decryption.' },
                { icon: '⏱️', title: 'CBT Timer', description: 'Divides sessions into phases: agenda, middle, summary, homework.' },
                { icon: '⏳', title: 'Session Timer', description: 'Duration progress bar with 5-min warning before end.' },
                { icon: '💾', title: 'Auto-save & Sync', description: 'Background Sync, no manual "Save" needed.' },
            ]
        },
        {
            emoji: '🎥',
            title: 'Secure Video Calls',
            tools: [
                { icon: '📹', title: 'Video Panel', description: 'Secure token per room, no third-party logins needed.' },
                { icon: '⚙️', title: 'Call Settings', description: 'Camera, mic, noise cancellation, video quality selection.' },
                { icon: '📡', title: 'Quality Indicator', description: 'Visual connection quality and participant count.' },
                { icon: '⌨️', title: 'Hotkeys', description: 'Ctrl+M mic, Ctrl+E camera, Ctrl+1-5 panel tabs.' },
            ]
        },
        {
            emoji: '🖥️',
            title: 'On-call Tools',
            tools: [
                { icon: '🪟', title: 'Floating Panel', description: 'Notes, SOAP, tools, client, checklists — over video.' },
                { icon: '🕐', title: 'CBT Timer Widget', description: 'Minimizable window with session phases.' },
                { icon: '👁️', title: 'Secure Blur', description: 'Blur on inactivity, panic mode for data protection.' },
            ]
        },
        {
            emoji: '📉',
            title: 'Analytics & Statistics',
            tools: [
                { icon: '📊', title: 'Practice Analytics', description: 'Session counts, activity by day, top tools used.' },
                { icon: '📈', title: 'Client Dynamics', description: 'Anxiety, depression, OCD score graphs over time.' },
                { icon: '🏢', title: 'Clinic Analytics', description: 'Aggregated metrics without PII — summary graphs only.' },
            ]
        },
        {
            emoji: '🤖',
            title: 'AI Assistant / Supervisor',
            tools: [
                { icon: '📋', title: 'Pre-session Briefing', description: 'Reminders: tools used, scores, focus points.' },
                { icon: '💡', title: 'On-call Hints', description: 'Recommendations on tabs to open, risk reminders.' },
                { icon: '🧠', title: 'Post-session Reflection', description: 'What was strong, what to improve, what for supervision.' },
            ]
        },
    ],
};

// ================================================================
// Roadmap items from FEATURES_OVERVIEW.md
// ================================================================

const roadmapItems: Record<'uk' | 'en', { category: string; items: Tool[] }[]> = {
    uk: [
        {
            category: 'Глибша автоматизація',
            items: [
                { icon: '📝', title: 'Smart SOAP Notes', description: 'Автоматичні чернетки на основі інструментів та динаміки.' },
                { icon: '🔄', title: 'Автоматизовані Workflows', description: 'Тригери: після 1-ї сесії → BDI-II, високий ризик → план безпеки.' },
                { icon: '💰', title: 'Білінг та інвойси', description: 'Автоматична генерація рахунків без PII в тексті.' },
            ]
        },
        {
            category: 'Розширення AI-супервізора',
            items: [
                { icon: '🔍', title: 'Глибокі патерни', description: '«Часті переноси», «нестабільна динаміка», «зростання навантаження».' },
                { icon: '🧠', title: 'AI Co-pilot на сесії', description: 'Підказки: які питання поставити, які техніки запропонувати.' },
            ]
        },
        {
            category: 'Більше аналітики',
            items: [
                { icon: '📊', title: 'Когортний аналіз', description: 'Порівняння груп клієнтів за типом запиту без PII.' },
                { icon: '📈', title: 'Розширена аналітика для компаній', description: 'Прогноз впливу програм на вигорання та плинність кадрів.' },
                { icon: '📉', title: 'Інтерактивні дашборди', description: 'Готові «слайди» для звітності клінік та HR.' },
            ]
        },
        {
            category: 'Групові формати',
            items: [
                { icon: '👥', title: 'Групові сесії', description: 'Кілька клієнтів в одній структурі, окремі чек-листи.' },
                { icon: '🤝', title: 'Спільний доступ клініки', description: 'Технічні дані між командою без змісту нотаток.' },
            ]
        },
        {
            category: 'UX-покращення',
            items: [
                { icon: '⚡', title: 'Кастомні панелі', description: 'Вибір, які вкладки показувати, ще більше гарячих клавіш.' },
                { icon: '🎯', title: 'Focus Mode', description: 'Мінімалістичний режим: тільки відео, таймер і ключові пункти.' },
                { icon: '📱', title: 'Мобільний додаток', description: 'Повний функціонал на iOS та Android.' },
                { icon: '🔗', title: 'API для інтеграцій', description: 'Підключення EHR та зовнішніх сервісів.' },
                { icon: '📧', title: 'Захищена пошта', description: 'E2E зашифрований обмін повідомленнями з клієнтами.' },
                { icon: '🎥', title: 'Запис сесій', description: 'Захищений запис з авто-транскрипцією.' },
                { icon: '📐', title: 'Конструктор протоколів', description: 'Створення власних терапевтичних протоколів.' },
                { icon: '📖', title: 'Щоденник клієнта', description: 'Захищений щоденник настрою для клієнтів.' },
                { icon: '🔐', title: 'Аудит-логи', description: 'Повний журнал дій для GDPR/HIPAA compliance.' },
            ]
        },
    ],
    en: [
        {
            category: 'Deeper Automation',
            items: [
                { icon: '📝', title: 'Smart SOAP Notes', description: 'Auto-drafts based on tools and dynamics.' },
                { icon: '🔄', title: 'Automated Workflows', description: 'Triggers: after 1st session → BDI-II, high risk → safety plan.' },
                { icon: '💰', title: 'Billing & Invoices', description: 'Automatic invoice generation without PII.' },
            ]
        },
        {
            category: 'AI Supervisor Expansion',
            items: [
                { icon: '🔍', title: 'Deep Patterns', description: '"Frequent transfers", "unstable dynamics", "growing load".' },
                { icon: '🧠', title: 'AI Co-pilot on Session', description: 'Hints: what questions to ask, what techniques to suggest.' },
            ]
        },
        {
            category: 'More Analytics',
            items: [
                { icon: '📊', title: 'Cohort Analysis', description: 'Compare client groups by request type without PII.' },
                { icon: '📈', title: 'Extended Corporate Analytics', description: 'Impact forecast on burnout and turnover.' },
                { icon: '📉', title: 'Interactive Dashboards', description: 'Ready-made slides for clinic and HR reporting.' },
            ]
        },
        {
            category: 'Group Formats',
            items: [
                { icon: '👥', title: 'Group Sessions', description: 'Multiple clients in one structure, separate checklists.' },
                { icon: '🤝', title: 'Clinic Shared Access', description: 'Technical data between team without note contents.' },
            ]
        },
        {
            category: 'UX Improvements',
            items: [
                { icon: '⚡', title: 'Custom Panels', description: 'Choose which tabs to show, more hotkeys.' },
                { icon: '🎯', title: 'Focus Mode', description: 'Minimalist mode: only video, timer and key points.' },
                { icon: '📱', title: 'Mobile App', description: 'Full functionality on iOS and Android.' },
                { icon: '🔗', title: 'API Integrations', description: 'Connect EHR and external services.' },
                { icon: '📧', title: 'Secure Messaging', description: 'E2E encrypted client communication.' },
                { icon: '🎥', title: 'Session Recording', description: 'Secure recording with auto-transcription.' },
                { icon: '📐', title: 'Protocol Builder', description: 'Create custom therapeutic protocols.' },
                { icon: '📖', title: 'Client Journal', description: 'Secure mood journal for clients.' },
                { icon: '🔐', title: 'Audit Logs', description: 'Full action log for GDPR/HIPAA compliance.' },
            ]
        },
    ],
};

// ================================================================
// Component
// ================================================================

export function ToolsCatalog() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = content[language][role];
    const features = currentFeatures[language];
    const roadmap = roadmapItems[language];

    // Hint System
    const hoverHint = useHints('tools-hover');

    const totalCurrentTools = features.reduce((sum, cat) => sum + cat.tools.length, 0);
    const totalRoadmapItems = roadmap.reduce((sum, cat) => sum + cat.items.length, 0);

    return (
        <section id="tools-catalog-block" className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-900/8 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-900/8 blur-[120px] rounded-full" />
                <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-emerald-900/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                {/* ===== HEADER ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-emerald-400 font-medium mb-4">
                        {language === 'uk' ? `${totalCurrentTools} інструментів доступно` : `${totalCurrentTools} tools available`}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight balanced-text px-2">
                        {t.features.title}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {language === 'uk'
                            ? 'Повний огляд того, що вже працює сьогодні та що на підході.'
                            : 'Complete overview of what works today and what\'s coming next.'}
                    </p>
                </motion.div>

                {/* ===== CURRENT FEATURES BY CATEGORY ===== */}
                <div className="space-y-12 mb-20 relative">

                    {/* V5 Inline Hint (Above grid) */}
                    <div className="hidden md:block absolute -top-8 right-0 text-right">
                        <InlineHint show={hoverHint.showHint} language={language} type="tap" />
                    </div>
                    <div className="md:hidden mb-4">
                        <InlineHint show={hoverHint.showHint} language={language} type="tap" />
                    </div>

                    {features.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.05 }}
                        >
                            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                                <span className="text-2xl">{category.emoji}</span>
                                {category.title}
                                <span className="text-xs font-normal text-slate-500">({category.tools.length})</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.tools.map((tool, i) => (
                                    <motion.div
                                        key={tool.title}
                                        ref={catIdx === 0 && i === 0 ? hoverHint.ref as any : undefined}
                                        onMouseEnter={hoverHint.dismissHint}
                                        onTouchStart={hoverHint.dismissHint}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.03 }}
                                        className="relative p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-500 group hover:shadow-[0_0_20px_rgba(16,185,129,0.07)] overflow-hidden"
                                    >
                                        {/* Hint Pulse (Only on first item if unread) */}
                                        {catIdx === 0 && i === 0 && hoverHint.showHint && <PremiumPulse />}

                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative flex items-start gap-3">
                                            <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform shrink-0">
                                                {tool.icon}
                                            </span>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                                                    {tool.title}
                                                </h4>
                                                <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ===== DIVIDER ===== */}
                <div className="relative mb-16">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-slate-950 px-6 text-sm font-medium text-purple-400">
                            {language === 'uk' ? `Coming Soon — ${totalRoadmapItems} нових інструментів` : `Coming Soon — ${totalRoadmapItems} new tools`}
                        </span>
                    </div>
                </div>

                {/* ===== ROADMAP ===== */}
                <div className="space-y-10">
                    {roadmap.map((category, catIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.05 }}
                        >
                            <h3 className="text-base font-bold text-purple-300/80 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                {category.category}
                                <span className="text-xs font-normal text-slate-600">({category.items.length})</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                {category.items.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.02 }}
                                        className="p-3 rounded-lg bg-slate-900/20 border border-white/[0.03] hover:border-purple-500/15 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-lg opacity-40 group-hover:opacity-80 transition-opacity shrink-0">
                                                {item.icon}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-medium text-slate-400 text-xs group-hover:text-slate-300 transition-colors sm:truncate">
                                                    {item.title}
                                                </h4>
                                                <p className="text-slate-600 text-[11px] sm:text-[10px] leading-relaxed sm:truncate">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
