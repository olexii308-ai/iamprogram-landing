import React, { useState } from 'react';
import { LandingExampleCard, Lang } from './LandingExampleCard';

const languageLabels: Record<Lang, string> = {
    uk: 'Українська',
    en: 'English',
};

export const ClinicsExamplesShowcase: React.FC = () => {
    const [language, setLanguage] = useState<Lang>('uk');

    const t = (obj: { uk: string; en: string }) => (language === 'uk' ? obj.uk : obj.en);

    const aiSafetyMessages: { uk: string; en: string }[] = [
        {
            uk: 'AI‑супервізор: 3 сесії поспіль по одному клієнту з високим ризиком. Рекомендуємо обговорити кейс на командній супервізії.',
            en: 'AI supervisor: 3 consecutive high‑risk sessions for one client. Consider bringing this case to team supervision.',
        },
        {
            uk: 'AI‑супервізор: часті переноси / пропуски сесій. Запропонуйте обговорити бар’єри участі.',
            en: 'AI supervisor: frequent cancellations / no‑shows. Suggest exploring attendance barriers with the client.',
        },
        {
            uk: 'AI‑супервізор: різке падіння настрою в останніх щоденниках. Перевірте кризові протоколи та план безпеки.',
            en: 'AI supervisor: sharp drop in mood in recent diaries. Revisit crisis protocols and safety plan.',
        },
    ];

    const [aiSafetyIndex, setAiSafetyIndex] = useState(0);

    const cycleSafety = () => {
        setAiSafetyIndex((prev) => (prev + 1) % aiSafetyMessages.length);
    };

    return (
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-6 md:px-6 md:py-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        {language === 'uk' ? 'Для клінік та центрів' : 'For clinics and training centers'}
                    </p>
                    <h2 className="mt-1 text-xl md:text-2xl font-bold text-white">
                        {language === 'uk'
                            ? 'Як виглядає кабінет для командної роботи'
                            : 'How the clinic‑ready workspace looks'}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-2xl">
                        {language === 'uk'
                            ? 'Приклади екранів, які допомагають координувати команду, стежити за ризиками й контролювати якість без доступу до сирих нотаток.'
                            : 'Screens that help coordinate the team, monitor risk, and ensure quality without exposing raw clinical notes.'}
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
                {/* 1. Панель безпечних відеодзвінків для клініки */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Клініка · координатор / заввідділення',
                        en: 'Clinic · coordinator / head of department',
                    }}
                    title={{
                        uk: 'Моніторинг безпечних відеодзвінків',
                        en: 'Monitoring secure video calls',
                    }}
                    subtitle={{
                        uk: 'Показує тільки технічні параметри: тривалість, стабільність з’єднання, виконання політики «без запису».',
                        en: 'Shows only technical parameters: duration, connection stability, and “no recording” policy compliance.',
                    }}
                    aiTagline={{
                        uk: 'AI сповіщає, якщо спостерігається підозріло нестабільний зв’язок у конкретного спеціаліста / кабінету.',
                        en: 'AI alerts you when a specific therapist / room consistently has unstable connections.',
                    }}
                    badges={[
                        {
                            uk: 'Без доступу до змісту сесій',
                            en: 'No access to session content',
                        },
                        {
                            uk: 'Тільки технічні метрики',
                            en: 'Technical metrics only',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">
                                    {language === 'uk' ? 'Активні відеосесії' : 'Active video sessions'}
                                </span>
                                <span className="text-[10px] text-slate-400">5</span>
                            </div>
                            <div className="mt-2 space-y-1.5">
                                {['Room 3A', 'Room 5B'].map((room) => (
                                    <div
                                        key={room}
                                        className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 px-2 py-1.5"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-slate-400">
                                                {room}
                                            </span>
                                            <span className="text-[10px] text-slate-300">
                                                {language === 'uk'
                                                    ? 'Запис: вимкнено'
                                                    : 'Recording: disabled'}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-emerald-300">
                                            {language === 'uk' ? 'Якість добра' : 'Quality good'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Адміністратор не бачить клієнтів та змісту розмов – тільки технічний статус, відповідальний за безпеку.'
                                : 'Coordinator never sees clients or conversation content – only the technical status responsible for safety.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 2. Дошка AI‑супервізора по ризиках */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Клініка · клінічний супервізор',
                        en: 'Clinic · clinical supervisor',
                    }}
                    title={{
                        uk: 'AI‑дашборд ризиків по всій практиці',
                        en: 'AI risk dashboard across the practice',
                    }}
                    subtitle={{
                        uk: 'Показує, у яких кейсах останнім часом часто з’являються червоні прапорці (без розкриття змісту нотаток).',
                        en: 'Shows which cases recently trigger frequent red flags (without revealing note content).',
                    }}
                    aiTagline={{
                        uk: 'AI пропонує, які кейси винести на супервізію першими.',
                        en: 'AI suggests which cases to bring to supervision first.',
                    }}
                    badges={[
                        {
                            uk: 'Псевдоніми / коди кейсів',
                            en: 'Case codes only',
                        },
                        {
                            uk: 'Фокус на безпеці',
                            en: 'Safety focus',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { code: 'Case‑174', levelUk: 'Високий', levelEn: 'High' },
                                { code: 'Case‑322', levelUk: 'Середній', levelEn: 'Medium' },
                                { code: 'Case‑205', levelUk: 'Підвищений', levelEn: 'Elevated' },
                            ].map((c) => (
                                <div
                                    key={c.code}
                                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-2"
                                >
                                    <p className="text-[10px] font-mono text-slate-400">{c.code}</p>
                                    <p className="mt-0.5 text-[11px] font-semibold text-emerald-200">
                                        {language === 'uk' ? c.levelUk : c.levelEn}
                                    </p>
                                    <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                        <div className="h-full w-3/4 bg-emerald-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
                            <p className="mb-1 text-[10px] font-medium text-emerald-100">
                                {language === 'uk' ? 'AI‑коментар:' : 'AI comment:'}
                            </p>
                            <p className="text-[11px] text-emerald-100 leading-relaxed">
                                {t(aiSafetyMessages[aiSafetyIndex])}
                            </p>
                            <button
                                type="button"
                                onClick={cycleSafety}
                                className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-slate-950/40 px-2.5 py-1 text-[10px] text-emerald-200 hover:bg-emerald-500/10"
                            >
                                {language === 'uk' ? 'Ще рекомендація' : 'Another suggestion'}
                            </button>
                        </div>
                    </div>
                </LandingExampleCard>

                {/* 3. Панель завантаженості спеціалістів */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Клініка · менеджер розкладу',
                        en: 'Clinic · scheduling manager',
                    }}
                    title={{
                        uk: 'Видимість завантаженості спеціалістів',
                        en: 'Therapist workload overview',
                    }}
                    subtitle={{
                        uk: 'Показує, у кого скільки сесій на тиждень і який відсоток з них – онлайн, без доступу до змісту.',
                        en: 'Shows how many sessions each therapist has per week and what percentage is online, without any content access.',
                    }}
                    badges={[
                        {
                            uk: 'Планування змін',
                            en: 'Shift planning',
                        },
                        {
                            uk: 'Онлайн / офлайн баланс',
                            en: 'Online / offline balance',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="space-y-1.5">
                            {[
                                { nameUk: 'Спеціаліст 1', nameEn: 'Therapist 1', total: 18, online: 12 },
                                { nameUk: 'Спеціаліст 2', nameEn: 'Therapist 2', total: 10, online: 4 },
                            ].map((tItem) => (
                                <div
                                    key={tItem.nameUk}
                                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-200">
                                            {language === 'uk' ? tItem.nameUk : tItem.nameEn}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {tItem.total}{' '}
                                            {language === 'uk' ? 'сесій / тиждень' : 'sessions / week'}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                        <div
                                            className="h-full bg-emerald-500"
                                            style={{ width: `${(tItem.online / tItem.total) * 100}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-[10px] text-slate-500">
                                        {language === 'uk'
                                            ? `Онлайн: ${tItem.online}/${tItem.total}`
                                            : `Online: ${tItem.online}/${tItem.total}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Це допомагає розумно розподіляти черги та уникати вигорання спеціалістів.'
                                : 'Helps distribute workload fairly and prevent therapist burnout.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 4. Інтерактивний реєстр інструментів клініки */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Клініка · методичний відділ',
                        en: 'Clinic · methods / training unit',
                    }}
                    title={{
                        uk: 'Бібліотека інструментів клініки',
                        en: 'Clinic tools & protocols library',
                    }}
                    subtitle={{
                        uk: 'Всі опитувальники, щоденники, протоколи експозицій зібрані в одному місці, з аналітикою використання.',
                        en: 'All questionnaires, diaries and exposure protocols in one place, with usage analytics.',
                    }}
                    aiTagline={{
                        uk: 'AI підказує, які інструменти мало використовуються, але можуть бути релевантними.',
                        en: 'AI suggests underused tools that might fit your current case mix.',
                    }}
                    badges={[
                        {
                            uk: 'Y‑BOCS, BDI, DOCS тощо',
                            en: 'Y‑BOCS, BDI, DOCS, etc.',
                        },
                        {
                            uk: 'Аналітика використання',
                            en: 'Usage analytics',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { name: 'BDI‑II', usage: 78 },
                                { name: 'Y‑BOCS', usage: 42 },
                                { name: 'DOCS', usage: 34 },
                                { name: 'SMER diary', usage: 15 },
                            ].map((tool) => (
                                <div
                                    key={tool.name}
                                    className="rounded-xl border border-slate-800 bg-slate-900/80 p-2"
                                >
                                    <p className="text-[11px] font-medium text-slate-100">
                                        {tool.name}
                                    </p>
                                    <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                        <div
                                            className="h-full bg-emerald-500"
                                            style={{ width: `${Math.min(tool.usage, 100)}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-[10px] text-slate-500">
                                        {language === 'uk'
                                            ? `${tool.usage} використань за останні 90 днів`
                                            : `${tool.usage} uses in the last 90 days`}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Клініка бачить, які інструменти справді працюють у її популяції клієнтів.'
                                : 'The clinic sees which tools really work with its client population.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 5. Звіт по якості сесій без читання нотаток */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Клініка · керівник програми',
                        en: 'Clinic · program lead',
                    }}
                    title={{
                        uk: 'Звіт по якості сесій без доступу до нотаток',
                        en: 'Session quality report without reading notes',
                    }}
                    subtitle={{
                        uk: 'Фокус на регулярності сесій, виконанні інструментів та наявності плану безпеки – без перегляду терапевтичного контенту.',
                        en: 'Focus on session regularity, tool completion and safety plans – without reviewing therapeutic content.',
                    }}
                    aiTagline={{
                        uk: 'AI виділяє програми, де ризики зростають швидше, ніж очікувалось.',
                        en: 'AI highlights programs where risks rise faster than expected.',
                    }}
                    badges={[
                        {
                            uk: 'Zero‑knowledge аналітика',
                            en: 'Zero‑knowledge analytics',
                        },
                        {
                            uk: 'Фокус на процесі',
                            en: 'Process‑focused',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-200">
                                    {language === 'uk'
                                        ? 'Регулярність сесій (середнє)'
                                        : 'Session regularity (avg)'}
                                </span>
                                <span className="text-[10px] text-emerald-300">89%</span>
                            </div>
                            <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                <div className="h-full w-[89%] bg-emerald-500" />
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-slate-950/80 px-2 py-1.5">
                                    <p className="text-[10px] text-slate-400">
                                        {language === 'uk'
                                            ? 'Сесій з планом безпеки'
                                            : 'Sessions with safety plan'}
                                    </p>
                                    <p className="text-[11px] font-semibold text-emerald-200">72%</p>
                                </div>
                                <div className="rounded-lg bg-slate-950/80 px-2 py-1.5">
                                    <p className="text-[10px] text-slate-400">
                                        {language === 'uk'
                                            ? 'Сесій з виконаними інструментами'
                                            : 'Sessions with completed tools'}
                                    </p>
                                    <p className="text-[11px] font-semibold text-emerald-200">64%</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Керівник бачить якість процесу, але не читає жодної терапевтичної нотатки – це залишається тільки у кабінеті спеціаліста.'
                                : 'The lead sees process quality but reads no clinical notes – they remain only in the therapist’s workspace.'}
                        </p>
                    </div>
                </LandingExampleCard>
            </div>
        </div>
    );
};

export default ClinicsExamplesShowcase;

