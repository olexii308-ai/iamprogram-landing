import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform for Solo Psychologists in Private Practice',
  description:
    'bravery.academy is built for psychologists running a private practice. Secure sessions, structured clinical tools, AI supervision, and Zero-Knowledge notes — everything a solo practitioner needs without the overhead of enterprise EHR systems.',
  keywords: [
    'platform for private practice psychologist',
    'solo therapist practice management',
    'private psychologist tools',
    'therapy platform solo practice',
    'платформа для приватного психолога',
    'інструменти для психолога приватна практика',
    'secure therapy platform solo',
    'EHR for solo therapist',
    'mental health tools private practice',
  ],
  alternates: {
    canonical: '/for/private-psychologist',
  },
  openGraph: {
    title: 'For Solo Psychologists — bravery.academy',
    description:
      'Everything a private-practice psychologist needs: secure sessions, clinical notes, AI supervision, and Zero-Knowledge privacy — without paying for enterprise features you don\'t need.',
    url: '/for/private-psychologist',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promo.bravery.academy';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'bravery.academy for Solo Private-Practice Psychologists',
  description:
    'Practice management and AI supervision platform designed for psychologists in solo private practice.',
  url: `${siteUrl}/for/private-psychologist`,
  isPartOf: { '@type': 'WebSite', name: 'bravery.academy', url: siteUrl },
  audience: {
    '@type': 'Audience',
    audienceType: 'Private practice psychologists, Solo therapists',
  },
};

const tools = [
  {
    name: 'Secure video sessions',
    description: 'Browser-based, no app download required. HIPAA/GDPR-ready encrypted video calls with your clients.',
    icon: '📹',
  },
  {
    name: 'Zero-Knowledge clinical notes',
    description: 'Write and store session notes encrypted client-side. The platform cannot read them. Neither can anyone else.',
    icon: '🔒',
  },
  {
    name: 'AI supervision assistant',
    description: 'CBT-oriented reflective prompts between human supervision sessions. Works without exposing client PII.',
    icon: '🤖',
  },
  {
    name: 'Structured clinical tools',
    description: 'Assessment flows, checklists, case tracking, and outcome measurement — all in one place.',
    icon: '📋',
  },
  {
    name: 'Progress analytics',
    description: 'Track client outcomes over time with visual progress graphs and structured documentation.',
    icon: '📈',
  },
  {
    name: 'Dedicated infrastructure option',
    description: 'When you grow to clinic scale, request isolated servers and separate databases.',
    icon: '🏗️',
  },
];

export default function PrivatePsychologistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">

          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">bravery.academy</Link>
            <span className="mx-2">/</span>
            <span>For private psychologists</span>
          </nav>

          <div className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            Solo practice
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The privacy-first platform<br />
            <span className="text-emerald-400">built for solo psychologists</span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
            You don&apos;t need enterprise billing, insurance claims processing, or a 12-seat license.
            You need secure sessions, structured notes, and a supervision tool that doesn&apos;t compromise your clients&apos; privacy.
          </p>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Everything you need. Nothing you don&apos;t.</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.name} className="p-5 rounded-xl border border-slate-700 bg-slate-800/30 flex gap-4">
                  <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">Why not just use SimplePractice or TherapyNotes?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              SimplePractice and TherapyNotes are excellent for US-based insurance billing workflows. If you need to submit
              CPT codes to insurance payers and process ERA remittances — they are built for that.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              But if you practice in Europe or Ukraine, operate self-pay, and care deeply about client data privacy,
              those platforms require you to trust them with readable access to your clinical notes.
              bravery.academy doesn&apos;t.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We also give you AI supervision — not just AI note-taking. That&apos;s a workflow none of the mainstream
              EHR platforms provide.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">What solo practitioners say matters most</h2>
            <div className="space-y-4">
              {[
                { concern: 'Client data security', response: 'Zero-Knowledge encryption. The platform literally cannot read your notes.' },
                { concern: 'Privacy from the platform itself', response: 'Client-side encryption means even bravery.academy developers have no access.' },
                { concern: 'AI that doesn\'t exploit session data', response: 'AI supervision uses anonymized context. Your sessions never train our models.' },
                { concern: 'Not paying for features I don\'t use', response: 'Beta access is free. Grow into paid features only when you need them.' },
                { concern: 'EU/UA compliance (GDPR)', response: 'Privacy-by-design architecture built for GDPR-ready deployments from day one.' },
              ].map(({ concern, response }) => (
                <div key={concern} className="grid md:grid-cols-2 gap-2 p-4 rounded-xl border border-slate-700 bg-slate-800/20">
                  <div className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="text-slate-500 mt-0.5">❓</span>
                    <span>{concern}</span>
                  </div>
                  <div className="text-slate-200 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✅</span>
                    <span>{response}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-2">Beta offer for private practitioners</h2>
            <p className="text-amber-200 font-semibold mb-4">First 30 solo users → 3 years of free platform access</p>
            <p className="text-slate-300 mb-6 text-sm">
              AI features are billed separately. Core platform (sessions, notes, tools, supervision) is free for the full beta period.
            </p>
            <Link
              href="/#hero-block"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-colors"
            >
              Join beta waitlist
            </Link>
          </section>

          <footer className="text-sm text-slate-500 pt-8 border-t border-slate-800">
            <Link href="/" className="hover:text-white transition-colors">← Back to bravery.academy</Link>
          </footer>

        </div>
      </main>
    </>
  );
}
