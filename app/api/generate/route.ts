import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt, type } = await req.json(); // Added 'type'
        const apiKey = process.env.VERTEX_API_KEY;

        // MODE: TEXT (For Voice Supervisor)
        if (type === 'text') {
            if (!apiKey) {
                return NextResponse.json({
                    result: "Демонстраційний режим: API ключ не знайдено. Як супервізор, я рекомендую звернути увагу на емоційний стан клієнта. Що ви відчуваєте, коли клієнт мовчить?",
                    source: 'mock-text'
                });
            }

            const url = `https://generativelanguage.googleapis.com/v1alpha/models/gemini-3.0-flash-preview:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                return NextResponse.json({
                    result: "Вибачте, сервіс тимчасово недоступний (API Error). Спробуйте пізніше.",
                    source: 'error-text'
                });
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            return NextResponse.json({ result: text, source: 'gemini-3.0' });
        }

        // MODE: VISUAL (Default Generative Background)
        // ... existing procedural generation logic ...
        let primaryColor = '#4338ca'; // Default Indigo
        let secondaryColor = '#6366f1';
        let shapeType = 'circle';

        const p = prompt.toLowerCase();
        if (p.includes('emerald') || p.includes('security') || p.includes('fortress')) {
            primaryColor = '#059669'; // Emerald
            secondaryColor = '#10b981';
            shapeType = 'rect';
        } else if (p.includes('blue') || p.includes('calm') || p.includes('waves')) {
            primaryColor = '#0ea5e9'; // Sky Blue
            secondaryColor = '#3b82f6';
            shapeType = 'path';
        } else if (p.includes('neural') || p.includes('sparks') || p.includes('sunrise')) {
            primaryColor = '#d946ef'; // Fuchsia/Purple
            secondaryColor = '#f59e0b'; // Amber
            shapeType = 'circle';
        }

        const mockSvg = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.2" />
                        <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:0.1" />
                        <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0" />
                    </linearGradient>
                    <filter id="blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                </defs>
                <rect width="100" height="100" fill="url(#g1)" />
                ${shapeType === 'circle' ? `
                <circle cx="50" cy="50" r="30" fill="none" stroke="${secondaryColor}" stroke-width="0.5" opacity="0.3" filter="url(#blur)">
                    <animate attributeName="r" values="20;40;20" dur="10s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" />
                </circle>` : ''}
                ${shapeType === 'rect' ? `
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="${secondaryColor}" stroke-width="0.5" opacity="0.3" filter="url(#blur)">
                     <animate attributeName="width" values="60;70;60" dur="8s" repeatCount="indefinite" />
                     <animate attributeName="height" values="60;70;60" dur="8s" repeatCount="indefinite" />
                     <animate attributeName="x" values="20;15;20" dur="8s" repeatCount="indefinite" />
                     <animate attributeName="y" values="20;15;20" dur="8s" repeatCount="indefinite" />
                </rect>` : ''}
                ${shapeType === 'path' ? `
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="${secondaryColor}" stroke-width="0.4" opacity="0.3">
                    <animate attributeName="d" values="M0,50 Q25,30 50,50 T100,50;M0,50 Q25,70 50,50 T100,50;M0,50 Q25,30 50,50 T100,50" dur="15s" repeatCount="indefinite" />
                </path>` : ''}
                
                <circle cx="20" cy="80" r="10" fill="${primaryColor}" opacity="0.1" filter="url(#blur)">
                     <animate attributeName="cy" values="80;20;80" dur="20s" repeatCount="indefinite" />
                </circle>
            </svg>
        `.trim();

        if (!apiKey) {
            return NextResponse.json({ svg: mockSvg, source: 'mock-no-key' });
        }

        // Using Google Gemini API (generativelanguage.googleapis.com)
        // 2026 Model Update: Gemini 3.0 Flash Preview (v1alpha for Preview access)
        const url = `https://generativelanguage.googleapis.com/v1alpha/models/gemini-3.0-flash-preview:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Generate a creative, abstract, sci-fi style SVG shape description or code based on this concept: "${prompt}". 
            Return ONLY the SVG code without markdown formatting if possible, or a JSON with "svg" field.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            // SILENT FAILOVER: Return the procedural mock
            return NextResponse.json({ svg: mockSvg, source: 'mock-error-fallback' });
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Simple cleanup if it returns markdown code blocks
        let cleanSvg = generatedText.replace(/```svg/g, '').replace(/```/g, '').trim();

        // Fallback for empty responses
        if (!cleanSvg || cleanSvg.length < 10) {
            cleanSvg = mockSvg;
        }

        return NextResponse.json({ svg: cleanSvg, source: 'gemini-3.0' });
    } catch {
        // Fallback to a safe default
        return NextResponse.json({ svg: `<svg></svg>`, source: 'error' });
    }
}
