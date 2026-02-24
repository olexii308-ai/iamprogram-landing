import { motion, AnimatePresence } from 'framer-motion';

interface InlineHintProps {
    show: boolean;
    language: 'uk' | 'en';
    type: 'swipe' | 'tap' | 'scroll';
    ukText?: string;
    enText?: string;
}

export function InlineHint({ show, language, type, ukText, enText }: InlineHintProps) {
    let icon = '👆';
    let defaultUk = 'Натисніть для взаємодії';
    let defaultEn = 'Tap to interact';

    if (type === 'swipe') {
        icon = '👈';
        defaultUk = 'Гортайте вбік для інших варіаншів 👉';
        defaultEn = 'Swipe sideways for more options 👉';
    } else if (type === 'scroll') {
        icon = '👇';
        defaultUk = 'Гортайте вниз';
        defaultEn = 'Scroll down';
    }

    const text = language === 'uk' ? (ukText || defaultUk) : (enText || defaultEn);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginBottom: 12 }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden w-full flex justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                        <span className="animate-pulse">{icon}</span>
                        <span>{text}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
