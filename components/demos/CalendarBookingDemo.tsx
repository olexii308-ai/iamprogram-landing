'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

const uiText = {
    uk: {
        viewTherapist: 'Календар (Терапевт)',
        viewClient: 'Запис (Клієнт)',
        sessions: 'Сесій',
        hours: 'Годин',
        filters: 'Фільтри:',
        filterPlanned: 'Заплановано',
        filterCompleted: 'Завершено',
        filterCancelled: 'Скасовано',
        rangeMonth: 'Місяць',
        rangeWeek: 'Тиждень',
        rangeDay: 'День',
        allDay: 'Весь день',
        days: ['ПН, 16', 'ВТ, 17', 'СР, 18', 'ЧТ, 19', 'ПТ, 20', 'СБ, 21', 'НД, 22'],
        back: '← Назад',
        scheduleTitle: 'Запланувати сесію',
        scheduleSubtitle: 'Заповніть дані та оберіть зручний час',
        durationLabel: '50 хвилин',
        durationDesc: 'Тривалість однієї консультаційної сесії.',
        timezoneLabel: 'Часовий пояс',
        pickTime: 'Оберіть зручний час',
        availableSlots: 'Доступні слоти',
        confirm: 'Підтвердити',
        study: 'Навчання',
        planned: 'Заплановано',
        dates: '16 – 22 лют. 2026 р.',
        dayLabels: ['ПОН', 'ВІВ', 'СЕР', 'ЧТВ', 'ПТН', 'СУБ', 'НД']
    },
    en: {
        viewTherapist: 'Calendar (Therapist)',
        viewClient: 'Booking (Client)',
        sessions: 'Sessions',
        hours: 'Hours',
        filters: 'Filters:',
        filterPlanned: 'Scheduled',
        filterCompleted: 'Completed',
        filterCancelled: 'Cancelled',
        rangeMonth: 'Month',
        rangeWeek: 'Week',
        rangeDay: 'Day',
        allDay: 'All day',
        days: ['MON, 16', 'TUE, 17', 'WED, 18', 'THU, 19', 'FRI, 20', 'SAT, 21', 'SUN, 22'],
        back: '← Back',
        scheduleTitle: 'Schedule Session',
        scheduleSubtitle: 'Fill details and pick a convenient time',
        durationLabel: '50 minutes',
        durationDesc: 'Duration of one consultation session.',
        timezoneLabel: 'Timezone',
        pickTime: 'Select convenient time',
        availableSlots: 'Available slots',
        confirm: 'Confirm',
        study: 'Study',
        planned: 'Scheduled',
        dates: 'Feb 16 – 22, 2026',
        dayLabels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    }
};

export function CalendarBookingDemo() {
    const { language } = useLanguage();
    const t = uiText[language];

    const [view, setView] = useState<'calendar' | 'booking'>('calendar');
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Mock Calendar Events
    const events = [
        { id: 1, day: 1, start: 8, duration: 1, title: 'C-MLMT2M5T-YFJ', type: 'session', status: 'completed' },
        { id: 2, day: 1, start: 10, duration: 4, title: t.study, type: 'block', status: 'block' },
        { id: 3, day: 4, start: 7.5, duration: 1, title: 'C-MLNY1R16-V0SR', type: 'session', status: 'planned' },
        { id: 4, day: 5, start: 8, duration: 1, title: 'C-MLNY1R16-V0SR', type: 'session', status: 'planned' },
        { id: 5, day: 5, start: 12.5, duration: 1, title: 'C-MLMT2M5T-YFJ', type: 'session', status: 'planned' },
    ];

    const dateStrip = t.dayLabels.map((d, i) => `${d}\n${16 + i}`);

    return (
        <div className="w-full h-full min-h-[500px] bg-[#0B1120] text-slate-300 font-sans selection:bg-emerald-500/30 flex flex-col rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">

            {/* View Switcher (Demo Control) */}
            <div className="absolute top-4 right-4 z-20 bg-slate-900 border border-slate-700 rounded-lg p-1 flex gap-1">
                <button
                    onClick={() => setView('calendar')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${view === 'calendar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    {t.viewTherapist}
                </button>
                <button
                    onClick={() => setView('booking')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${view === 'booking' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    {t.viewClient}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {view === 'calendar' ? (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full bg-[#0F172A]"
                    >
                        {/* Calendar Header */}
                        <div className="p-6 border-b border-slate-800 bg-[#0B1120]">
                            <div className="flex gap-4 mb-4">
                                <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 px-4 flex items-center gap-3">
                                    <div className="text-emerald-500 text-xl">📅</div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase">{t.sessions}</div>
                                        <div className="font-bold text-white">4</div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 px-4 flex items-center gap-3">
                                    <div className="text-indigo-500 text-xl">🕒</div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase">{t.hours}</div>
                                        <div className="font-bold text-white">3.3 год</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 text-[10px] mb-4">
                                <span className="text-slate-500 uppercase mr-2 mt-1">{t.filters}</span>
                                <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">✅ {t.filterPlanned}</span>
                                <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">✓ {t.filterCompleted}</span>
                                <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">✕ {t.filterCancelled}</span>
                            </div>

                            <div className="flex justify-between items-center text-white font-medium">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1">
                                        <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded">‹</button>
                                        <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded">›</button>
                                    </div>
                                    <span>{t.dates}</span>
                                </div>
                                <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-700">
                                    <button className="px-3 py-1 text-xs text-slate-400 hover:text-white">{t.rangeMonth}</button>
                                    <button className="px-3 py-1 text-xs bg-emerald-600 text-white rounded shadow-sm">{t.rangeWeek}</button>
                                    <button className="px-3 py-1 text-xs text-slate-400 hover:text-white">{t.rangeDay}</button>
                                </div>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="flex-1 overflow-auto relative">
                            {/* Header Row */}
                            <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-slate-800 bg-[#0B1120] sticky top-0 z-10">
                                <div className="border-r border-slate-800 p-2 text-[10px] text-slate-500 text-center font-bold">{t.allDay}</div>
                                {t.days.map(day => (
                                    <div key={day} className="border-r border-slate-800 p-2 text-xs text-slate-400 text-center uppercase tracking-wider">{day}</div>
                                ))}
                            </div>

                            {/* Time Grid */}
                            <div className="grid grid-cols-[50px_repeat(7,1fr)] relative min-w-[600px]">
                                {/* Time Labels */}
                                <div className="border-r border-slate-800 bg-[#0B1120]">
                                    {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
                                        <div key={hour} className="h-16 border-b border-slate-800/50 text-[10px] text-slate-600 text-center pt-1">
                                            {hour}:00
                                        </div>
                                    ))}
                                </div>

                                {/* Columns */}
                                {[0, 1, 2, 3, 4, 5, 6].map(day => (
                                    <div key={day} className="border-r border-slate-800 relative">
                                        {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => (
                                            <div key={hour} className="h-16 border-b border-slate-800/50"></div>
                                        ))}

                                        {/* Events */}
                                        {events.filter(e => e.day === day).map(event => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`absolute left-1 right-1 rounded p-2 text-xs overflow-hidden border cursor-pointer hover:brightness-110 transition-all z-10 ${event.type === 'session'
                                                    ? 'bg-blue-600 border-blue-500 text-white'
                                                    : 'bg-indigo-600 border-indigo-500 text-white'
                                                    }`}
                                                style={{
                                                    top: `${(event.start - 7) * 64}px`, // 64px per hour
                                                    height: `${event.duration * 64}px`
                                                }}
                                            >
                                                <div className="font-bold truncate">{event.title}</div>
                                                <div className="text-[9px] opacity-80 mt-1">
                                                    {event.type === 'session' ? t.planned : t.study}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}

                                {/* Current Time Line */}
                                <div className="absolute left-[50px] right-0 border-t border-red-500/50 z-20 pointer-events-none" style={{ top: '560px' }}> {/* 15:45 approx */}
                                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="booking"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full p-6 sm:p-12 items-center justify-center bg-[#0B1120]"
                    >
                        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                            {/* Left Side: Info */}
                            <div className="w-full md:w-1/3 bg-slate-950 p-6 border-r border-slate-800 flex flex-col">
                                <button className="text-xs text-slate-400 hover:text-white mb-6 flex items-center gap-1">{t.back}</button>

                                <h3 className="text-xl font-bold text-white mb-1">{t.scheduleTitle}</h3>
                                <p className="text-xs text-slate-500 mb-6">{t.scheduleSubtitle}</p>

                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                                        <div className="text-xs text-emerald-400 font-bold mb-1">⏱ {t.durationLabel}</div>
                                        <div className="text-[10px] text-slate-500">{t.durationDesc}</div>
                                    </div>

                                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                                        <div className="text-xs text-indigo-400 font-bold mb-1">🌍 {t.timezoneLabel}</div>
                                        <div className="text-[10px] text-slate-300">Europe/Kyiv (GMT+2)</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Slots */}
                            <div className="flex-1 p-6">
                                <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-indigo-500 pl-3">{t.pickTime}</h4>

                                {/* Date Strip */}
                                <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                                    {dateStrip.map((d, i) => (
                                        <button
                                            key={i}
                                            className={`min-w-[50px] h-[70px] rounded-lg border flex flex-col items-center justify-center text-xs font-bold transition-all ${i === 1 // Selected
                                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105'
                                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                                                }`}
                                        >
                                            <span className="text-[10px] opacity-70 mb-1">{d.split('\n')[0]}</span>
                                            <span className="text-lg">{d.split('\n')[1]}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Time Slots */}
                                <div className="mb-2 text-xs text-slate-500 font-bold uppercase tracking-wider">{t.availableSlots}</div>
                                <div className="grid grid-cols-3 gap-3">
                                    {['07:00', '08:05', '09:10', '12:00', '13:05', '14:10'].map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedSlot(time)}
                                            className={`py-3 rounded-lg border text-sm font-medium transition-all ${selectedSlot === time
                                                ? 'bg-white text-black border-white shadow-lg'
                                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                {selectedSlot && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-colors"
                                    >
                                        {t.confirm}: {selectedSlot}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
