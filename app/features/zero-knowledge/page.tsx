import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zero-Knowledge Architecture for Therapy Notes',
  description:
    'bravery.academy uses Zero-Knowledge encryption so the platform cannot read your clinical notes. Your session data is encrypted client-side before it ever reaches our servers — unlike SimplePractice, TherapyNotes, or any standard EHR.',
  keywords: [
    'zero knowledge therapy notes',
    'zero knowledge encryption therapy',
    'private therapy notes platform',
    'encrypted clinical notes',
    'HIPAA zero knowledge',
    'privacy-first EHR',
    'secure therapy notes',
    'client-side encrypted therapy platform',
  ],
  alternates: {
    canonical: '/features/zero-knowledge',
  },
  openGraph: {
    title: 'Zero-Knowledge Architecture — bravery.academy',
    description:
      'Clinical notes encrypted client-side. The platform never reads your session data. The only therapy platform with true Zero-Knowledge architecture.',
    url: '/features/zero-knowledge',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promo.bravery.academy';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Zero-Knowledge Architecture for Therapy Notes',
  description:
    'How bravery.academy implements Zero-Knowledge encryption so therapist clinical notes are never readable by the platform.',
  url: `${siteUrl}/features/zero-knowledge`,
  author: {
    '@type': 'Organization',
    name: 'bravery.academy',
    url: siteUrl,
  },
  about: {
    '@type': 'SoftwareApplication',
    name: 'bravery.academy',
    applicationCategory: 'HealthApplication',
  },
};

export default function ZeroKnowledgePage() {
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
            <span>Zero-Knowledge</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Zero-Knowledge Architecture<br />
            <span className="text-emerald-400">for Therapy Notes</span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
            bravery.academy is built so the platform itself <strong className="text-white">cannot read</strong> your clinical notes or session content.
            Data is encrypted in your browser before it ever reaches our servers.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">What is Zero-Knowledge encryption for therapists?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              In a standard EHR or practice management platform — including SimplePractice, TherapyNotes, and TheraNest — your clinical notes are
              stored on the provider&apos;s servers in a form the company can technically access. Their &quot;HIPAA compliance&quot; is a policy
              promise, not a technical barrier.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Zero-Knowledge is different. Your notes are encrypted <em>before</em> they leave your device, using a key only you hold.
              The server stores only encrypted ciphertext. Even the developers of bravery.academy cannot read your notes.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This is the same cryptographic principle used by end-to-end encrypted messaging apps — applied to your therapy practice.
            </p>
          </section>

          <section className="mb-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">bravery.academy</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✅ Notes encrypted client-side before storage</li>
                <li>✅ Server stores only ciphertext</li>
                <li>✅ Zero access to note content by platform</li>
                <li>✅ AI features use anonymized/structured context only</li>
                <li>✅ Dedicated infrastructure option for clinics</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
              <h3 className="text-lg font-semibold text-slate-400 mb-3">Standard EHR Platforms</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>❌ Notes stored in readable form on provider servers</li>
                <li>❌ Company staff can technically access data</li>
                <li>❌ Privacy is a policy, not a technical guarantee</li>
                <li>❌ AI trained on session content (some providers)</li>
                <li>❌ Shared infrastructure by default</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Why does this matter for psychologists?</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Client trust and therapeutic alliance</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  When clients know their most sensitive disclosures are mathematically protected — not just policy-protected — it changes the
                  therapeutic relationship. Clients can be more open.
                </p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4">
                <h3 className="font-semibold text-white mb-1">GDPR and data minimization</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  European data protection law requires collecting only what&apos;s necessary. Zero-Knowledge architecture is the most direct
                  implementation of data minimization: the platform collects nothing it cannot even read.
                </p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Protection from breaches</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  If our servers were ever compromised, attackers would find only encrypted data. Without your key, the data is useless.
                  No other major therapy platform offers this guarantee.
                </p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Ethical responsibility</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  As a psychologist, you hold the most sensitive information about another person. Zero-Knowledge is how you honor that responsibility
                  at a technical level, not just an ethical one.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">How it works in practice</h2>
            <ol className="space-y-4 text-slate-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-semibold text-sm">1</span>
                <p><strong className="text-white">You write a session note</strong> in the bravery.academy interface on your device.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-semibold text-sm">2</span>
                <p><strong className="text-white">Your browser encrypts the note</strong> using your personal key before sending anything to the server.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-semibold text-sm">3</span>
                <p><strong className="text-white">The server stores ciphertext</strong> — a string of characters that is meaningless without your key.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-semibold text-sm">4</span>
                <p><strong className="text-white">Decryption happens on your device</strong> when you open the note. No one else can read it.</p>
              </li>
            </ol>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">Join the beta program</h2>
            <p className="text-slate-300 mb-6">
              bravery.academy is currently in beta. The first 30 private-practice users get <strong className="text-white">3 years of free platform access</strong>.
            </p>
            <Link
              href="/#hero-block"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-colors"
            >
              Request beta access
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
