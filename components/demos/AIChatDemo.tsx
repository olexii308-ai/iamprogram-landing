'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function AIChatDemo() {
    const [messages, setMessages] = useState<{ id: number; text: string; sender: 'user' | 'ai' }[]>([
        { id: 1, text: "I've been feeling really overwhelmed lately during presentations.", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "Tell me more about that.",
        "What physical sensations do you notice?",
        "Have you tried breathing exercises?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = (text: string) => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "That sounds difficult. When you notice these sensations, what is usually going through your mind?",
                sender: 'ai'
            }]);
        }, 1500);
    };

    return (
        <div className="w-full h-full min-h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    🤖
                </div>
                <div>
                    <div className="font-semibold text-white">AI Client Simulator</div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex flex-wrap gap-2 mb-3">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => handleSendMessage(suggestion)}
                            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-indigo-300 px-3 py-1.5 rounded-full transition-colors truncate max-w-full"
                            disabled={isTyping}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors text-slate-200"
                        disabled
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white" disabled>
                        ↑
                    </button>
                </div>
            </div>
        </div>
    );
}
