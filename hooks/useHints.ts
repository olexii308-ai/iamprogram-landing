'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useHints(hintKey: string) {
    const [hasSeen, setHasSeen] = useState(true); // Default true to prevent hydration mismatch flashes
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);
    const storageKey = `ia_hints_${hintKey}`;

    useEffect(() => {
        // Read from localStorage on mount
        const seen = localStorage.getItem(storageKey) === 'true';
        setHasSeen(seen);
    }, [storageKey]);

    useEffect(() => {
        if (hasSeen || !elementRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show hint when element is at least 50% visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasSeen]);

    const dismissHint = useCallback(() => {
        if (!hasSeen) {
            localStorage.setItem(storageKey, 'true');
            setHasSeen(true);
            setIsVisible(false);
        }
    }, [hasSeen, storageKey]);

    return {
        ref: elementRef,
        showHint: isVisible && !hasSeen,
        dismissHint
    };
}
