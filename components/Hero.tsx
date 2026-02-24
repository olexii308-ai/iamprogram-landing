'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRole } from './RoleContext';
import { useLanguage } from './LanguageCtx';
import { content } from '../lib/content';
import { GenerativeBackground } from './GenerativeBackground';
import { WaitlistModal } from './WaitlistModal';
import { LanguageSwitch } from './LanguageSwitch';
import { useHints } from '../hooks/useHints';
import { AdaptiveHint } from './ui/AdaptiveHint';

export function Hero() {
    const { role } = useRole();
    const { language } = useLanguage();
    const t = content[language][role].hero;
    const tWaitlist = content[language][role].waitlist;
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [waitlistSource, setWaitlistSource] = useState('hero');
    const isPrivateOfferRole = role === 'default' || role === 'therapist';

    // AI Supervisor V2 Hint System
    const scrollHint = useHints('hero-scroll');

    const promo = language === 'uk'
        ? {
            badge: '🎁 Beta-бонус для приватної практики',
            details: 'Перші 30 приватних користувачів отримають 3 роки безкоштовного доступу до платформи.',
            note: '* AI-функції оплачуються окремо.'
        }
        : {
            badge: '🎁 Beta bonus for private practice',
            details: 'First 30 private users get 3 years of free platform access.',
            note: '* AI features are billed separately.'
        };

    useEffect(() => {
        const handleOpenWaitlist = (event: Event) => {
            const customEvent = event as CustomEvent<{ source?: string }>;
            const source = customEvent.detail?.source ?? 'global';
            setWaitlistSource(source);
            setIsWaitlistOpen(true);
        };

        window.addEventListener('open-waitlist', handleOpenWaitlist);

        // Also track scroll to dismiss the scroll hint
        const handleScroll = () => {
            if (window.scrollY > 100) scrollHint.dismissHint();
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('open-waitlist', handleOpenWaitlist);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollHint]);

    const openWaitlist = (source: string) => {
        setWaitlistSource(source);
        setIsWaitlistOpen(true);
    };

    return (
        <section id="hero-block" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-32 pb-24 sm:pb-20 px-4">
            {/* Header Controls */}
            <div className="absolute top-4 sm:top-6 right-3 sm:right-6 z-50 flex items-center gap-2 sm:gap-4">
                <button
                    onClick={() => openWaitlist('hero-header')}
                    className="px-4 sm:px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-[10px] sm:text-sm transition-all backdrop-blur-sm shadow-lg whitespace-nowrap"
                >
                    {t.ctaRegister}
                </button>
                <LanguageSwitch />
            </div>

            <GenerativeBackground />

            <div className="relative z-10 container mx-auto text-center max-w-5xl">
                <motion.div
                    key={`${role}-${language}-content`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="inline-flex items-center justify-center -mx-2 sm:mx-0 px-3 py-1.5 sm:py-1 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-2 max-w-full">
                        <span className="text-[11px] sm:text-sm font-medium text-emerald-400 tracking-wide text-center leading-tight">
                            {t.overline}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white/60 animate-gradient-text balanced-text px-2">
                        {t.headline}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed px-2 sm:px-0">
                        {t.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                        <button
                            onClick={() => document.getElementById('use-cases-block')?.scrollIntoView({ behavior: 'smooth' })}
                            className="btn-shine-effect group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] w-full sm:w-auto"
                        >
                            {t.cta}
                        </button>
                        <button
                            onClick={() => openWaitlist('hero-secondary')}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-sm w-full sm:w-auto"
                        >
                            {t.ctaRegister}
                        </button>
                    </div>

                    {isPrivateOfferRole && (
                        <div className="w-full max-w-2xl rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-left">
                            <p className="text-sm font-semibold text-amber-200">{promo.badge}</p>
                            <p className="mt-1 text-xs text-amber-100/90 leading-relaxed">{promo.details}</p>
                            <p className="mt-1 text-[11px] text-amber-200/80">{promo.note}</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator Hint */}
            <div ref={scrollHint.ref as any} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                {scrollHint.showHint && <AdaptiveHint type="scroll" />}
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                labels={tWaitlist}
                promo={isPrivateOfferRole ? promo : undefined}
                source={waitlistSource}
            />
        </section>
    );
}
