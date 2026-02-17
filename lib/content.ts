import { UserRole } from '../components/RoleContext';

export interface ContentData {
    hero: {
        overline: string; // New field
        headline: string;
        subheadline: string;
        cta: string;
        ctaRegister: string;
    };
    waitlist: {
        title: string;
        description: string;
        placeholder: string;
        button: string;
        success: string;
        submitting: string;
    };
    features: {
        title: string;
        description: string;
        prioritizedModules: string[]; // IDs of modules to show first
    };
    aiPersona: {
        highlight: string; // Keep for backward compatibility or remove
        description: string;
    };
    aiPersonas?: {
        title: string;
        description: string;
        items: {
            title: string;
            role: string;
            description: string;
            icon: string;
        }[];
    };
    useCases: {
        id: string;
        title: string;
        description: string;
        type: 'video-workspace' | 'ai-chat' | 'secure-dashboard' | 'client-profile' | 'tools-catalog' | 'calendar-booking' | 'security-lock' | 'voice-supervisor';
        image: string; // Keeping for fallback/icon
    }[];
    visualPrompt: string; // For GenerativeBackground
    zeroKnowledge: {
        title: string;
        description: string;
        points: string[];
        cta: string;
    };
}

export const commonContent: Record<'uk' | 'en', { footer: string }> = {
    uk: { footer: "Всі права захищено." },
    en: { footer: "All rights reserved." }
};

export const moduleTranslations: Record<'uk' | 'en', Record<string, { title: string; description: string }>> = {
    uk: {
        cabinet: { title: "Клінічний кабінет", description: "Список клієнтів з EncryptedBlob захистом. Швидкий пошук у браузері." },
        tools: { title: "Інструменти терапевта", description: "100+ технік КПТ, діагностичних шкал та протоколів." },
        security: { title: "Zero-Knowledge", description: "Шифрування на стороні клієнта. Тільки у вас є доступ." },
        library: { title: "Бібліотека знань", description: "База протоколів та матеріалів для психоосвіти клієнтів." },
        'ai-assistant': { title: "AI Помічник", description: "Автоматизація нотаток та рутини без порушення приватності." },
        'ai-trainer': { title: "AI Тренажер", description: "Симуляція складних випадків для розвитку навичок." },
        'ai-analyst': { title: "Клінічна аналітика", description: "Виявлення ризиків дропауту та динаміки терапії." },
        analytics: { title: "Статистика Практики", description: "Фінансові та клінічні звіти без розкриття конфіденційних даних." }
    },
    en: {
        cabinet: { title: "Clinical Cabinet", description: "Client list with EncryptedBlob protection. Instant browser-side search." },
        tools: { title: "On-Call Tools", description: "FloatingPanel with tests (BDI, GAD-7) overlaying the video." },
        security: { title: "Blind Vault Security", description: "Zero-Knowledge architecture. Server only sees ciphertext." },
        library: { title: "Technique Library", description: "Database of CBT exercises and protocols for homework." },
        'ai-assistant': { title: "Smart SOAP Notes", description: "AI note drafts based on tools used during the session." },
        'ai-trainer': { title: "Client Simulator", description: "Practice complex cases with safe AI models." },
        'ai-analyst': { title: "Clinical Analytics", description: "Dropout risk prediction and therapy plateau tracking (No PII)." },
        analytics: { title: "Practice Stats", description: "Financial and clinical insights without compromising privacy." }
    }
};

const ukDefaultUseCases: ContentData['useCases'] = [
    { id: 'client-profile', title: "Клінічний кабінет", description: "Швидкий пошук та безпечне зберігання даних клієнтів (EncryptedBlob).", type: 'client-profile', image: "🗂️" },
    { id: 'voice-supervisor', title: "AI Супервізор (Voice)", description: "Голосовий інтерфейс для рефлексії та супервізії після сесій.", type: 'voice-supervisor', image: "🎙️" },
    { id: 'tools-catalog', title: "Каталог Інструментів", description: "100+ технік КПТ, діагностичних шкал та протоколів.", type: 'tools-catalog', image: "🛠️" },
    { id: 'live-sidebar', title: "Робоче місце на дзвінку", description: "Нотатки, SOAP та інструменти прямо під час відеодзвінка.", type: 'video-workspace', image: "🖥️" },
    { id: 'calendar', title: "Календар та Запис", description: "Зручне планування сесій без передачі метаданих на сервер.", type: 'calendar-booking', image: "📅" },
    { id: 'security-lock', title: "Zero-Knowledge Захист", description: "Ключі шифрування є тільки у вас. Сервер не бачить нічого.", type: 'security-lock', image: "🔐" }
];

const enDefaultUseCases: ContentData['useCases'] = [
    { id: 'client-profile', title: "Clinical Cabinet", description: "Quick search and secure client data storage (EncryptedBlob).", type: 'client-profile', image: "🗂️" },
    { id: 'voice-supervisor', title: "AI Supervisor (Voice)", description: "Voice interface for reflection and supervision after sessions.", type: 'voice-supervisor', image: "🎙️" },
    { id: 'tools-catalog', title: "Tools Catalog", description: "100+ CBT techniques, diagnostic scales, and protocols.", type: 'tools-catalog', image: "🛠️" },
    { id: 'live-sidebar', title: "On-call Workspace", description: "Notes, SOAP, and tools right during the video call.", type: 'video-workspace', image: "🖥️" },
    { id: 'calendar', title: "Calendar & Booking", description: "Convenient session planning without sending metadata to server.", type: 'calendar-booking', image: "📅" },
    { id: 'security-lock', title: "Zero-Knowledge Protection", description: "Encryption keys are only yours. Server sees nothing.", type: 'security-lock', image: "🔐" }
];

const ukAIPersonas: ContentData['aiPersonas'] = {
    title: "4 Ролі Вашого AI-Супервізора",
    description: "AI працює локально або з анонімізованими даними. Жодного витоку контексту клієнта.",
    items: [
        { title: "Сократичний Супервізор", role: "AI Supervisor", description: "Задає глибокі рефлексивні питання. Не оцінює, а спрямовує на пошук сліпих плям та контрпереносу.", icon: "🧠" },
        { title: "Клінічний Аналітик", role: "AI Analyst", description: "Бачить тренди: ризик дропауту, плато в терапії, порівняння результатів тестів з нормами.", icon: "📊" },
        { title: "Розумний Помічник", role: "AI Assistant", description: "Smart SOAP Notes, авто-тегування сесій та Pre-session Briefing перед зустріччю.", icon: "⚡" },
        { title: "Наставник та Тренер", role: "AI Trainer", description: "Симулятор складного клієнта для тренування технік та вікторини для самоперевірки.", icon: "🎓" }
    ]
};

const enAIPersonas: ContentData['aiPersonas'] = {
    title: "4 Roles of Your AI Supervisor",
    description: "AI works locally or with anonymized data. No client context leakage.",
    items: [
        { title: "Socratic Supervisor", role: "AI Supervisor", description: "Asks deep reflective questions. Doesn't judge, guides to find blind spots and countertransference.", icon: "🧠" },
        { title: "Clinical Analyst", role: "AI Analyst", description: "Sees trends: dropout risk, therapy plateaus, compares test results with norms.", icon: "📊" },
        { title: "Smart Assistant", role: "AI Assistant", description: "Smart SOAP Notes, auto-tagging sessions, and Pre-session Briefing.", icon: "⚡" },
        { title: "Mentor & Trainer", role: "AI Trainer", description: "Client simulator for practicing complex techniques and self-check quizzes.", icon: "🎓" }
    ]
};

export const content: Record<'uk' | 'en', Record<UserRole, ContentData>> = {
    uk: {
        default: {
            hero: {
                overline: "bravery.academy — онлайн платформа для психологів та їх клієнтів, яка покращує якість онлайн сеансів",
                headline: "Ваш час може належати вам, а якість роботи — зростати далі",
                subheadline: "Позбавтеся рутини за допомогою розумних інструментів та AI-супервізії. Звільніть простір для життя і професійного зростання вже сьогодні.",
                cta: "Детальніше",
                ctaRegister: "Зареєструватися"
            },
            waitlist: {
                title: "Доступ до Beta-версії",
                description: "Платформа зараз працює в бета-режимі. Залиште свій email, щоб потрапити в список очікування та отримати ранній доступ.",
                placeholder: "Ваш email",
                button: "Записатися в список",
                success: "Дякуємо! Ми повідомимо вас про доступ.",
                submitting: "Відправка..."
            },
            features: {
                title: "Екосистема Bravery",
                description: "Все необхідне для сучасної практики в одному захищеному просторі.",
                prioritizedModules: ['security', 'cabinet', 'ai-assistant', 'library']
            },
            aiPersona: { highlight: 'Супервізор', description: "Сократичний Супервізор: ШІ, що ставить глибокі рефлексивні питання для професійного розвитку." },
            aiPersonas: ukAIPersonas,
            useCases: ukDefaultUseCases,
            visualPrompt: "abstract flowing lines, neon colors, dark background, biotech aesthetic, balanced composition",
            zeroKnowledge: {
                title: "Zero-Knowledge Architecture",
                description: "Ми використовуємо архітектуру \"Blind Vault\" (Сліпе сховище). Це означає, що ваші нотатки та дані клієнтів шифруються на вашому пристрої ще до відправки. Навіть розробники платформи не можуть їх прочитати.",
                points: ["Асиметричне шифрування (E2EE) на клієнті", "Жодних PII (Personal Identifiable Information) на сервері", "Ключі дешифрування зберігаються лише у вас (Local Storage + Key Kit)"],
                cta: "Детальніше про безпеку"
            }
        },
        therapist: {
            hero: {
                overline: "bravery.academy — онлайн платформа для психологів та їх клієнтів, яка покращує якість онлайн сеансів",
                headline: "Ваш час може належати вам, а якість роботи — зростати далі",
                subheadline: "Позбавтеся рутини за допомогою розумних інструментів та AI-супервізії. Звільніть простір для життя і професійного зростання вже сьогодні.",
                cta: "Детальніше",
                ctaRegister: "Зареєструватися"
            },
            waitlist: {
                title: "Доступ до Beta-версії",
                description: "Платформа зараз працює в бета-режимі. Залиште свій email, щоб потрапити в список очікування та отримати ранній доступ.",
                placeholder: "Ваш email",
                button: "Записатися в список",
                success: "Дякуємо! Ми повідомимо вас про доступ.",
                submitting: "Відправка..."
            },
            features: {
                title: "Інструменти для зростання",
                description: "Ваш професійний розвиток — наш пріоритет.",
                prioritizedModules: ['ai-assistant', 'cabinet', 'security', 'tools']
            },
            aiPersona: { highlight: 'Помічник', description: "Розумний Помічник: Структурування нотаток (SOAP) та авто-тегування сесій." },
            aiPersonas: ukAIPersonas, // Copied
            useCases: ukDefaultUseCases, // Copied
            visualPrompt: "calm waves, deep ocean blue, bioluminescence, organized structure, serenity",
            zeroKnowledge: {
                title: "Ваші дані належать тільки вам",
                description: "Ми використовуємо архітектуру Zero-Knowledge (Blind Vault). Це означає, що ваші нотатки та дані клієнтів шифруються на вашому пристрої перед відправкою. Навіть ми не можемо їх прочитати.",
                points: ["Асиметричне шифрування (E2EE)", "Жодних PII на сервері", "Ключі дешифрування є тільки у вас"],
                cta: "Детальніше про безпеку"
            }
        },
        clinic: {
            hero: {
                overline: "bravery.academy — онлайн платформа для психологів та їх клієнтів, яка покращує якість онлайн сеансів",
                headline: "Ваші клієнти можуть отримувати більше та безпечно",
                subheadline: "Надайте своїм терапевтам інструменти майбутнього, а клієнтам — гарантію повної конфіденційності. Підніміть стандарти вашої клініки на новий рівень.",
                cta: "Детальніше",
                ctaRegister: "Зареєструватися"
            },
            waitlist: {
                title: "Доступ до Beta-версії",
                description: "Платформа зараз працює в бета-режимі. Залиште свій email, щоб потрапити в список очікування та отримати ранній доступ.",
                placeholder: "Ваш email",
                button: "Записатися в список",
                success: "Дякуємо! Ми повідомимо вас про доступ.",
                submitting: "Відправка..."
            },
            features: {
                title: "Стандарти безпеки та ефективності",
                description: "Повний контроль якості та відповідність GDPR/HIPAA.",
                prioritizedModules: ['security', 'analytics', 'cabinet', 'ai-analyst']
            },
            aiPersona: { highlight: 'Аналітик', description: "Клінічний Аналітик: Розрахунок ризику дропауту та моніторинг динаміки терапії." },
            aiPersonas: ukAIPersonas, // Copied
            useCases: ukDefaultUseCases, // Copied
            visualPrompt: "geometric fortress, cyber security, shield metaphors, dark emerald and obsidian, strength",
            zeroKnowledge: {
                title: "Корпоративна безпека",
                description: "Навіть з централізованим білінгом, клінічні дані залишаються приватними для кожного терапевта. Адміністратори бачать лише агреговану статистику.",
                points: ["Audit Logs для всіх дій", "Розділення доступу до даних", "Відповідність GDPR/HIPAA"],
                cta: "Детальніше про compliance"
            }
        },
        student: {
            hero: {
                overline: "bravery.academy — онлайн платформа для психологів та їх клієнтів, яка покращує якість онлайн сеансів",
                headline: "Починати щось нове завжди важко, однак можна полегшити цей процес",
                subheadline: "Ваш персональний AI-наставник готовий до тренувань 24/7. Відпрацьовуйте навички без страху помилок і здобувайте впевненість для роботи з реальними клієнтами.",
                cta: "Детальніше",
                ctaRegister: "Зареєструватися"
            },
            waitlist: {
                title: "Доступ до Beta-версії",
                description: "Платформа зараз працює в бета-режимі. Залиште свій email, щоб потрапити в список очікування та отримати ранній доступ.",
                placeholder: "Ваш email",
                button: "Записатися в список",
                success: "Дякуємо! Ми повідомимо вас про доступ.",
                submitting: "Відправка..."
            },
            features: {
                title: "Персональний ментор",
                description: "Навчання без стресу та ризику помилок.",
                prioritizedModules: ['ai-trainer', 'library', 'tools', 'assistant']
            },
            aiPersona: { highlight: 'Тренер', description: "Наставник та Тренер: Симулятор клієнта та квізи для підготовки." },
            aiPersonas: ukAIPersonas, // Copied
            useCases: ukDefaultUseCases, // Copied
            visualPrompt: "neural networks, expanding connections, bright sparks, curiosity, growth, sunrise colors",
            zeroKnowledge: {
                title: "Навчайтесь безпечно",
                description: "Ваші кейси та симуляції повністю приватні. Ви можете експериментувати з 'AI-клієнтами' без ризику витоку реальних даних.",
                points: ["Локальне збереження симуляцій", "AI не навчається на ваших даних", "Повна анонімність"],
                cta: "Як працює AI-безпека"
            }
        }
    },
    en: {
        default: {
            hero: {
                overline: "bravery.academy — online platform for psychologists and their clients that improves the quality of online sessions",
                headline: "Time for Real Therapy",
                subheadline: "Free yourself from routine with smart tools and AI supervision. Make space for life and professional growth today.",
                cta: "Learn More",
                ctaRegister: "Join Waitlist"
            },
            waitlist: {
                title: "Beta Access",
                description: "The platform is currently in beta. Leave your email to join the waitlist and get early access.",
                placeholder: "Your email",
                button: "Join Waitlist",
                success: "Thanks! We'll notify you.",
                submitting: "Sending..."
            },
            features: {
                title: "Bravery Ecosystem",
                description: "Everything you need for modern practice in one secure space.",
                prioritizedModules: ['security', 'cabinet', 'ai-assistant', 'library']
            },
            aiPersona: { highlight: 'Supervisor', description: "Socratic Supervisor: AI that asks deep reflective questions for professional development." },
            aiPersonas: enAIPersonas,
            useCases: enDefaultUseCases,
            visualPrompt: "abstract flowing lines, neon colors, dark background, biotech aesthetic, balanced composition",
            zeroKnowledge: {
                title: "Your Data Belongs Only to You",
                description: "We use Zero-Knowledge (Blind Vault) architecture. This means your notes and client data are encrypted on your device before sending.",
                points: ["Asymmetric Encryption (E2EE)", "No PII on Server", "Only you hold decryption keys"],
                cta: "More about Security"
            }
        },
        therapist: {
            hero: {
                overline: "bravery.academy — online platform for psychologists and their clients that improves the quality of online sessions",
                headline: "Time for Real Therapy",
                subheadline: "Free yourself from routine with smart tools and AI supervision. Make space for life and professional growth today.",
                cta: "Learn More",
                ctaRegister: "Join Waitlist"
            },
            waitlist: {
                title: "Beta Access",
                description: "The platform is currently in beta. Leave your email to join the waitlist and get early access.",
                placeholder: "Your email",
                button: "Join Waitlist",
                success: "Thanks! We'll notify you.",
                submitting: "Sending..."
            },
            features: {
                title: "Tools for Growth",
                description: "Your professional development is our priority.",
                prioritizedModules: ['ai-assistant', 'cabinet', 'security', 'tools']
            },
            aiPersona: { highlight: 'Assistant', description: "Smart Assistant: SOAP note structuring and session auto-tagging." },
            aiPersonas: enAIPersonas, // Copied
            useCases: enDefaultUseCases, // Copied
            visualPrompt: "calm waves, deep ocean blue, bioluminescence, organized structure, serenity",
            zeroKnowledge: {
                title: "Your Data Belongs Only to You",
                description: "We use Zero-Knowledge (Blind Vault) architecture. This means your notes and client data are encrypted on your device before sending.",
                points: ["Asymmetric Encryption (E2EE)", "No PII on Server", "Only you hold decryption keys"],
                cta: "More about Security"
            }
        },
        clinic: {
            hero: {
                overline: "bravery.academy — online platform for psychologists and their clients that improves the quality of online sessions",
                headline: "Your clients get more, and safely",
                subheadline: "Give your therapists the tools of the future, and clients — a guarantee of complete privacy. Raise your clinic's standards to a new level.",
                cta: "Request Audit",
                ctaRegister: "Join Waitlist"
            },
            waitlist: {
                title: "Beta Access",
                description: "The platform is currently in beta. Leave your email to join the waitlist and get early access.",
                placeholder: "Your email",
                button: "Join Waitlist",
                success: "Thanks! We'll notify you.",
                submitting: "Sending..."
            },
            features: {
                title: "Security & Efficiency",
                description: "Full quality control and GDPR/HIPAA compliance.",
                prioritizedModules: ['security', 'analytics', 'cabinet', 'ai-analyst']
            },
            aiPersona: { highlight: 'Analyst', description: "Clinical Analyst: Dropout risk prediction and therapy dynamics monitoring." },
            aiPersonas: enAIPersonas, // Copied
            useCases: enDefaultUseCases, // Copied
            visualPrompt: "geometric fortress, cyber security, shield metaphors, dark emerald and obsidian, strength",
            zeroKnowledge: {
                title: "Enterprise Grade Security",
                description: "Even with centralized billing, clinical data remains private to each therapist. Admins only see aggregated statistics.",
                points: ["Audit Logs for all actions", "Strict Data Segregation", "GDPR/HIPAA Compliant"],
                cta: "More about Compliance"
            }
        },
        student: {
            hero: {
                overline: "bravery.academy — online platform for psychologists and their clients that improves the quality of online sessions",
                headline: "Starting something new is hard, but can be eased",
                subheadline: "Your personal AI mentor is ready for training 24/7. Practice skills without fear of mistakes and gain confidence for working with real clients.",
                cta: "Learn More",
                ctaRegister: "Join Waitlist"
            },
            waitlist: {
                title: "Beta Access",
                description: "The platform is currently in beta. Leave your email to join the waitlist and get early access.",
                placeholder: "Your email",
                button: "Join Waitlist",
                success: "Thanks! We'll notify you.",
                submitting: "Sending..."
            },
            features: {
                title: "Your Personal Mentor",
                description: "Stress-free learning without the risk of real-world errors.",
                prioritizedModules: ['ai-trainer', 'library', 'tools', 'assistant']
            },
            aiPersona: { highlight: 'Trainer', description: "Mentor & Trainer: Client simulator and certification quizzes." },
            aiPersonas: enAIPersonas, // Copied
            useCases: enDefaultUseCases, // Copied
            visualPrompt: "neural networks, expanding connections, bright sparks, curiosity, growth, sunrise colors",
            zeroKnowledge: {
                title: "Learn Safely",
                description: "Your cases and simulations are completely private. You can experiment with 'AI Clients' without risking real data leakage.",
                points: ["Local storage for simulations", "AI does not train on your data", "Complete Anonymity"],
                cta: "How AI Security Works"
            }
        }
    }
};
