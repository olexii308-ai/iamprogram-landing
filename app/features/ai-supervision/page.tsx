import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Supervision for Therapists — Without Data Leaks',
  description:
    'bravery.academy provides AI-powered clinical supervision for psychologists using anonymized context — your session content never trains our AI. Built for CBT practitioners, private practices, and clinical training programs.',
  keywords: [
    'AI supervision therapy',
    'AI clinical supervision psychologist',
    'AI supervisor for therapists',
    'CBT supervision platform',
    'AI therapy notes supervision',
    'secure AI supervision',
    'AI without PII leakage',
    'therapy supervision software',
    'AI супервізія психолог',
    'AI супервізія терапевт',
  ],
  alternates: {
    canonical: '/features/ai-supervision',
  },
  openGraph: {
    title: 'AI Supervision for Therapists — bravery.academy',
    description:
      'AI-powered supervision that works without exposing client data. Designed for CBT practitioners who need reflective clinical support between human supervision sessions.',
    url: '/features/ai-supervision',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bravery.academy';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'AI Supervision for Therapists Without PII Leakage',
  description:
    'How bravery.academy delivers AI-powered clinical supervision that works with anonymized context — so client session data is never exposed.',
  url: `${siteUrl}/features/ai-supervision`,
  author: {
    '@type': 'Organization',
    name: 'bravery.academy',
    url: siteUrl,
  },
};

export default function AiSupervisionPage() {
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
            <span>AI Supervision</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AI Supervision for Therapists<br />
            <span className="text-violet-400">Without Data Leaks</span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
            Get structured reflective support between human supervision sessions —
            powered by AI that works with <strong className="text-white">anonymized context only</strong>.
            Your client&apos;s identity and session content stay protected.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">What is AI supervision for psychologists?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Traditional clinical supervision happens with a human supervisor on a fixed schedule — often weekly or bi-weekly.
              Between those sessions, practitioners are on their own when difficult clinical questions arise.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              AI supervision fills that gap. It provides a structured reflective process: asking CBT-oriented questions,
              helping you examine your formulation, identifying blind spots, and prompting documentation of your reasoning.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Unlike AI note-taking tools (Upheal, Mentalyc, Blueprint), bravery.academy&apos;s AI supervision is designed
              for the <em>supervisory process itself</em> — not just note automation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">How it protects client privacy</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="flex-shrink-0 text-violet-400 text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Anonymized context by design</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    AI supervision features are built to work with structured clinical patterns and anonymized session metadata —
                    not raw transcripts. Client names, identifiers, and sensitive disclosures are excluded from AI processing flows.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="flex-shrink-0 text-violet-400 text-2xl">🚫</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Your sessions don&apos;t train our AI</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Unlike many AI platforms, bravery.academy does not use your supervision sessions or clinical notes to train
                    or improve AI models. Your practice data is yours.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="flex-shrink-0 text-violet-400 text-2xl">🏗️</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Zero-Knowledge foundation</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    AI supervision operates on top of our Zero-Knowledge architecture — so even if AI processes
                    structured context, the underlying clinical notes remain encrypted and unreadable by the platform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Who is AI supervision for?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Solo private practitioners',
                  body: 'Between scheduled human supervision sessions, use AI to reflect on cases, formulations, and next-session planning.',
                },
                {
                  title: 'CBT therapists',
                  body: 'AI supervision is oriented around cognitive-behavioral frameworks — Socratic questioning, schema identification, cognitive restructuring review.',
                },
                {
                  title: 'Student practitioners',
                  body: 'Supplement formal training supervision with structured AI-guided reflection after each session.',
                },
                {
                  title: 'Clinic supervisors',
                  body: 'Use AI to help junior practitioners document their supervisory thinking before group supervision sessions.',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-slate-700 bg-slate-800/30">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">AI supervision vs. AI note-taking tools</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 pr-4 text-slate-400 font-medium">Feature</th>
                    <th className="text-left py-3 pr-4 text-emerald-400 font-medium">bravery.academy</th>
                    <th className="text-left py-3 text-slate-400 font-medium">Upheal / Mentalyc / Blueprint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['AI note generation', '✅', '✅'],
                    ['AI clinical supervision process', '✅', '❌'],
                    ['CBT-oriented reflective prompts', '✅', '❌'],
                    ['Zero-Knowledge architecture', '✅', 'Partial'],
                    ['Sessions train AI model', '❌ Never', '⚠️ Varies'],
                    ['Full EHR + tools platform', '✅', '⚠️ Partial'],
                    ['EU/UA market focus', '✅', '❌ US/CA primary'],
                  ].map(([feature, us, them]) => (
                    <tr key={feature}>
                      <td className="py-3 pr-4 text-slate-300">{feature}</td>
                      <td className="py-3 pr-4 text-emerald-300">{us}</td>
                      <td className="py-3 text-slate-400">{them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 to-slate-900 p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">Access AI supervision in beta</h2>
            <p className="text-slate-300 mb-6">
              AI supervision is part of the bravery.academy beta. First 30 private-practice users get
              <strong className="text-white"> 3 years of free platform access</strong>. AI features are billed separately.
            </p>
            <Link
              href="/#hero-block"
              className="inline-block px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl transition-colors"
            >
              Join the waitlist
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
