'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

interface Tool {
    id: string;
    title: string;
    description: string;
    duration: string;
    tags: string[];
    icon: string;
    category: 'assessment' | 'intervention' | 'psychoeducation' | 'planning';
}

const toolsData: Record<'uk' | 'en', Tool[]> = {
    uk: [
        {
            id: 'bdi-2',
            title: 'Шкала депресії Бека (BDI-II)',
            description: 'Стандартизований опитувальник для оцінки симптомів та тяжкості депресії.',
            duration: '~10 хв',
            tags: ['депресія', 'опитувальник'],
            icon: '📊',
            category: 'assessment'
        },
        {
            id: 'y-bocs',
            title: 'Шкала ОКР Єйла-Брауна (Y-BOCS-II)',
            description: 'Золотий стандарт оцінки тяжкості обсесивно-компульсивного розладу.',
            duration: '~20 хв',
            tags: ['ОКР', 'обсесії', 'компульсії', 'опитувальник'],
            icon: '🔄',
            category: 'assessment'
        },
        {
            id: 'docs',
            title: 'Вимірювальна шкала ОКР (DOCS)',
            description: 'Оцінка ОКР-симптомів у 4 вимірах: забруднення, шкода, неприйнятні думки, симетрія.',
            duration: '~15 хв',
            tags: ['ОКР', 'обсесії', 'компульсії', 'виміри'],
            icon: '📐',
            category: 'assessment'
        },
        {
            id: 'thought-diary',
            title: 'Щоденник думок',
            description: 'Класичний КПТ інструмент для виявлення та реструктуризації негативних думок.',
            duration: '~15 хв',
            tags: ['когнітивний', 'реструктуризація'],
            icon: '💭',
            category: 'intervention'
        },
        {
            id: 'bai',
            title: 'Шкала тривоги Бека (BAI)',
            description: 'Опитувальник для оцінки тяжкості симптомів тривоги.',
            duration: '~10 хв',
            tags: ['тривога', 'опитувальник'],
            icon: '📋',
            category: 'assessment'
        },
        {
            id: 'behavioral-activation',
            title: 'Поведінкова активація',
            description: 'Планування активностей для подолання депресії та апатії.',
            duration: '~20 хв',
            tags: ['депресія', 'активація'],
            icon: '🎯',
            category: 'planning'
        },
        {
            id: 'worry-tree',
            title: 'Дерево занепокоєнь',
            description: 'Техніка для аналізу та управління занепокоєннями (продуктивні vs непродуктивні).',
            duration: '~15 хв',
            tags: ['тривога', 'ГТР'],
            icon: '🌳',
            category: 'intervention'
        },
        {
            id: 'safety-plan',
            title: 'План безпеки',
            description: 'Структурований план дій для кризових ситуацій.',
            duration: '~30 хв',
            tags: ['суїцид', 'криза', 'безпека'],
            icon: '🛡️',
            category: 'planning'
        },
        {
            id: 'abc-model',
            title: 'ABC модель',
            description: 'Аналіз ситуації за моделлю Activating event - Belief - Consequence.',
            duration: '~10 хв',
            tags: ['когнітивний', 'аналіз'],
            icon: '🔤',
            category: 'intervention'
        }
    ],
    en: [
        {
            id: 'bdi-2',
            title: 'Beck Depression Inventory (BDI-II)',
            description: 'Standardized questionnaire for assessing depression symptoms and severity.',
            duration: '~10 min',
            tags: ['depression', 'questionnaire'],
            icon: '📊',
            category: 'assessment'
        },
        {
            id: 'y-bocs',
            title: 'Yale-Brown OCD Scale (Y-BOCS-II)',
            description: 'Gold standard for assessing Obsessive-Compulsive Disorder severity.',
            duration: '~20 min',
            tags: ['OCD', 'obsessions', 'compulsions', 'questionnaire'],
            icon: '🔄',
            category: 'assessment'
        },
        {
            id: 'docs',
            title: 'Dimensional OCD Scale (DOCS)',
            description: 'Assessing OCD symptoms across 4 dimensions: contamination, harm, unacceptable thoughts, symmetry.',
            duration: '~15 min',
            tags: ['OCD', 'obsessions', 'compulsions', 'dimensions'],
            icon: '📐',
            category: 'assessment'
        },
        {
            id: 'thought-diary',
            title: 'Thought Diary',
            description: 'Classic CBT tool for identifying and restructuring negative thoughts.',
            duration: '~15 min',
            tags: ['cognitive', 'restructuring'],
            icon: '💭',
            category: 'intervention'
        },
        {
            id: 'bai',
            title: 'Beck Anxiety Inventory (BAI)',
            description: 'Questionnaire for assessing anxiety symptom severity.',
            duration: '~10 min',
            tags: ['anxiety', 'questionnaire'],
            icon: '📋',
            category: 'assessment'
        },
        {
            id: 'behavioral-activation',
            title: 'Behavioral Activation',
            description: 'Activity planning to overcome depression and apathy.',
            duration: '~20 min',
            tags: ['depression', 'activation'],
            icon: '🎯',
            category: 'planning'
        },
        {
            id: 'worry-tree',
            title: 'Worry Tree',
            description: 'Technique for analyzing and managing worries (productive vs unproductive).',
            duration: '~15 min',
            tags: ['anxiety', 'GAD'],
            icon: '🌳',
            category: 'intervention'
        },
        {
            id: 'safety-plan',
            title: 'Safety Plan',
            description: 'Structured action plan for crisis situations.',
            duration: '~30 min',
            tags: ['suicide', 'crisis', 'safety'],
            icon: '🛡️',
            category: 'planning'
        },
        {
            id: 'abc-model',
            title: 'ABC Model',
            description: 'Situation analysis using Activating event - Belief - Consequence model.',
            duration: '~10 min',
            tags: ['cognitive', 'analysis'],
            icon: '🔤',
            category: 'intervention'
        }
    ]
};

const uiText = {
    uk: {
        title: 'Каталог інструментів',
        subtitle: 'Оберіть інструмент для роботи з клієнтом',
        btnTools: 'Інструменти',
        btnChecklists: 'Чек-листи',
        searchPlaceholder: 'Пошук...',
        categories: [
            { id: 'all', label: 'Всі' },
            { id: 'assessment', label: 'Оцінка' },
            { id: 'intervention', label: 'Інтервенції' },
            { id: 'psychoeducation', label: 'Психоедукація' },
            { id: 'planning', label: 'Планування' },
            { id: 'documentation', label: 'Документація' },
            { id: 'feedback', label: 'Зворотній зв\'язок' }
        ],
        notFound: 'Інструментів не знайдено'
    },
    en: {
        title: 'Tools Catalog',
        subtitle: 'Select a tool to work with your client',
        btnTools: 'Tools',
        btnChecklists: 'Checklists',
        searchPlaceholder: 'Search...',
        categories: [
            { id: 'all', label: 'All' },
            { id: 'assessment', label: 'Assessment' },
            { id: 'intervention', label: 'Interventions' },
            { id: 'psychoeducation', label: 'Psychoeducation' },
            { id: 'planning', label: 'Planning' },
            { id: 'documentation', label: 'Documentation' },
            { id: 'feedback', label: 'Feedback' }
        ],
        notFound: 'No tools found'
    }
};

export function ToolsCatalogDemo() {
    const { language } = useLanguage();
    const t = uiText[language];
    const tools = toolsData[language];

    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || tool.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-full h-full min-h-[350px] sm:min-h-[500px] bg-[#0B1120] text-slate-300 font-sans selection:bg-emerald-500/30 flex flex-col rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 pointer-events-none" />

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 z-10 w-full">
                <h2 className="text-xl font-bold text-white mb-1">{t.title}</h2>
                <div className="text-sm text-slate-500">{t.subtitle}</div>

                <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                            <span>🚀</span> {t.btnTools} ({tools.length})
                        </button>
                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2">
                            <span>☑️</span> {t.btnChecklists} (3)
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    {/* Search */}
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        />
                        <span className="absolute right-3 top-2.5 text-slate-500">🔍</span>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        {t.categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${activeFilter === cat.id
                                    ? 'bg-emerald-500 text-white border-emerald-500'
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 z-10 bg-[#0B1120]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTools.map((tool) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, borderColor: 'rgba(99,102,241,0.5)' }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 cursor-pointer shadow-lg hover:shadow-indigo-500/10 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 rounded-lg bg-slate-800 text-2xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                                <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                    {tool.duration}
                                </span>
                            </div>
                            <h3 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{tool.title}</h3>
                            <p className="text-xs text-slate-400 mb-4 line-clamp-3">{tool.description}</p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {tool.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                    {filteredTools.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            {t.notFound}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
