import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type WaitlistPayload = {
    email?: string;
    role?: string;
    language?: string;
    source?: string;
};

type NormalizedPayload = {
    email: string;
    role: string;
    language: 'uk' | 'en';
    source: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = new Set(['default', 'therapist', 'clinic', 'student']);

const MESSAGES = {
    uk: {
        invalidEmail: 'Вкажіть коректний email.',
        missingEmail: 'Email обовʼязковий.',
        success: 'Ви успішно додані в лист очікування.',
        genericError: 'Не вдалося додати вас у лист очікування. Спробуйте ще раз.'
    },
    en: {
        invalidEmail: 'Please provide a valid email.',
        missingEmail: 'Email is required.',
        success: 'You were successfully added to the waitlist.',
        genericError: 'Could not add you to the waitlist. Please try again.'
    }
};

function normalizePayload(payload: WaitlistPayload): NormalizedPayload {
    const email = (payload.email ?? '').trim().toLowerCase();
    const roleCandidate = (payload.role ?? '').trim();
    const languageCandidate = (payload.language ?? '').trim().toLowerCase();
    const sourceCandidate = (payload.source ?? '').trim();

    const role = ALLOWED_ROLES.has(roleCandidate) ? roleCandidate : 'default';
    const language: 'uk' | 'en' = languageCandidate === 'en' ? 'en' : 'uk';

    return {
        email,
        role,
        language,
        source: sourceCandidate.length > 0 ? sourceCandidate.slice(0, 64) : 'unknown'
    };
}

function validatePayload(payload: NormalizedPayload): string | null {
    if (!payload.email) {
        return MESSAGES[payload.language].missingEmail;
    }

    if (!EMAIL_REGEX.test(payload.email)) {
        return MESSAGES[payload.language].invalidEmail;
    }

    return null;
}

export async function POST(req: Request) {
    let normalized: NormalizedPayload = {
        email: '',
        role: 'default',
        language: 'uk',
        source: 'unknown'
    };

    try {
        const body = (await req.json()) as WaitlistPayload;
        normalized = normalizePayload(body);

        const validationMessage = validatePayload(normalized);
        if (validationMessage) {
            return NextResponse.json(
                {
                    ok: false,
                    status: 'validation_error',
                    message: validationMessage
                },
                { status: 400 }
            );
        }

        // ProtonMail Enterprise SMTP Configuration
        const smtpHost = process.env['SMTP_HOST'] || 'smtp.protonmail.ch';
        const smtpPort = parseInt(process.env['SMTP_PORT'] || '587', 10);
        const smtpUser = process.env['SMTP_USER'];
        const smtpPass = process.env['SMTP_PASS'];
        const contactEmail = process.env['CONTACT_EMAIL'];

        if (!smtpUser || !smtpPass || !contactEmail) {
            console.error('[waitlist] Missing SMTP config. Need SMTP_USER, SMTP_PASS, CONTACT_EMAIL.');
            throw new Error('Server email configuration is missing');
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for 587 (STARTTLS)
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                // ProtonMail requires strict TLS
                rejectUnauthorized: true,
            },
        });

        const submittedAt = new Date().toISOString();

        await transporter.sendMail({
            from: `"Bravery Waitlist" <${smtpUser}>`,
            to: contactEmail,
            replyTo: normalized.email,
            subject: `[Waitlist] ${normalized.email} (${normalized.role})`,
            html: `
                <h2>New waitlist signup</h2>
                <p><strong>Email:</strong> ${normalized.email}</p>
                <p><strong>Role:</strong> ${normalized.role}</p>
                <p><strong>Language:</strong> ${normalized.language}</p>
                <p><strong>Source:</strong> ${normalized.source}</p>
                <p><strong>Submitted At:</strong> ${submittedAt}</p>
            `.trim(),
        });

        return NextResponse.json({
            ok: true,
            status: 'ok',
            message: MESSAGES[normalized.language].success
        });
    } catch (error) {
        console.error('[waitlist] submit failed', error);

        return NextResponse.json(
            {
                ok: false,
                status: 'server_error',
                message: MESSAGES[normalized.language].genericError
            },
            { status: 500 }
        );
    }
}
