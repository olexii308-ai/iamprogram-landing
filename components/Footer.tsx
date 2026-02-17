'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageCtx';
import { useRole } from './RoleContext';
import { commonContent } from '../lib/content';

export function Footer() {
    const { language } = useLanguage();
    const { role } = useRole();
    const t = commonContent[language];
    const showPrivateOffer = role === 'default' || role === 'therapist';
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bravery.academy';

    const copy = language === 'uk'
        ? {
            cta: 'Записатися в лист очікування',
            headline: 'Перші 30 приватних користувачів у beta-програмі',
            details: '3 роки безкоштовного використання платформи.',
            note: '* AI-функції оплачуються окремо.',
            brandDescription: 'Платформа для психологів: безпечні сесії, структуровані інструменти та AI-супервізія без компромісів у приватності.',
            navTitle: 'Навігація',
            trustTitle: 'Довіра та безпека',
            contactsTitle: 'Контакти та юридичне',
            privacy: 'Політика конфіденційності',
            terms: 'Умови використання',
            rights: 'Всі права захищено.',
            trustPoints: ['Zero-Knowledge архітектура', 'GDPR-ready підхід', 'Захищені відеодзвінки'],
            navItems: [
                { href: '#hero-block', label: 'Головний блок' },
                { href: '#use-cases-block', label: 'Можливості платформи' },
                { href: '#ai-personas-block', label: 'AI-супервізор' },
                { href: '#tools-catalog-block', label: 'Каталог інструментів' },
                { href: '#security-block', label: 'Безпека даних' },
                { href: '#faq-block', label: 'FAQ' }
            ]
        }
        : {
            cta: 'Join the waitlist',
            headline: 'First 30 private users in beta program',
            details: '3 years of free platform access.',
            note: '* AI features are billed separately.',
            brandDescription: 'Platform for psychologists: secure sessions, structured tools, and AI supervision without privacy trade-offs.',
            navTitle: 'Navigation',
            trustTitle: 'Trust & Security',
            contactsTitle: 'Contacts & Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms of Use',
            rights: 'All rights reserved.',
            trustPoints: ['Zero-Knowledge architecture', 'GDPR-ready approach', 'Secure video sessions'],
            navItems: [
                { href: '#hero-block', label: 'Hero section' },
                { href: '#use-cases-block', label: 'Platform capabilities' },
                { href: '#ai-personas-block', label: 'AI supervision' },
                { href: '#tools-catalog-block', label: 'Tools catalog' },
                { href: '#security-block', label: 'Data security' },
                { href: '#faq-block', label: 'FAQ' }
            ]
        };

    const openWaitlist = () => {
        window.dispatchEvent(new CustomEvent('open-waitlist', { detail: { source: 'footer-cta' } }));
    };

    return (
        <footer id="footer-block" className="py-14 bg-slate-950 border-t border-white/5 text-slate-400 text-sm">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 md:p-8 mb-10">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-lg font-semibold text-white">{copy.headline}</p>
                            <p className="text-sm text-slate-300 mt-1">{copy.details}</p>
                            <p className="text-xs text-slate-500 mt-1">{copy.note}</p>
                        </div>
                        <button
                            onClick={openWaitlist}
                            className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
                        >
                            {copy.cta}
                        </button>
                    </div>

                    {showPrivateOffer && (
                        <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3">
                            <p className="text-sm font-semibold text-amber-200">{copy.headline}</p>
                            <p className="mt-1 text-xs text-amber-100/90">{copy.details}</p>
                            <p className="mt-1 text-[11px] text-amber-200/80">{copy.note}</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
                    <div>
                        <h3 className="text-white font-semibold mb-3">bravery.academy</h3>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            {copy.brandDescription}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">{copy.navTitle}</h3>
                        <ul className="space-y-2">
                            {copy.navItems.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">{copy.trustTitle}</h3>
                        <ul className="space-y-2 mb-4">
                            {copy.trustPoints.map((point) => (
                                <li key={point} className="text-slate-400">• {point}</li>
                            ))}
                        </ul>

                        <h4 className="text-white font-medium mb-2">{copy.contactsTitle}</h4>
                        <a href={`mailto:${contactEmail}`} className="text-emerald-300 hover:text-emerald-200 transition-colors block mb-2">
                            {contactEmail}
                        </a>
                        <div className="flex flex-col gap-1">
                            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                                {copy.privacy}
                            </Link>
                            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                                {copy.terms}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p>© {new Date().getFullYear()} bravery.academy. {copy.rights}</p>
                    <p className="text-xs text-slate-500">{t.footer}</p>
                </div>
            </div>
        </footer>
    );
}
