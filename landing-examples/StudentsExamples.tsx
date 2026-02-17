import React, { useState } from 'react';
import { LandingExampleCard, Lang } from './LandingExampleCard';

type ToggleItem = {
    id: string;
    label: { uk: string; en: string };
};

const languageLabels: Record<Lang, string> = {
    uk: 'Українська',
    en: 'English',
};

export const StudentsExamplesShowcase: React.FC = () => {
    const [language, setLanguage] = useState<Lang>('uk');

    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
        psychoeducation: true,
        homework: false,
        risk: false,
    });

    const [focusArea, setFocusArea] = useState<'all' | 'risk' | 'homework'>('all');
    const [aiInsightIndex, setAiInsightIndex] = useState(0);

    const checklistItems: ToggleItem[] = [
        {
            id: 'psychoeducation',
            label: {
                uk: 'Оцінка розуміння КПТ‑моделі',
                en: 'Assess CBT model understanding',
            },
        },
        {
            id: 'homework',
            label: {
                uk: 'Домашнє завдання сформульовано чітко',
                en: 'Homework assignment is clearly defined',
            },
        },
        {
            id: 'risk',
            label: {
                uk: 'Перевірити суїцидальний / кризовий ризик',
                en: 'Screen for suicidal / crisis risk',
            },
        },
    ];

    const aiInsights: { uk: string; en: string }[] = [
        {
            uk: 'AI‑супервізор: у клієнта третя сесія поспіль із високим показником напруги. Запропонуй більше часу на нормалізацію й психоедукацію перед експозиціями.',
            en: 'AI supervisor: this is the third session in a row with high tension scores. Consider spending more time on psychoeducation and normalization before exposures.',
        },
        {
            uk: 'AI‑супервізор: домашні завдання виконуються частково. Запропонуй разом спростити формулювання та зменшити обсяг завдань.',
            en: 'AI supervisor: homework is completed only partially. Suggest simplifying the formulation and reducing the workload together.',
        },
        {
            uk: 'AI‑супервізор: клієнт часто згадує тему виснаження. Перевір, чи не потрібне диференційоване обстеження (вигорання, депресія, тривога).',
            en: 'AI supervisor: the client often mentions exhaustion. Check whether further assessment is needed (burnout, depression, anxiety).',
        },
    ];

    const t = (obj: { uk: string; en: string }) => (language === 'uk' ? obj.uk : obj.en);

    const toggleChecklistItem = (id: string) => {
        setChecklistState((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const cycleInsight = () => {
        setAiInsightIndex((prev) => (prev + 1) % aiInsights.length);
    };

    return (
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-6 md:px-6 md:py-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        {language === 'uk' ? 'Для студентів та інтернів' : 'For students and trainees'}
                    </p>
                    <h2 className="mt-1 text-xl md:text-2xl font-bold text-white">
                        {language === 'uk'
                            ? 'Як виглядає кабінет для клінічної практики'
                            : 'What the supervision-ready workspace looks like'}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-2xl">
                        {language === 'uk'
                            ? 'Приклади екранів, які допомагають студентам збирати кейси, тренувати КПТ‑мислення та отримувати м’яку AI‑супервізію без тиску.'
                            : 'Screens that help students collect training cases, practice CBT thinking, and receive gentle AI supervision without pressure.'}
                    </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1">
                    <span className="ml-1 text-[11px] text-slate-400">
                        {language === 'uk' ? 'Мова прикладів' : 'Example language'}
                    </span>
                    {(['uk', 'en'] as Lang[]).map((lng) => (
                        <button
                            key={lng}
                            type="button"
                            onClick={() => setLanguage(lng)}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                                language === lng
                                    ? 'bg-emerald-500 text-slate-950'
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            {languageLabels[lng]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Приклад 1: Живий чек‑лист для навчальної сесії */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Студент · 3 курс / магістратура',
                        en: 'Student · 3rd year / graduate',
                    }}
                    title={{
                        uk: 'Живий чек‑лист під час сесії',
                        en: 'Live checklist during the session',
                    }}
                    subtitle={{
                        uk: 'Структурує перші сесії та нагадує, що саме обов’язково запитати й пояснити клієнту.',
                        en: 'Structures early sessions and gently reminds what to ask and explain to the client.',
                    }}
                    aiTagline={{
                        uk: 'AI‑супервізор підсвічує, які пункти часто пропускаються саме у ваших сесіях.',
                        en: 'AI supervisor highlights which checklist items you tend to skip in your sessions.',
                    }}
                    badges={[
                        {
                            uk: 'Під час відеодзвінка',
                            en: 'Alongside video call',
                        },
                        {
                            uk: 'Фокус на базових навичках',
                            en: 'Focus on basic skills',
                        },
                    ]}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[11px] text-slate-400">
                            {language === 'uk'
                                ? 'Клікни по пункту, щоб відмітити його під час сесії:'
                                : 'Click an item to mark it as covered during the session:'}
                        </p>
                        <div className="space-y-1.5">
                            {checklistItems.map((item) => {
                                const active = checklistState[item.id];
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => toggleChecklistItem(item.id)}
                                        className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-2 text-left text-[11px] transition ${
                                            active
                                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100'
                                                : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-emerald-500/40 hover:bg-slate-900'
                                        }`}
                                    >
                                        <span className="pr-2">{t(item.label)}</span>
                                        <span
                                            className={`h-4 w-4 rounded-full border text-[10px] flex items-center justify-center ${
                                                active
                                                    ? 'border-emerald-400 bg-emerald-500/40 text-slate-950'
                                                    : 'border-slate-500 text-slate-500'
                                            }`}
                                        >
                                            {active ? '✓' : ''}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Цей блок відкривається у плаваючому вікні поруч із відеодзвінком і не потрапляє в запис.'
                                : 'This panel floats next to the video call and is never part of any recording.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* Приклад 2: Безпечний відеодзвінок для навчальних кейсів */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Студент · навчальна супервізія',
                        en: 'Student · training supervision',
                    }}
                    title={{
                        uk: 'Захищений відеодзвінок без запису',
                        en: 'Secure video call without recording',
                    }}
                    subtitle={{
                        uk: 'Студент бачить просту панель: підключення, якість зв’язку, статус запису (за замовчуванням вимкнено).',
                        en: 'The student sees a simple panel: connection quality, call status, recording status (disabled by default).',
                    }}
                    aiTagline={{
                        uk: 'AI підкаже, чи достатня якість зв’язку для експозицій / рольових ігор.',
                        en: 'AI suggests whether connection quality is sufficient for exposures or role‑plays.',
                    }}
                    badges={[
                        {
                            uk: 'End‑to‑end шифрування',
                            en: 'End‑to‑end encryption',
                        },
                        {
                            uk: 'Без автоматичного запису',
                            en: 'No auto recording',
                        },
                    ]}
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-[11px] flex items-center justify-center text-emerald-300">
                                    ●
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-100">
                                        {language === 'uk' ? 'Сесія в ефірі' : 'Session live'}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        {language === 'uk'
                                            ? 'З’єднання зашифроване, запис вимкнено'
                                            : 'Encrypted connection, recording disabled'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1 text-[10px]">
                                    <span className="h-1.5 w-1 rounded-full bg-emerald-400" />
                                    <span className="h-2.5 w-1 rounded-full bg-emerald-400" />
                                    <span className="h-3.5 w-1 rounded-full bg-emerald-200" />
                                    <span className="h-5 w-1 rounded-full bg-emerald-100" />
                                </div>
                                <span className="text-[10px] text-emerald-300">
                                    {language === 'uk' ? 'Якість добра' : 'Quality good'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                            <span className="text-[11px] text-slate-300">
                                {language === 'uk' ? 'Статус запису' : 'Recording status'}
                            </span>
                            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400 border border-slate-700">
                                {language === 'uk' ? 'Вимкнено · за замовчуванням' : 'Disabled · by default'}
                            </span>
                        </div>

                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'На супервізії студент може показати лише свою частину екрана з нотатками та чек‑листами – без відео клієнта.'
                                : 'During supervision the student can share only their notes and checklists – never the client’s video.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* Приклад 3: AI‑супервізор для рефлексії після сесії */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Студент · після сесії',
                        en: 'Student · post‑session',
                    }}
                    title={{
                        uk: 'AI‑супервізор допомагає рефлексувати',
                        en: 'AI supervisor for structured reflection',
                    }}
                    subtitle={{
                        uk: 'Студент обирає, на чому хоче зробити акцент: структура сесії, формулювання думок чи робота з емоціями.',
                        en: 'The student selects what to focus on: session structure, thought formulation, or emotional work.',
                    }}
                    aiTagline={{
                        uk: 'AI допомагає ставити собі «правильні запитання», а не оцінює студента.',
                        en: 'AI suggests better self‑questions instead of grading the student.',
                    }}
                    badges={[
                        {
                            uk: 'Післясесійний щоденник',
                            en: 'Post‑session journal',
                        },
                        {
                            uk: 'Фокус на навичках',
                            en: 'Skill‑oriented',
                        },
                    ]}
                >
                    <div className="space-y-2">
                        <div className="flex gap-1.5">
                            {(['all', 'homework', 'risk'] as const).map((mode) => {
                                const labels: Record<typeof mode, { uk: string; en: string }> = {
                                    all: {
                                        uk: 'Загальний огляд',
                                        en: 'General overview',
                                    },
                                    homework: {
                                        uk: 'Домашнє завдання',
                                        en: 'Homework',
                                    },
                                    risk: {
                                        uk: 'Ризики / безпека',
                                        en: 'Risk / safety',
                                    },
                                };
                                const active = focusArea === mode;
                                return (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setFocusArea(mode)}
                                        className={`flex-1 rounded-full border px-2 py-1.5 text-[10px] transition ${
                                            active
                                                ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                                                : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-emerald-500/40'
                                        }`}
                                    >
                                        {t(labels[mode])}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5 text-[11px] text-emerald-100">
                            <p className="mb-1 font-medium">
                                {language === 'uk' ? 'AI‑рефлексія:' : 'AI reflection:'}
                            </p>
                            <p className="text-[11px] leading-relaxed">
                                {t(aiInsights[aiInsightIndex])}
                            </p>
                            <button
                                type="button"
                                onClick={cycleInsight}
                                className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-slate-950/40 px-2.5 py-1 text-[10px] text-emerald-200 hover:bg-emerald-500/10"
                            >
                                {language === 'uk' ? 'Інша підказка' : 'Another suggestion'}
                            </button>
                        </div>

                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Цей блок не зберігає клієнтські дані – тільки технічну рефлексію студента над власною роботою.'
                                : 'This block never stores client data – only the student’s technical reflection on their own work.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* Приклад 4: Збір кейсів для портфоліо */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Студент · портфоліо кейсів',
                        en: 'Student · case portfolio',
                    }}
                    title={{
                        uk: 'Трекер навчальних кейсів без PII',
                        en: 'Training case tracker without PII',
                    }}
                    subtitle={{
                        uk: 'Студент бачить прогрес по навчальних клієнтах у вигляді «кейс‑карток» без реальних імен.',
                        en: 'The student sees progress for training clients as case cards without real names or identifiers.',
                    }}
                    aiTagline={{
                        uk: 'AI аналізує, які формати втручань ви використовуєте найчастіше, і пропонує варіації.',
                        en: 'AI analyzes which intervention formats you use most often and suggests variations.',
                    }}
                    badges={[
                        {
                            uk: 'Псевдоніми замість імен',
                            en: 'Pseudonyms only',
                        },
                        {
                            uk: 'Прогрес по техніках',
                            en: 'Technique progress',
                        },
                    ]}
                >
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                            {[
                                {
                                    code: 'Case A01',
                                    stageUk: 'Етап 2 · Формування моделі',
                                    stageEn: 'Stage 2 · Model building',
                                    toolsUk: 'Шкали + психоедукація',
                                    toolsEn: 'Scales + psychoeducation',
                                },
                                {
                                    code: 'Case B07',
                                    stageUk: 'Етап 3 · Поведінкові експерименти',
                                    stageEn: 'Stage 3 · Behavioural experiments',
                                    toolsUk: 'Експозиції, щоденники',
                                    toolsEn: 'Exposures, diaries',
                                },
                            ].map((c) => (
                                <div
                                    key={c.code}
                                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5"
                                >
                                    <p className="text-[10px] font-mono text-slate-400">{c.code}</p>
                                    <p className="mt-0.5 font-medium text-slate-100">
                                        {language === 'uk' ? c.stageUk : c.stageEn}
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-slate-500">
                                        {language === 'uk' ? c.toolsUk : c.toolsEn}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Такі картки можна показати супервізору або додати до портфоліо без розкриття особистості клієнта.'
                                : 'These cards can be shown to a supervisor or added to a portfolio without revealing client identity.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* Приклад 5: Інструменти на дзвінку для відпрацювання навичок */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Студент · відпрацювання навичок',
                        en: 'Student · skills practice',
                    }}
                    title={{
                        uk: 'Панель «інструментів на дзвінку»',
                        en: 'On‑call tools panel',
                    }}
                    subtitle={{
                        uk: 'Поруч з відео – вкладки з нотатками, SOAP, інструментами й чек‑листами для структурованої роботи.',
                        en: 'Next to the video call the student has tabs for notes, SOAP, tools and checklists for structured work.',
                    }}
                    aiTagline={{
                        uk: 'AI підказує, яку вкладку варто відкрити на поточному етапі сесії.',
                        en: 'AI suggests which tab might be most useful at the current point in the session.',
                    }}
                    badges={[
                        {
                            uk: 'Нотатки / SOAP / інструменти',
                            en: 'Notes / SOAP / tools',
                        },
                        {
                            uk: 'Гарячі клавіші',
                            en: 'Hotkeys',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="flex gap-1.5 rounded-xl border border-slate-800 bg-slate-950/80 p-1">
                            {['Notes', 'SOAP', 'Tools', 'Client', 'Checklists'].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
                                        tab === 'Notes'
                                            ? 'bg-emerald-500 text-slate-950 font-medium'
                                            : 'bg-slate-900 text-slate-300'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                            <p className="text-[10px] text-slate-400">
                                {language === 'uk'
                                    ? 'Наприклад, Ctrl+1 відкриває нотатки, Ctrl+2 – SOAP, Ctrl+3 – інструменти. Це дозволяє не відривати погляд від клієнта.'
                                    : 'For example, Ctrl+1 opens notes, Ctrl+2 – SOAP, Ctrl+3 – tools. This lets you keep eye contact with the client.'}
                            </p>
                        </div>
                    </div>
                </LandingExampleCard>
            </div>
        </div>
    );
};

export default StudentsExamplesShowcase;

