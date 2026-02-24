'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'uk' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
    uk: {
        'hero.title': 'Майбутнє вже тут',
        'hero.subtitle': 'Революційне рішення для вашого бізнесу на основі штучного інтелекту.',
        'hero.cta': 'Розпочати',
        'features.title': 'Чому ми?',
        'features.speed': 'Швидкість',
        'features.speed.desc': 'Миттєва обробка даних завдяки передовим алгоритмам.',
        'features.ai': 'Штучний Інтелект',
        'features.ai.desc': 'Генеративні моделі адаптуються до ваших потреб.',
        'features.support': 'Підтримка 24/7',
        'features.support.desc': 'Ми завжди поруч, щоб допомогти вам зростати.',
        'footer.rights': 'Всі права захищено.',
    },
    en: {
        'hero.title': 'The Future is Here',
        'hero.subtitle': 'Revolutionary AI-powered solution for your business.',
        'hero.cta': 'Get Started',
        'features.title': 'Why Us?',
        'features.speed': 'Speed',
        'features.speed.desc': 'Instant data processing thanks to advanced algorithms.',
        'features.ai': 'Artificial Intelligence',
        'features.ai.desc': 'Generative models adapt to your needs.',
        'features.support': '24/7 Support',
        'features.support.desc': 'We are always here to help you grow.',
        'footer.rights': 'All rights reserved.',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Always start with 'uk' to match SSR — prevents hydration mismatch
    const [language, setLanguageState] = useState<Language>('uk');

    // Sync from localStorage AFTER mount (client-only)
    useEffect(() => {
        const saved = localStorage.getItem('language');
        if (saved === 'en') {
            setLanguageState('en');
            document.documentElement.lang = 'en';
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
