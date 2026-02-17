export type FaqItem = {
    question: string;
    answer: string;
};

export const faqContent: Record<'uk' | 'en', FaqItem[]> = {
    uk: [
        {
            question: 'Що таке Zero-Knowledge у платформі bravery.academy?',
            answer: 'Ключова ідея в тому, що зміст ваших клінічних нотаток не доступний платформі. Дані шифруються до збереження, а доступ до контенту має лише спеціаліст з відповідними ключами.'
        },
        {
            question: 'Чи бачить сервер персональні нотатки психолога?',
            answer: 'Ні. Сервер обробляє технічну інфраструктуру, але не читає зміст приватних нотаток чи клієнтського контенту.'
        },
        {
            question: 'Як працює AI-супервізор без витоку PII?',
            answer: 'AI-функції працюють з анонімізованим або структурованим контекстом. Будь-які дані, що можуть ідентифікувати клієнта, мають бути виключені з потоку обробки.'
        },
        {
            question: 'Для кого платформа вже зараз?',
            answer: 'Для приватних психологів, клінік, студентів-практикантів і корпоративних програм підтримки спеціалістів.'
        },
        {
            question: 'Чим це відрізняється від звʼязки Zoom + нотатки + календар?',
            answer: 'bravery.academy поєднує безпечні відеосесії, інструменти роботи з кейсом, динаміку показників та AI-супервізію в одному середовищі замість розрізнених сервісів.'
        },
        {
            question: 'Які стандарти безпеки закладені в продукт?',
            answer: 'Архітектура побудована з фокусом на privacy-by-design та підготовку до вимог GDPR/HIPAA залежно від сценарію впровадження.'
        },
        {
            question: 'Чи можна отримати виділені сервери та окремі бази даних для компанії?',
            answer: 'Так. Для корпоративних і клінічних сценаріїв може бути запропоновано ізольовану інфраструктуру: окремі сервери та окремі бази даних.'
        },
        {
            question: 'Як потрапити в beta-програму?',
            answer: 'Залиште email у листі очікування. Команда звʼяжеться для узгодження формату пілоту, пріоритетів та умов підключення.'
        }
    ],
    en: [
        {
            question: 'What does Zero-Knowledge mean in bravery.academy?',
            answer: 'It means the platform cannot read your clinical note content. Data is encrypted before storage and only authorized specialists can decrypt relevant content.'
        },
        {
            question: 'Can the server read therapist notes?',
            answer: 'No. The server handles infrastructure operations but does not access private therapeutic content.'
        },
        {
            question: 'How does AI supervision work without exposing PII?',
            answer: 'AI features are designed to use anonymized or structured context. Personally identifiable information should be excluded from processing flows.'
        },
        {
            question: 'Who is the platform currently designed for?',
            answer: 'Private psychologists, clinics, student practitioners, and corporate mental health program operators.'
        },
        {
            question: 'How is this different from Zoom + notes + calendar tools?',
            answer: 'bravery.academy combines secure sessions, case tools, progress dynamics, and AI supervision in one integrated environment.'
        },
        {
            question: 'What security standards are built in?',
            answer: 'The architecture follows privacy-by-design principles and is built for GDPR/HIPAA-ready deployment scenarios.'
        },
        {
            question: 'Can organizations request dedicated servers and isolated databases?',
            answer: 'Yes. Corporate and clinic use cases can be deployed with isolated infrastructure including dedicated servers and separate databases.'
        },
        {
            question: 'How do I join the beta program?',
            answer: 'Submit your email to the waitlist. The team will contact you to align pilot scope, priorities, and rollout format.'
        }
    ]
};

export function buildFaqSchema(language: 'uk' | 'en') {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: language,
        mainEntity: faqContent[language].map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };
}
