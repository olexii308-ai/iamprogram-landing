import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini 3 Flash для аналізу та генерації текстової відповіді
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION_UK = `Роль:
Ти — досвідчений, мудрий і дуже людяний клінічний супервізор. Твоє завдання — бути "дзеркалом" для терапевта. Ти не звітуєш, ти ведеш живий діалог.

Принципи живого спілкування:

Жодних списків та заголовків: Ніколи не кажи "Пункт перший", "Резюме" або "Валідація". Твоя мова має бути плавною, як у звичайної людини.

Стислість — це ключ: У голосовому режимі довгі монологи втомлюють. Говори короткими реченнями. Одна думка за раз.

Емпатія через інтонацію (текстом): Використовуй фрази-зв'язки: "Так, розумію...", "Хм, цікаво...", "Ого, це справді звучить непросто".

Сократівський стиль у розмові: Замість того, щоб видавати список питань, став одне глибоке питання і чекай на відповідь. Дай терапевту простір для роздумів.

Реакція на контекст: Якщо терапевт просто привітався — просто привітайся у відповідь, запитай, з яким настроєм він сьогодні прийшов або з чим хоче попрацювати. Не намагайся одразу "супервізувати" привітання.

Твій характер:
Ти спокійний, впевнений, але теплий. Ти не повчаєш, а підсвічуєш шлях. Якщо спеціаліст ділиться важким станом — зупинись, підтримай його по-людськи, і лише потім обережно повертай до клінічного випадку.`;

const SYSTEM_INSTRUCTION_EN = `
You are a professional clinical supervisor specializing in CBT (Cognitive Behavioral Therapy).
Your task is to help therapists analyze complex cases, provide feedback, and suggest interventions.
Communication style: professional, empathetic, concise. Respond in English.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { audioBase64, mimeType, history, language } = body;

        console.log('[Supervisor API] Request received:', {
            hasAudio: !!audioBase64,
            mimeType,
            historyLength: history?.length || 0,
            language
        });

        // Validation
        if (!audioBase64) {
            return NextResponse.json({ error: 'No audio data' }, { status: 400 });
        }

        // Transform history to Gemini format - filter out placeholder messages
        const geminiHistory = (history || [])
            .filter((h: { role: string; text: string }) => {
                // Filter out voice placeholder messages
                const isPlaceholder = h.text.includes('🎙️') || h.text.includes('Voice message');
                return !isPlaceholder && h.text.trim().length > 0;
            })
            .map((h: { role: string; text: string }) => ({
                role: h.role,
                parts: [{ text: h.text }]
            }));

        console.log('[Supervisor API] Gemini history:', JSON.stringify(geminiHistory, null, 2));

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            systemInstruction: language === 'en' ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_UK
        });

        // Chat history handling
        const chat = model.startChat({
            history: geminiHistory,
        });

        // Add the audio part
        const result = await chat.sendMessage([
            {
                inlineData: {
                    mimeType: mimeType || 'audio/webm',
                    data: audioBase64
                }
            },
            { text: "Please analyze this audio input and provide supervision feedback." }
        ]).catch(err => {
            console.error('[Supervisor API] Gemini sendMessage error:', err);
            throw err;
        });

        const response = result.response;
        const text = response.text();
        
        console.log('[Supervisor API] Response text length:', text?.length || 0);

        // Browser TTS використовується на клієнті (безкоштовно)
        return NextResponse.json({
            response: text
        });

    } catch (error: unknown) {
        console.error('Gemini API Error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
