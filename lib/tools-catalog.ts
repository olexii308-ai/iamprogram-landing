// ================================================================
// Tools Catalog Data — extracted from ToolsCatalog.tsx
// Content source: FEATURES_OVERVIEW.md
// ================================================================

export interface Tool {
    icon: string;
    title: string;
    description: string;
}

export interface ToolCategory {
    emoji: string;
    title: string;
    tools: Tool[];
}

export interface RoadmapCategory {
    category: string;
    items: Tool[];
}

export const currentFeatures: Record<'uk' | 'en', ToolCategory[]> = {
    uk: [
        {
            emoji: '🏥',
            title: 'Кабінет психолога',
            tools: [
                { icon: '👥', title: 'Список клієнтів', description: 'Безпечний список із псевдонімами, швидкий пошук на боці браузера.' },
                { icon: '📅', title: 'Календар і розклад', description: 'Календар сесій (онлайн/офлайн), швидке відкриття Live Session.' },
                { icon: '📋', title: 'Картка сесії', description: 'Інформація про сесію, посилання на клієнта — все в encryptedBlob.' },
            ]
        },
        {
            emoji: '📝',
            title: 'Нотатки та документація',
            tools: [
                { icon: '✏️', title: 'Вільні нотатки', description: 'Автозбереження кожні кілька секунд, тільки зашифрований вигляд.' },
                { icon: '🏷️', title: 'SOAP-нотатки', description: 'Структура Subjective/Objective/Assessment/Plan з двоетапним редагуванням.' },
                { icon: '☑️', title: 'Чек-листи сесії', description: 'Структурування сесії з інтеграцією у Live Session на дзвінку.' },
                { icon: '⚡', title: 'Генератор нотаток з інструментів', description: 'Результати тестів автоматично формують основу для SOAP.' },
            ]
        },
        {
            emoji: '🧰',
            title: 'Інструменти та автоматизація',
            tools: [
                { icon: '📊', title: 'Психологічні інструменти', description: 'BDI-II, Y-BOCS, DOCS, SMER-щоденник — з авто-підрахунком.' },
                { icon: '📈', title: 'Динаміка інструментів', description: 'Графіки зміни балів у часі, побудовані в браузері після розшифровки.' },
                { icon: '⏱️', title: 'КПТ-годинник', description: 'Ділить сесію на етапи: agenda, середина, підсумки, домашнє завдання.' },
                { icon: '⏳', title: 'Session Timer', description: 'Прогрес-бар тривалості з попередженням за 5 хв до кінця.' },
                { icon: '💾', title: 'Auto-save & Sync', description: 'Фоновий Sync Service, жодних ручних "Save".' },
            ]
        },
        {
            emoji: '🎥',
            title: 'Безпечні відеодзвінки',
            tools: [
                { icon: '📹', title: 'Відеопанель', description: 'Захищений токен для кімнати, старт без логінів в сторонні сервіси.' },
                { icon: '⚙️', title: 'Налаштування дзвінка', description: 'Вибір камери, мікрофона, шумоподавлення, якість відео.' },
                { icon: '📡', title: 'Індикатор якості', description: 'Візуальний індикатор з\'єднання та кількість учасників.' },
                { icon: '⌨️', title: 'Гарячі клавіші', description: 'Ctrl+M мікрофон, Ctrl+E камера, Ctrl+1-5 вкладки панелі.' },
            ]
        },
        {
            emoji: '🖥️',
            title: 'Інструменти на дзвінку',
            tools: [
                { icon: '🪟', title: 'Плаваюча панель', description: 'Нотатки, SOAP, інструменти, клієнт, чек-листи — поверх відео.' },
                { icon: '🕐', title: 'КПТ-годинник на дзвінку', description: 'Мінімізоване вікно з етапами, не заважає відео.' },
                { icon: '👁️', title: 'Secure Blur', description: 'Розмиття при неактивності, panic mode для захисту даних.' },
            ]
        },
        {
            emoji: '📉',
            title: 'Аналітика та статистика',
            tools: [
                { icon: '📊', title: 'Аналітика практики', description: 'Кількість сесій, активність по днях, топ інструментів.' },
                { icon: '📈', title: 'Динаміка по клієнту', description: 'Графіки зміни тривоги, депресії, обсесій у часі.' },
                { icon: '🏢', title: 'Аналітика для клінік', description: 'Агреговані показники без PII — тільки сумарні графіки.' },
            ]
        },
        {
            emoji: '🤖',
            title: 'AI-помічник / AI-супервізор',
            tools: [
                { icon: '📋', title: 'Pre-session Briefing', description: 'Нагадування: інструменти, бали, на що звернути увагу.' },
                { icon: '💡', title: 'On-call Hints', description: 'Рекомендації яку вкладку відкрити, нагадування про ризики.' },
                { icon: '🧠', title: 'Post-session Reflection', description: 'Рефлексія: що було сильним, що покращити, що на супервізію.' },
            ]
        },
    ],
    en: [
        {
            emoji: '🏥',
            title: 'Psychologist Cabinet',
            tools: [
                { icon: '👥', title: 'Client List', description: 'Secure list with pseudonyms, browser-side search.' },
                { icon: '📅', title: 'Calendar & Schedule', description: 'Session calendar (online/offline), quick Live Session launch.' },
                { icon: '📋', title: 'Session Card', description: 'Session info, client context — all in encryptedBlob.' },
            ]
        },
        {
            emoji: '📝',
            title: 'Notes & Documentation',
            tools: [
                { icon: '✏️', title: 'Free-text Notes', description: 'Auto-save every few seconds, encrypted storage only.' },
                { icon: '🏷️', title: 'SOAP Notes', description: 'Subjective/Objective/Assessment/Plan with two-stage editing.' },
                { icon: '☑️', title: 'Session Checklists', description: 'Structure sessions with Live Session integration.' },
                { icon: '⚡', title: 'Notes Generator', description: 'Test results automatically form SOAP note drafts.' },
            ]
        },
        {
            emoji: '🧰',
            title: 'Tools & Automation',
            tools: [
                { icon: '📊', title: 'Psychological Tools', description: 'BDI-II, Y-BOCS, DOCS, mood diaries — with auto-scoring.' },
                { icon: '📈', title: 'Tool Dynamics', description: 'Score change graphs over time, built in browser after decryption.' },
                { icon: '⏱️', title: 'CBT Timer', description: 'Divides sessions into phases: agenda, middle, summary, homework.' },
                { icon: '⏳', title: 'Session Timer', description: 'Duration progress bar with 5-min warning before end.' },
                { icon: '💾', title: 'Auto-save & Sync', description: 'Background Sync, no manual "Save" needed.' },
            ]
        },
        {
            emoji: '🎥',
            title: 'Secure Video Calls',
            tools: [
                { icon: '📹', title: 'Video Panel', description: 'Secure token per room, no third-party logins needed.' },
                { icon: '⚙️', title: 'Call Settings', description: 'Camera, mic, noise cancellation, video quality selection.' },
                { icon: '📡', title: 'Quality Indicator', description: 'Visual connection quality and participant count.' },
                { icon: '⌨️', title: 'Hotkeys', description: 'Ctrl+M mic, Ctrl+E camera, Ctrl+1-5 panel tabs.' },
            ]
        },
        {
            emoji: '🖥️',
            title: 'On-call Tools',
            tools: [
                { icon: '🪟', title: 'Floating Panel', description: 'Notes, SOAP, tools, client, checklists — over video.' },
                { icon: '🕐', title: 'CBT Timer Widget', description: 'Minimizable window with session phases.' },
                { icon: '👁️', title: 'Secure Blur', description: 'Blur on inactivity, panic mode for data protection.' },
            ]
        },
        {
            emoji: '📉',
            title: 'Analytics & Statistics',
            tools: [
                { icon: '📊', title: 'Practice Analytics', description: 'Session counts, activity by day, top tools used.' },
                { icon: '📈', title: 'Client Dynamics', description: 'Anxiety, depression, OCD score graphs over time.' },
                { icon: '🏢', title: 'Clinic Analytics', description: 'Aggregated metrics without PII — summary graphs only.' },
            ]
        },
        {
            emoji: '🤖',
            title: 'AI Assistant / Supervisor',
            tools: [
                { icon: '📋', title: 'Pre-session Briefing', description: 'Reminders: tools used, scores, focus points.' },
                { icon: '💡', title: 'On-call Hints', description: 'Recommendations on tabs to open, risk reminders.' },
                { icon: '🧠', title: 'Post-session Reflection', description: 'What was strong, what to improve, what for supervision.' },
            ]
        },
    ],
};

export const roadmapItems: Record<'uk' | 'en', { category: string; items: Tool[] }[]> = {
    uk: [
        {
            category: 'Глибша автоматизація',
            items: [
                { icon: '📝', title: 'Smart SOAP Notes', description: 'Автоматичні чернетки на основі інструментів та динаміки.' },
                { icon: '🔄', title: 'Автоматизовані Workflows', description: 'Тригери: після 1-ї сесії → BDI-II, високий ризик → план безпеки.' },
                { icon: '💰', title: 'Білінг та інвойси', description: 'Автоматична генерація рахунків без PII в тексті.' },
            ]
        },
        {
            category: 'Розширення AI-супервізора',
            items: [
                { icon: '🔍', title: 'Глибокі патерни', description: '«Часті переноси», «нестабільна динаміка», «зростання навантаження».' },
                { icon: '🧠', title: 'AI Co-pilot на сесії', description: 'Підказки: які питання поставити, які техніки запропонувати.' },
            ]
        },
        {
            category: 'Більше аналітики',
            items: [
                { icon: '📊', title: 'Когортний аналіз', description: 'Порівняння груп клієнтів за типом запиту без PII.' },
                { icon: '📈', title: 'Розширена аналітика для компаній', description: 'Прогноз впливу програм на вигорання та плинність кадрів.' },
                { icon: '📉', title: 'Інтерактивні дашборди', description: 'Готові «слайди» для звітності клінік та HR.' },
            ]
        },
        {
            category: 'Групові формати',
            items: [
                { icon: '👥', title: 'Групові сесії', description: 'Кілька клієнтів в одній структурі, окремі чек-листи.' },
                { icon: '🤝', title: 'Спільний доступ клініки', description: 'Технічні дані між командою без змісту нотаток.' },
            ]
        },
        {
            category: 'UX-покращення',
            items: [
                { icon: '⚡', title: 'Кастомні панелі', description: 'Вибір, які вкладки показувати, ще більше гарячих клавіш.' },
                { icon: '🎯', title: 'Focus Mode', description: 'Мінімалістичний режим: тільки відео, таймер і ключові пункти.' },
                { icon: '📱', title: 'Мобільний додаток', description: 'Повний функціонал на iOS та Android.' },
                { icon: '🔗', title: 'API для інтеграцій', description: 'Підключення EHR та зовнішніх сервісів.' },
                { icon: '📧', title: 'Захищена пошта', description: 'E2E зашифрований обмін повідомленнями з клієнтами.' },
                { icon: '🎥', title: 'Запис сесій', description: 'Захищений запис з авто-транскрипцією.' },
                { icon: '📐', title: 'Конструктор протоколів', description: 'Створення власних терапевтичних протоколів.' },
                { icon: '📖', title: 'Щоденник клієнта', description: 'Захищений щоденник настрою для клієнтів.' },
                { icon: '🔐', title: 'Аудит-логи', description: 'Повний журнал дій для GDPR/HIPAA compliance.' },
            ]
        },
    ],
    en: [
        {
            category: 'Deeper Automation',
            items: [
                { icon: '📝', title: 'Smart SOAP Notes', description: 'Auto-drafts based on tools and dynamics.' },
                { icon: '🔄', title: 'Automated Workflows', description: 'Triggers: after 1st session → BDI-II, high risk → safety plan.' },
                { icon: '💰', title: 'Billing & Invoices', description: 'Automatic invoice generation without PII.' },
            ]
        },
        {
            category: 'AI Supervisor Expansion',
            items: [
                { icon: '🔍', title: 'Deep Patterns', description: '"Frequent transfers", "unstable dynamics", "growing load".' },
                { icon: '🧠', title: 'AI Co-pilot on Session', description: 'Hints: what questions to ask, what techniques to suggest.' },
            ]
        },
        {
            category: 'More Analytics',
            items: [
                { icon: '📊', title: 'Cohort Analysis', description: 'Compare client groups by request type without PII.' },
                { icon: '📈', title: 'Extended Corporate Analytics', description: 'Impact forecast on burnout and turnover.' },
                { icon: '📉', title: 'Interactive Dashboards', description: 'Ready-made slides for clinic and HR reporting.' },
            ]
        },
        {
            category: 'Group Formats',
            items: [
                { icon: '👥', title: 'Group Sessions', description: 'Multiple clients in one structure, separate checklists.' },
                { icon: '🤝', title: 'Clinic Shared Access', description: 'Technical data between team without note contents.' },
            ]
        },
        {
            category: 'UX Improvements',
            items: [
                { icon: '⚡', title: 'Custom Panels', description: 'Choose which tabs to show, more hotkeys.' },
                { icon: '🎯', title: 'Focus Mode', description: 'Minimalist mode: only video, timer and key points.' },
                { icon: '📱', title: 'Mobile App', description: 'Full functionality on iOS and Android.' },
                { icon: '🔗', title: 'API Integrations', description: 'Connect EHR and external services.' },
                { icon: '📧', title: 'Secure Messaging', description: 'E2E encrypted client communication.' },
                { icon: '🎥', title: 'Session Recording', description: 'Secure recording with auto-transcription.' },
                { icon: '📐', title: 'Protocol Builder', description: 'Create custom therapeutic protocols.' },
                { icon: '📖', title: 'Client Journal', description: 'Secure mood journal for clients.' },
                { icon: '🔐', title: 'Audit Logs', description: 'Full action log for GDPR/HIPAA compliance.' },
            ]
        },
    ],
};
