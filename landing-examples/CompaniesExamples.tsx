import React, { useState } from 'react';
import { LandingExampleCard, Lang } from './LandingExampleCard';

const languageLabels: Record<Lang, string> = {
    uk: 'Українська',
    en: 'English',
};

export const CompaniesExamplesShowcase: React.FC = () => {
    const [language, setLanguage] = useState<Lang>('uk');

    const t = (obj: { uk: string; en: string }) => (language === 'uk' ? obj.uk : obj.en);

    const [selectedProgram, setSelectedProgram] = useState<'Stress' | 'Managers'>('Stress');

    const [aiOrgTipIndex, setAiOrgTipIndex] = useState(0);
    const aiOrgTips: { uk: string; en: string }[] = [
        {
            uk: 'AI‑аналітика: у команді продажів зросла кількість звернень по тривогу. Рекомендуємо додати груповий модуль по управлінню стресом.',
            en: 'AI analytics: anxiety‑related requests increased in the sales team. Consider adding a group stress‑management module.',
        },
        {
            uk: 'AI‑аналітика: менеджери середньої ланки рідше доходять до завершення програм. Запропонуйте гнучкіші слоти або коротші формати.',
            en: 'AI analytics: mid‑level managers complete programs less often. Try more flexible slots or shorter formats.',
        },
        {
            uk: 'AI‑аналітика: в останні 3 місяці зменшилась кількість екстрених звернень – хороший знак, варто показати це у звіті HR.',
            en: 'AI analytics: emergency requests have decreased in the last 3 months – a good trend to highlight in HR reporting.',
        },
    ];

    const cycleOrgTip = () => {
        setAiOrgTipIndex((prev) => (prev + 1) % aiOrgTips.length);
    };

    return (
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-6 md:px-6 md:py-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400/80">
                        {language === 'uk'
                            ? 'Для компаній та HR‑відділів'
                            : 'For companies and HR departments'}
                    </p>
                    <h2 className="mt-1 text-xl md:text-2xl font-bold text-white">
                        {language === 'uk'
                            ? 'Як виглядає кабінет для корпоративних програм'
                            : 'What the corporate program workspace looks like'}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-slate-400 max-w-2xl">
                        {language === 'uk'
                            ? 'Приклади екранів, які показують HR тільки необхідну аналітику: динаміку, залученість, ризики – без доступу до особистих даних співробітників.'
                            : 'Screens that show HR only what they need: dynamics, engagement, risk – without accessing employees’ personal data.'}
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
                {/* 1. Пульс програми без PII */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Компанія · HR / People Partner',
                        en: 'Company · HR / People Partner',
                    }}
                    title={{
                        uk: 'Пульс корпоративної програми без PII',
                        en: 'Program pulse without PII',
                    }}
                    subtitle={{
                        uk: 'HR бачить лише агреговані показники: участь, завершення програм, тренди по запитах.',
                        en: 'HR sees only aggregated metrics: participation, program completion, and trend of requests.',
                    }}
                    aiTagline={{
                        uk: 'AI допомагає показати результат у форматі, зрозумілому С‑level.',
                        en: 'AI helps convert results into language that is clear for C‑level stakeholders.',
                    }}
                    badges={[
                        {
                            uk: 'Без імен та департаментів',
                            en: 'No names or departments',
                        },
                        {
                            uk: 'Лише агреговані числа',
                            en: 'Aggregated only',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-200">
                                    {language === 'uk'
                                        ? 'Участь у програмі (активні)'
                                        : 'Program participation (active)'}
                                </span>
                                <span className="text-[11px] text-emerald-300">62%</span>
                            </div>
                            <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                <div className="h-full w-[62%] bg-emerald-500" />
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-slate-950/80 px-2 py-1.5">
                                    <p className="text-[10px] text-slate-400">
                                        {language === 'uk'
                                            ? 'Завершених програм'
                                            : 'Completed programs'}
                                    </p>
                                    <p className="text-[11px] font-semibold text-emerald-200">41%</p>
                                </div>
                                <div className="rounded-lg bg-slate-950/80 px-2 py-1.5">
                                    <p className="text-[10px] text-slate-400">
                                        {language === 'uk'
                                            ? 'Середня тривалість'
                                            : 'Average duration'}
                                    </p>
                                    <p className="text-[11px] font-semibold text-emerald-200">
                                        {language === 'uk' ? '8 тижнів' : '8 weeks'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Жодних імен: тільки цифри, які можна безпечно показувати керівництву.'
                                : 'No names: only numbers that are safe to show leadership.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 2. Безпечні дзвінки для співробітників */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Компанія · сервіс для співробітників',
                        en: 'Company · employee service',
                    }}
                    title={{
                        uk: 'Захищені відеодзвінки для співробітників',
                        en: 'Secure video calls for employees',
                    }}
                    subtitle={{
                        uk: 'Пояснює співробітнику, що сесія анонімна для роботодавця, а відео не записується.',
                        en: 'Explains to employees that sessions are anonymous for the employer and video is not recorded.',
                    }}
                    badges={[
                        {
                            uk: 'Анонімність щодо компанії',
                            en: 'Anonymous to employer',
                        },
                        {
                            uk: 'Без запису дзвінка',
                            en: 'No call recording',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5">
                            <p className="text-[10px] font-medium text-slate-200">
                                {language === 'uk'
                                    ? 'Для співробітника: що бачить роботодавець?'
                                    : 'For the employee: what does the employer see?'}
                            </p>
                            <ul className="mt-1 space-y-1 text-[10px] text-slate-400">
                                <li>• {language === 'uk' ? 'Факт участі в програмі' : 'Program participation fact'}</li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Агреговані показники по всій компанії'
                                        : 'Aggregated metrics across company'}
                                </li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Не бачить ні імені спеціаліста, ні тем сесій'
                                        : 'Does not see therapist name or session topics'}
                                </li>
                            </ul>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Це пояснення можна показати прямо перед першим дзвінком, щоб зняти тривогу.'
                                : 'This explanation can be shown right before the first call to reduce anxiety.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 3. AI‑супервізор для HR / програм */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Компанія · власник програми',
                        en: 'Company · program owner',
                    }}
                    title={{
                        uk: 'AI‑супервізор для корпоративної програми',
                        en: 'AI supervisor for the corporate program',
                    }}
                    subtitle={{
                        uk: 'Показує, на що звернути увагу у програмі: які підрозділи потребують більше профілактики, де програма вже дає ефект.',
                        en: 'Highlights what to focus on: which areas need more prevention and where the program already works.',
                    }}
                    aiTagline={{
                        uk: 'AI перекладає клінічні патерни у мову бізнес‑рішень.',
                        en: 'AI translates clinical patterns into business language.',
                    }}
                    badges={[
                        {
                            uk: 'Фокус на бізнес‑результаті',
                            en: 'Business‑oriented',
                        },
                        {
                            uk: 'Zero‑knowledge аналітика',
                            en: 'Zero‑knowledge analytics',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5">
                            <p className="mb-1 text-[10px] font-medium text-emerald-100">
                                {language === 'uk' ? 'AI‑огляд програми:' : 'AI program overview:'}
                            </p>
                            <p className="text-[11px] text-emerald-100 leading-relaxed">
                                {t(aiOrgTips[aiOrgTipIndex])}
                            </p>
                            <button
                                type="button"
                                onClick={cycleOrgTip}
                                className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-slate-950/40 px-2.5 py-1 text-[10px] text-emerald-200 hover:bg-emerald-500/10"
                            >
                                {language === 'uk' ? 'Ще інсайт' : 'Another insight'}
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'HR бачить лише підсумки, а не окремих співробітників чи сесії.'
                                : 'HR only sees summaries, not individual employees or sessions.'}
                        </p>
                    </div>
                </LandingExampleCard>

                {/* 4. Конструктор програм для різних аудиторій */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Компанія · HR / L&D',
                        en: 'Company · HR / L&D',
                    }}
                    title={{
                        uk: 'Конструктор програм: stress, managers, crisis',
                        en: 'Program builder: stress, managers, crisis',
                    }}
                    subtitle={{
                        uk: 'HR обирає готові модулі та параметри без занурення в клінічні деталі.',
                        en: 'HR picks ready‑made modules and parameters without diving into clinical details.',
                    }}
                    badges={[
                        {
                            uk: 'Готові дорожні карти',
                            en: 'Ready‑made roadmaps',
                        },
                        {
                            uk: 'Налаштування під компанію',
                            en: 'Company‑specific config',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="flex gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
                            {(['Stress', 'Managers'] as const).map((program) => (
                                <button
                                    key={program}
                                    type="button"
                                    onClick={() => setSelectedProgram(program)}
                                    className={`flex-1 rounded-lg px-2 py-1 text-[10px] ${
                                        selectedProgram === program
                                            ? 'bg-emerald-500 text-slate-950 font-medium'
                                            : 'bg-slate-950 text-slate-300'
                                    }`}
                                >
                                    {program === 'Stress'
                                        ? language === 'uk'
                                            ? 'Стрес‑програма'
                                            : 'Stress program'
                                        : language === 'uk'
                                        ? 'Менеджери'
                                        : 'Managers'}
                                </button>
                            ))}
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5">
                            {selectedProgram === 'Stress' ? (
                                <ul className="space-y-1 text-[10px] text-slate-400">
                                    <li>• {language === 'uk' ? '1:1 сесії' : '1:1 sessions'}</li>
                                    <li>
                                        •{' '}
                                        {language === 'uk'
                                            ? 'Групові воркшопи по стресу'
                                            : 'Group stress‑management workshops'}
                                    </li>
                                    <li>
                                        •{' '}
                                        {language === 'uk'
                                            ? 'Онлайн‑щоденники для відстеження навантаження'
                                            : 'Online diaries to track load'}
                                    </li>
                                </ul>
                            ) : (
                                <ul className="space-y-1 text-[10px] text-slate-400">
                                    <li>
                                        •{' '}
                                        {language === 'uk'
                                            ? 'Модуль «складні розмови»'
                                            : '“Difficult conversations” module'}
                                    </li>
                                    <li>
                                        •{' '}
                                        {language === 'uk'
                                            ? 'Індивідуальні консультації для менеджерів'
                                            : 'Individual manager consultations'}
                                    </li>
                                    <li>
                                        •{' '}
                                        {language === 'uk'
                                            ? 'Модуль про вигорання'
                                            : 'Burnout education module'}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </LandingExampleCard>

                {/* 5. Звіт для керівництва в одному слайді */}
                <LandingExampleCard
                    language={language}
                    audience={{
                        uk: 'Компанія · звіт для C‑level',
                        en: 'Company · C‑level report',
                    }}
                    title={{
                        uk: 'Один слайд для керівництва',
                        en: 'Single‑slide summary for leadership',
                    }}
                    subtitle={{
                        uk: 'Автоматично зібрані головні цифри: участь, динаміка ризиків, економія за рахунок зменшення вигорання.',
                        en: 'Automatically assembled key numbers: participation, risk dynamics and savings from reduced burnout.',
                    }}
                    badges={[
                        {
                            uk: 'Готово до презентації',
                            en: 'Presentation‑ready',
                        },
                        {
                            uk: 'Без терапевтичних деталей',
                            en: 'No therapeutic details',
                        },
                    ]}
                >
                    <div className="space-y-2 text-[11px]">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                            <p className="text-[10px] font-medium text-slate-200">
                                {language === 'uk'
                                    ? 'Ключові показники програми'
                                    : 'Key program indicators'}
                            </p>
                            <ul className="mt-1 space-y-1 text-[10px] text-slate-400">
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Участь: 62% цільової аудиторії'
                                        : 'Participation: 62% of target audience'}
                                </li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Зниження екстрених звернень на 28%'
                                        : '28% reduction in emergency requests'}
                                </li>
                                <li>
                                    •{' '}
                                    {language === 'uk'
                                        ? 'Оціночна економія за рахунок меншого вигорання'
                                        : 'Estimated savings from reduced burnout'}
                                </li>
                            </ul>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            {language === 'uk'
                                ? 'Цей блок легко експортується в PDF / слайд для ради директорів – без жодної чутливої інформації.'
                                : 'This block can be exported into a PDF / slide for the board – with zero sensitive information.'}
                        </p>
                    </div>
                </LandingExampleCard>
            </div>
        </div>
    );
};

export default CompaniesExamplesShowcase;

