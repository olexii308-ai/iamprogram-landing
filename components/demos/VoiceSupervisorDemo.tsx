'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageCtx';

// ============================================================
// AI Voice Supervisor
// Voice: MediaRecorder → base64 audio → Gemini (native audio)
// TTS: speechSynthesis
// NO SpeechRecognition — Gemini handles STT natively
// ============================================================

interface Message {
    role: 'user' | 'ai';
    text: string;
}

type WindowWithWebkitAudioContext = Window & {
    webkitAudioContext?: typeof AudioContext;
};

// ========================
// TEXT FORMATTING FOR AI RESPONSES
// ========================
const formatMessageText = (text: string): React.ReactNode => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/);
    
    const formatInlineText = (text: string): React.ReactNode => {
        // Bold: **text** or __text__
        const boldRegex = /\*\*(.+?)\*\*|__(.+?)__/g;
        
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
        let key = 0;
        
        while ((match = boldRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            parts.push(
                <strong key={`b-${key++}`} className="font-semibold text-white">
                    {match[1] || match[2]}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
        
        return parts.length > 0 ? parts : text;
    };

    return (
        <div className="space-y-3">
            {paragraphs.map((p, idx) => {
                // Handle bullet points
                if (p.match(/^[•\-\*]\s/m)) {
                    const lines = p.split('\n').filter(l => l.trim());
                    return (
                        <ul key={idx} className="space-y-1.5 ml-2">
                            {lines.map((line, lidx) => {
                                const match = line.match(/^[•\-\*]\s(.+)/);
                                return match ? (
                                    <li key={lidx} className="flex items-start gap-2 text-slate-300/90">
                                        <span className="text-purple-400 mt-1.5 text-xs">●</span>
                                        <span className="leading-relaxed">{formatInlineText(match[1])}</span>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    );
                }
                
                // Regular paragraph
                return (
                    <p key={idx} className="text-slate-300/90 leading-relaxed">
                        {formatInlineText(p)}
                    </p>
                );
            })}
        </div>
    );
};

const uiText = {
    uk: {
        statusRecording: '🔴 Записую...',
        statusThinking: '🧠 Аналізую...',
        statusSpeaking: '🔊 Відповідаю...',
        statusIdle: '🎙️ AI Супервізор',
        initialTitle: 'AI Клінічний Супервізор',
        initialDesc: 'Натисніть кнопку мікрофона, опишіть ваш клінічний випадок голосом. Gemini 3 Flash аналізує та відповідає.',
        userPlaceholder: '🎙️ Голосове повідомлення...',
        errorMic: 'Мікрофон заблоковано. Натисніть 🔒 зліва від URL → дозвольте мікрофон.',
        errorMicAccess: 'Не вдалось отримати доступ до мікрофону.',
        errorApi: 'Помилка з\'єднання з AI.',
        errorRecognize: 'Не вдалось розпізнати. Спробуйте ще раз.',
        hintIdle: 'Натисніть для запису голосового повідомлення',
        hintRecording: 'Натисніть ⏹️ щоб зупинити запис',
        hintThinking: 'Gemini обробляє ваше повідомлення...',
        hintSpeaking: 'AI відповідає голосом...',
        supervisorRole: 'SUPERVISOR',
        modelName: 'Gemini 3 Flash'
    },
    en: {
        statusRecording: '🔴 Recording...',
        statusThinking: '🧠 Thinking...',
        statusSpeaking: '🔊 Speaking...',
        statusIdle: '🎙️ AI Supervisor',
        initialTitle: 'AI Clinical Supervisor',
        initialDesc: 'Press the microphone button, describe your clinical case by voice. Gemini 3 Flash analyzes and responds.',
        userPlaceholder: '🎙️ Voice message...',
        errorMic: 'Microphone blocked. Click 🔒 left of URL → allow microphone.',
        errorMicAccess: 'Could not access microphone.',
        errorApi: 'Connection error with AI.',
        errorRecognize: 'Could not recognize. Please try again.',
        hintIdle: 'Press to record voice message',
        hintRecording: 'Press ⏹️ to stop recording',
        hintThinking: 'Gemini is processing your message...',
        hintSpeaking: 'AI is responding by voice...',
        supervisorRole: 'SUPERVISOR',
        modelName: 'Gemini 3 Flash'
    }
};

export const VoiceSupervisorDemo = () => {
    const { language } = useLanguage();
    const t = uiText[language];

    const [status, setStatus] = useState<'idle' | 'recording' | 'thinking' | 'speaking'>('idle');
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState('');

    // Reset state when language changes
    useEffect(() => {
        setMessages([]);
        setStatus('idle');
        setError('');
    }, [language]);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const messagesRef = useRef<Message[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);

    // Canvas visualization
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number>(0);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => { messagesRef.current = messages; }, [messages]);

    // Auto-scroll
    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopRecording(true);
            window.speechSynthesis?.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ========================
    // AUDIO VISUALIZATION
    // ========================
    const startVisualizer = useCallback((stream: MediaStream) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const AudioCtx = window.AudioContext || (window as WindowWithWebkitAudioContext).webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;

        const bufLen = analyser.frequencyBinCount;
        const data = new Uint8Array(bufLen);

        const draw = () => {
            rafRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(data);
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            const centerY = canvas.height / 2;
            const barW = (canvas.width / bufLen) * 2.5;
            let x = 0;

            for (let i = 0; i < bufLen; i++) {
                const barH = (data[i] / 255) * centerY;
                const hue = 250 + (i / bufLen) * 40;
                const light = 35 + (data[i] / 255) * 35;

                canvasCtx.fillStyle = `hsl(${hue}, 80%, ${light}%)`;
                canvasCtx.fillRect(x, centerY - barH, barW - 1, barH);
                canvasCtx.fillRect(x, centerY, barW - 1, barH * 0.5);
                x += barW;
            }
        };
        draw();
    }, []);

    const stopVisualizer = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close().catch(() => { });
        }
        audioCtxRef.current = null;
        analyserRef.current = null;
    }, []);

    // ========================
    // FALLBACK: Browser TTS
    // ========================
    const speakFallback = useCallback((text: string) => {
        const synth = window.speechSynthesis;
        if (!synth) { setStatus('idle'); return; }
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'uk' ? 'uk-UA' : 'en-US';
        utterance.rate = 0.95;
        utterance.onend = () => setStatus('idle');
        utterance.onerror = () => setStatus('idle');
        synth.speak(utterance);
    }, [language]);

    // ========================
    // SEND AUDIO TO GEMINI
    // ========================
    const processAudio = useCallback(async (base64: string, mimeType: string) => {
        setStatus('thinking');

        const userMsg: Message = { role: 'user', text: t.userPlaceholder };
        setMessages(prev => [...prev, userMsg]);

        try {
            const history = messagesRef.current.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                text: m.text
            }));

            console.log('[VoiceSupervisor] Sending request with history:', history.length);

            const res = await fetch('/api/supervisor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audioBase64: base64, mimeType, history, language })
            });

            // Check if response is OK before parsing JSON
            if (!res.ok) {
                let errorMessage = 'Server error';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.error || errorMessage;
                    console.error('[VoiceSupervisor] API Error:', errorData);
                } catch (parseErr) {
                    console.error('[VoiceSupervisor] Failed to parse error response:', parseErr);
                    errorMessage = `Server error: ${res.status} ${res.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await res.json();
            console.log('[VoiceSupervisor] Response received:', { textLength: data.response?.length });

            const aiText = data.response || t.errorRecognize;

            setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
            setStatus('speaking');

            // Browser TTS (безкоштовно, працює локально)
            speakFallback(aiText);

        } catch (err) {
            console.error('[VoiceSupervisor] API error:', err);
            setError(t.errorApi);
            setStatus('idle');
        }
    }, [t, language, speakFallback]);

    // ========================
    // RECORDING (MediaRecorder)
    // ========================
    const startRecording = useCallback(async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Determine supported mime type
            let mimeType = 'audio/webm';
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                mimeType = 'audio/webm;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
                mimeType = 'audio/ogg;codecs=opus';
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4';
            }

            const recorder = new MediaRecorder(stream, { mimeType });
            audioChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                // Combine chunks into single blob
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

                // Stop mic
                stream.getTracks().forEach(t => t.stop());
                streamRef.current = null;
                stopVisualizer();

                // Convert to base64 and send
                const base64 = await blobToBase64(audioBlob);
                // mimeType is already 'audio/webm' or similar from startRecording scope
                await processAudio(base64, mimeType);
            };

            mediaRecorderRef.current = recorder;
            recorder.start(250); // collect data every 250ms

            setStatus('recording');
            startVisualizer(stream);

        } catch (err: unknown) {
            console.error('[VoiceSupervisor] Mic error:', err);
            if (err instanceof DOMException && err.name === 'NotAllowedError') {
                setError(t.errorMic);
            } else {
                setError(t.errorMicAccess);
            }
        }
    }, [startVisualizer, stopVisualizer, t, processAudio]);

    const stopRecording = useCallback((force = false) => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (force) {
            streamRef.current?.getTracks().forEach(t => t.stop());
            streamRef.current = null;
            stopVisualizer();
        }
    }, [stopVisualizer]);

    // ========================
    // SEND AUDIO TO GEMINI
    // ========================




    // ========================
    // HELPERS
    // ========================
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                // Remove "data:audio/webm;base64," prefix
                resolve(dataUrl.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleMicClick = useCallback(() => {
        if (status === 'recording') {
            stopRecording();
        } else if (status === 'idle') {
            startRecording();
        }
    }, [status, startRecording, stopRecording]);

    // ========================
    // RENDER
    // ========================
    return (
        <div className="h-full min-h-[500px] flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full transition-colors ${status === 'recording' ? 'bg-red-500 animate-pulse' :
                    status === 'thinking' ? 'bg-amber-500 animate-pulse' :
                        status === 'speaking' ? 'bg-green-500 animate-pulse' :
                            'bg-slate-600'
                    }`} />
                <span className="text-sm font-medium text-slate-300">
                    {status === 'recording' ? t.statusRecording :
                        status === 'thinking' ? t.statusThinking :
                            status === 'speaking' ? t.statusSpeaking :
                                t.statusIdle}
                </span>
                <span className="ml-auto text-[10px] text-slate-600 font-mono">{t.modelName}</span>
            </div>

            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4">🧠</div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-2">{t.initialTitle}</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto">
                            {t.initialDesc}
                        </p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[90%] px-5 py-4 rounded-2xl ${msg.role === 'user'
                            ? 'bg-indigo-600/30 text-indigo-100 rounded-br-md'
                            : 'bg-slate-800/80 text-slate-200 rounded-bl-md border border-white/5 shadow-lg shadow-slate-900/50'
                            }`}>
                            {msg.role === 'ai' && (
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                                    <span className="text-xs text-purple-400 font-mono uppercase tracking-wider">{t.supervisorRole}</span>
                                    <span className="w-1 h-1 rounded-full bg-purple-400/50"></span>
                                </div>
                            )}
                            {msg.role === 'ai' ? formatMessageText(msg.text) : (
                                <span className="text-sm opacity-80">{msg.text}</span>
                            )}
                        </div>
                    </motion.div>
                ))}

                {/* Thinking */}
                {status === 'thinking' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-slate-800/80 border border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-2 bg-red-950/50 border-t border-red-500/20"
                    >
                        <p className="text-xs text-red-400">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Visualizer + Mic */}
            <div className="border-t border-white/5 bg-slate-950/80 px-6 py-5">
                {/* Visualizer */}
                <div className={`h-16 mb-4 rounded-lg overflow-hidden transition-opacity duration-300 ${status === 'recording' ? 'opacity-100' : 'opacity-10'
                    }`}>
                    <canvas ref={canvasRef} width={600} height={64} className="w-full h-full" />
                </div>

                {/* Mic Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleMicClick}
                        disabled={status === 'thinking' || status === 'speaking'}
                        className={`
                            relative w-16 h-16 rounded-full flex items-center justify-center
                            transition-all duration-300 focus:outline-none
                            ${status === 'recording'
                                ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110'
                                : status === 'thinking' || status === 'speaking'
                                    ? 'bg-slate-700 cursor-not-allowed opacity-50'
                                    : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-lg shadow-indigo-600/30 active:scale-95'
                            }
                        `}
                    >
                        <span className="text-2xl">
                            {status === 'recording' ? '⏹️' :
                                status === 'thinking' ? '⏳' :
                                    status === 'speaking' ? '🔊' : '🎤'}
                        </span>
                        {status === 'recording' && (
                            <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30" />
                        )}
                    </button>
                </div>

                <p className="text-center text-[11px] text-slate-600 mt-3">
                    {status === 'idle' ? t.hintIdle :
                        status === 'recording' ? t.hintRecording :
                            status === 'thinking' ? t.hintThinking :
                                status === 'speaking' ? t.hintSpeaking : ''}
                </p>
            </div>
        </div>
    );
};
