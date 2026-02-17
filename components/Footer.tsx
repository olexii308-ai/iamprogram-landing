'use client';

import { useLanguage } from './LanguageCtx';
import { commonContent } from '../lib/content';

export function Footer() {
    const { language } = useLanguage();
    const t = commonContent[language];

    return (
        <footer className="py-8 bg-slate-950 border-t border-white/5 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Bravery Academy. {t.footer}</p>
        </footer>
    );
}
