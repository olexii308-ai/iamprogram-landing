import React from 'react';

export type Lang = 'uk' | 'en';

interface TranslatedText {
    uk: string;
    en: string;
}

interface LandingExampleCardProps {
    language: Lang;
    title: TranslatedText;
    subtitle: TranslatedText;
    audience: TranslatedText;
    aiTagline?: TranslatedText;
    badges?: TranslatedText[];
    children?: React.ReactNode;
}

export const LandingExampleCard: React.FC<LandingExampleCardProps> = ({
    language,
    title,
    subtitle,
    audience,
    aiTagline,
    badges = [],
    children,
}) => {
    const t = (text: TranslatedText) => (language === 'uk' ? text.uk : text.en);

    return (
        <article className="relative flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5 shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] uppercase tracking-wide text-emerald-400/80 font-semibold">
                        {t(audience)}
                    </p>
                    <h3 className="mt-1 text-base md:text-lg font-semibold text-white leading-snug">
                        {t(title)}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-slate-400 leading-relaxed">
                        {t(subtitle)}
                    </p>
                </div>
                {aiTagline && (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-[10px] md:text-[11px] text-emerald-200 flex items-center gap-1.5 max-w-[180px]">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[9px]">
                            AI
                        </span>
                        <span className="leading-snug">{t(aiTagline)}</span>
                    </div>
                )}
            </div>

            {badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {badges.map((badge, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300"
                        >
                            {t(badge)}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-2 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 md:p-3.5">
                {children}
            </div>
        </article>
    );
};

