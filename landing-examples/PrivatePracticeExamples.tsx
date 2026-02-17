import React, { useState } from 'react';
import { LandingExampleCard, Lang } from './LandingExampleCard';

const languageLabels: Record<Lang, string> = {
    uk: 'Українська',
    en: 'English',
};

export const PrivatePracticeExamplesShowcase: React.FC = () => {
    const [language, setLanguage] = useState<Lang>('uk');

    const t = (obj: { uk: string; en: string }) => (language === 'uk' ? obj.uk : obj.en);

    const [selectedClientCode, setSelectedClientCode] = useState<'A' | 'B'>('A');
    const [aiSuggestionIndex, setAiSuggestionIndex] = useState(0);

    const aiSuggestions: { uk: string; en: string }[] = [
        {
            uk: 'AI‑помічник: для цього клієнта експозиції працювали краще, коли починалися з меншої інтенсивності. Нагадайте собі про це перед наступною сесією.',
            en: 'AI assistant: for this client exposures worked better when starting from lower intensity. Remember this before the next session.',
        },
        {
            uk: 'AI‑помічник: минулого місяця клієнт рідше виконував домашні завдання. Запропонуйте спільно спростити формулювання.',
            en: 'AI assistant: last month the client completed homework less often. Suggest simplifying the tasks together.',
        },
        {
            uk: 'AI‑помічник: на останніх сесіях зростає тема виснаження. Перевірте рівень навантаження й кордони.',
            en: 'AI assistant: exhaustion is mentioned more frequently in recent sessions. Check workload and boundaries.',
        },
    ];

    const cycleAiSuggestion = () => {
        setAiSuggestionIndex((prev) => (prev + 1) % aiSuggestions.length);
    };

    return (
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-6 md:px-6 md:py-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        {language === 'uk' ? 'Для приватних практик' : 'For private practices'}
                    </p>
                    <h2 className="mt-1 text-xl md:text-2xl font-bold text-white">
                        {language === 'uk'
                            ? 'Як виглядає кабінет для соло‑практики'
                            : 'What the solo‑practice workspace looks like'}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-2xl">
                        {language === 'uk'
                            ? 'Приклади екранів, які допомагають тримати порядок у сесіях, платіжках, ризиках і не витрачати час на технічні дрібниці.'
                            : 'Screens that help keep order in sessions, payments and risk management without spending time on technical details.'}
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
                {/* 1. Панель «День практики» з живими сесіями */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Приватна практика · день спеціаліста',
                        en: 'Private practice · therapist’s day',
                    }}
                    title={{
                        uk: 'День практики в одному екрані',
                        en: 'Practice day on one screen',
                    }}
                    subtitle={{
                        uk: 'Поточні сесії, статус оплат та короткі технічні позначки без розкриття змісту нотаток.',
                        en: 'Today’s sessions, payment status and short technical markers without note content.',
                    }}
                    badges={[
                        {
                            uk: 'Онлайн + офлайн',
                            en: 'Online + offline',
                        },
                        {
                            uk: 'Оплати / no‑show',
                            en: 'Payments / no‑shows',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="space-y-1.5">
                            {[
                                { time: '10:00', code: 'Case‑A', statusUk: 'Оплачено', statusEn: 'Paid' },
                                { time: '12:00', code: 'Case‑B', statusUk: 'Очікує оплату', statusEn: 'Payment pending' },
                            ].map((slot) => (
                                <div
                                    key={slot.time}
                                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5"
                                >
                                    <div>
                                        <p className="text-[10px] font-mono text-slate-400">
                                            {slot.time} · {slot.code}
                                        </p>
                                        <p className="text-[10px] text-slate-300">
                                            {language === 'uk' ? 'Індивідуальна сесія' : 'Individual session'}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                                            slot.statusUk === 'Оплачено'
                                                ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/40'
                                                : 'bg-amber-500/10 text-amber-200 border border-amber-500/40'
                                        }`}
                                    >
                                        {language === 'uk' ? slot.statusUk : slot.statusEn}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Увесь день видно як на долоні: що онлайн, що офлайн, де є ризик no‑show.'
                                : 'You see the whole day at a glance: online vs offline and potential no‑show risks.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 2. Безпечний відеодзвінок з нагадуванням про кордони */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Приватна практика · онлайн‑сесія',
                        en: 'Private practice · online session',
                    }}
                    title={{
                        uk: 'Захищений відеодзвінок з нагадуванням про кордони',
                        en: 'Secure video with boundary reminders',
                    }}
                    subtitle={{
                        uk: 'Поруч із відео – індикатор політик: без запису, без переписки у месенджерах з вікна сесії.',
                        en: 'Next to the video a small panel reminds you: no recording, no chat outside the agreed channels.',
                    }}
                    badges={[
                        {
                            uk: 'Політика «без запису»',
                            en: '“No recording” policy',
                        },
                        {
                            uk: 'Фокус на безпеці',
                            en: 'Safety focus',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <p className="text-[10px] font-medium text-slate-200">
                                {language === 'uk' ? 'Політики сесії' : 'Session policies'}
                            </p>
                            <ul className="mt-1 space-y-1 text-[10px] text-slate-400">
                                <li>• {language === 'uk' ? 'Запис вимкнено технічно' : 'Recording technically disabled'}</li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Нотатки бачите тільки ви'
                                        : 'Only you see the structured notes'}
                                </li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Переписка – тільки в узгоджених каналах'
                                        : 'Messaging – only via agreed channels'}
                                </li>
                            </ul>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Ця панель нагадує кордони й захищає як вас, так і клієнта.'
                                : 'This panel reminds about boundaries and protects both you and the client.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 3. AI‑помічник по клієнту перед сесією */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Приватна практика · підготовка до сесії',
                        en: 'Private practice · pre‑session briefing',
                    }}
                    title={{
                        uk: 'AI‑помічник: «що не забути сьогодні»',
                        en: 'AI assistant: “what not to forget today”',
                    }}
                    subtitle={{
                        uk: 'Перед сесією система коротко нагадує ключові акценти по клієнту – без показу сирих нотаток.',
                        en: 'Before the session, the system briefly reminds key focus points for the client – no raw notes shown.',
                    }}
                    aiTagline={{
                        uk: 'AI читає структуру сесій, а не зміст нотаток, і підсумовує технічні акценти.',
                        en: 'AI reads session structure, not note content, and summarises technical focus areas.',
                    }}
                    badges={[
                        {
                            uk: 'Підготовка за 30 секунд',
                            en: '30‑second prep',
                        },
                        {
                            uk: 'Без перегляду старих нотаток',
                            en: 'No re‑reading notes',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="flex gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
                            {(['A', 'B'] as const).map((code) => (
                                <button
                                    key={code}
                                    type="button"
                                    onClick={() => setSelectedClientCode(code)}
                                    className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
                                        selectedClientCode === code
                                            ? 'bg-emerald-500 text-slate-950 font-medium'
                                            : 'bg-slate-950 text-slate-300'
                                    }`}
                                >
                                    {language === 'uk' ? `Кейс ${code}` : `Case ${code}`}
                                </button>
                            ))}
                        </div>
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5">
                            <p className="mb-1 text-[10px] font-medium text-emerald-100">
                                {language === 'uk' ? 'AI‑нагадування перед сесією:' : 'AI reminder before session:'}
                            </p>
                            <p className="text-[11px] text-emerald-100 leading-relaxed">
                                {t(aiSuggestions[aiSuggestionIndex])}
                            </p>
                            <button
                                type="button"
                                onClick={cycleAiSuggestion}
                                className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-slate-950/40 px-2.5 py-1 text-[10px] text-emerald-200 hover:bg-emerald-500/10"
                            >
                                {language === 'uk' ? 'Інша підказка' : 'Another suggestion'}
                            </button>
                        </div>
                    </div>
                </LandingExampleCard>

                {/* 4. Трекер прогресу по інструментах для одного клієнта */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Приватна практика · один клієнт',
                        en: 'Private practice · single client',
                    }}
                    title={{
                        uk: 'Прогрес по інструментах в одному місці',
                        en: 'Client’s tool progress in one place',
                    }}
                    subtitle={{
                        uk: 'Шкали, щоденники, чек‑листи – у вигляді простої таблиці прогресу без розкриття відповідей.',
                        en: 'Scales, diaries and checklists summarised in a simple progress grid without showing answers.',
                    }}
                    badges={[
                        {
                            uk: 'Y‑BOCS / BDI / щоденники',
                            en: 'Y‑BOCS / BDI / diaries',
                        },
                        {
                            uk: 'Тренди замість деталей',
                            en: 'Trends over details',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <table className="w-full text-left text-[10px] text-slate-300">
                            <thead className="border-b border-slate-800 text-slate-400">
                                <tr>
                                    <th className="py-1 pr-2">
                                        {language === 'uk' ? 'Інструмент' : 'Tool'}
                                    </th>
                                    <th className="py-1 pr-2">
                                        {language === 'uk' ? 'Сесій' : 'Sessions'}
                                    </th>
                                    <th className="py-1">
                                        {language === 'uk' ? 'Тренд' : 'Trend'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'BDI‑II', sessions: 6, trendUk: '↓ покращення', trendEn: '↓ improving' },
                                    { name: 'Y‑BOCS', sessions: 4, trendUk: '→ стабільно', trendEn: '→ stable' },
                                    { name: 'Exposure log', sessions: 5, trendUk: '↑ активність', trendEn: '↑ activity' },
                                ].map((row) => (
                                    <tr key={row.name} className="border-b border-slate-900">
                                        <td className="py-1 pr-2">{row.name}</td>
                                        <td className="py-1 pr-2">{row.sessions}</td>
                                        <td className="py-1">
                                            {language === 'uk' ? row.trendUk : row.trendEn}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Ви бачите динаміку, але не самі відповіді – це допомагає швидко орієнтуватися перед сесією.'
                                : 'You see dynamics, not raw answers – this helps orient quickly before a session.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 5. Післясесійний екран з лояльним фідбеком */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Приватна практика · досвід клієнта',
                        en: 'Private practice · client experience',
                    }}
                    title={{
                        uk: 'Післясесійний екран з фідбек‑лінком',
                        en: 'Post‑call screen with feedback link',
                    }}
                    subtitle={{
                        uk: 'Клієнт після відеосесії бачить просте «дякуємо» та опцію залишити відгук у безпечному форматі.',
                        en: 'After the video call the client sees a simple “thank you” screen and can safely leave feedback.',
                    }}
                    badges={[
                        {
                            uk: 'Без PII в URL',
                            en: 'No PII in URL',
                        },
                        {
                            uk: 'Фокус на досвіді',
                            en: 'Client experience focus',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
                            <div className="mb-2 h-10 w-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                ✓
                            </div>
                            <p className="text-sm font-semibold text-slate-100">
                                {language === 'uk' ? 'Дякуємо за сесію!' : 'Thank you for your session!'}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400">
                                {language === 'uk'
                                    ? 'Якщо захочете, можете залишити анонімний відгук про свій досвід.'
                                    : 'If you wish, you can leave an anonymous comment about your experience.'}
                            </p>
                            <button
                                type="button"
                                className="mt-2 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-500"
                            >
                                {language === 'uk' ? 'Залишити відгук' : 'Leave feedback'}
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Відгук не містить клінічних деталей – лише досвід роботи зі спеціалістом і сервісом.'
                                : 'Feedback contains no clinical details – only the experience of working with you and the service.'}
                        </p>
                    </div>
                </LandingExampleCard>
            </div>
        </div>
    );
};

export default PrivatePracticeExamplesShowcase;

