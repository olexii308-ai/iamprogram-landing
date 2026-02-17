import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'bravery.academy vs SimplePractice — Key Differences',
  description:
    'How bravery.academy compares to SimplePractice: Zero-Knowledge encryption vs. standard server storage, EU/UA market focus vs. US-centric, AI supervision workflow vs. AI note-taking only. Compare features, privacy, and pricing.',
  keywords: [
    'bravery.academy vs SimplePractice',
    'SimplePractice alternative',
    'SimplePractice alternative GDPR',
    'SimplePractice alternative Europe',
    'SimplePractice zero knowledge',
    'SimplePractice privacy',
    'therapy platform EU alternative SimplePractice',
    'mental health EHR comparison',
  ],
  alternates: {
    canonical: '/compare/vs-simplepractice',
  },
  openGraph: {
    title: 'bravery.academy vs SimplePractice',
    description:
      'Zero-Knowledge architecture, EU/UA market focus, and AI supervision — vs. the largest EHR for therapists. Here\'s what actually differs.',
    url: '/compare/vs-simplepractice',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bravery.academy';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'bravery.academy vs SimplePractice Comparison',
  description: 'Detailed comparison of bravery.academy and SimplePractice therapy platforms.',
  url: `${siteUrl}/compare/vs-simplepractice`,
};

type Row = [string, string, string];

const rows: Row[] = [
  ['Zero-Knowledge encryption for notes', '✅ Client-side encryption', '❌ Standard server storage'],
  ['Platform can read your notes', '❌ Never (technically impossible)', '⚠️ Yes (policy-restricted)'],
  ['AI supervision workflow', '✅ CBT-oriented supervision', '❌ Note-taking only'],
  ['Sessions train AI model', '❌ Never', '⚠️ Varies by feature'],
  ['GDPR-ready architecture', '✅ Privacy-by-design', '⚠️ US-primary, GDPR add-on'],
  ['EU / Ukraine market focus', '✅ Primary market', '❌ US-centric'],
  ['Insurance billing (US CPT)', '❌ Not a focus', '✅ Core feature'],
  ['Established user base', '⚠️ Beta (2024–)', '✅ 250,000+ practitioners'],
  ['Pricing entry point', '✅ Free beta', '$49/month (Starter)'],
  ['Dedicated infrastructure option', '✅ For clinics/enterprises', '❌ Shared infrastructure'],
];

export default function VsSimplePracticePage() {
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
            <Link href="/compare/vs-simplepractice" className="hover:text-white transition-colors">Compare</Link>
            <span className="mx-2">/</span>
            <span>vs SimplePractice</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            bravery.academy vs SimplePractice
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl">
            SimplePractice is the largest EHR for therapists in the US. bravery.academy is a privacy-first alternative
            for practitioners who need Zero-Knowledge encryption and AI supervision — not insurance billing at scale.
          </p>

          <section className="mb-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 pr-4 text-slate-400 font-medium w-1/2">Feature</th>
                  <th className="text-left py-3 pr-4 text-emerald-400 font-medium w-1/4">bravery.academy</th>
                  <th className="text-left py-3 text-slate-400 font-medium w-1/4">SimplePractice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map(([feature, us, them]) => (
                  <tr key={feature}>
                    <td className="py-3 pr-4 text-slate-300">{feature}</td>
                    <td className="py-3 pr-4 text-emerald-300">{us}</td>
                    <td className="py-3 text-slate-400">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">When SimplePractice is the right choice</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              SimplePractice is excellent for US-based therapists who need full insurance billing, CPT code workflows,
              ERA auto-posting, and a large practitioner marketplace (therapyfinder.com). With 250,000+ users and
              a mature product, it&apos;s the industry standard for US private practice management.
            </p>
            <p className="text-slate-300 leading-relaxed">
              If insurance billing is your primary workflow pain, SimplePractice solves it well at $49–$99/month.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">When bravery.academy is the right choice</h2>
            <ul className="space-y-3 text-slate-300">
              {[
                'You practice in Europe or Ukraine and need GDPR-ready architecture — not a compliance checkbox.',
                'You operate self-pay and don\'t need US insurance billing infrastructure.',
                'Client data privacy is a technical requirement, not just a policy preference.',
                'You want AI supervision (reflective clinical process) — not just AI note-taking.',
                'You need dedicated infrastructure for a clinic or enterprise deployment.',
                'You are sensitive to the fact that SimplePractice can technically access your clinical notes.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">The core privacy difference</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              SimplePractice&apos;s privacy model is compliance-based: they promise not to read your notes and follow HIPAA rules.
              That is a policy guarantee.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              bravery.academy&apos;s Zero-Knowledge architecture is a <strong className="text-white">technical guarantee</strong>:
              notes are encrypted in your browser using your key before they reach our servers. We physically
              cannot read them — not because we promise not to, but because the ciphertext is meaningless without your key.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This distinction matters if you work with clients whose disclosures carry significant risk (trauma survivors,
              high-profile clients, clients in sensitive professions), or if you operate in jurisdictions with strict
              data sovereignty requirements.
            </p>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8 mb-12">
            <h2 className="text-xl font-semibold text-white mb-2">Try bravery.academy during beta</h2>
            <p className="text-slate-300 mb-4 text-sm">
              No subscription required during beta. First 30 private practitioners: 3 years free.
            </p>
            <Link
              href="/#hero-block"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-colors"
            >
              Join the waitlist
            </Link>
          </section>

          <div className="text-sm text-slate-600 mb-8">
            <p>SimplePractice pricing and feature information sourced from simplepractice.com (February 2026). Accuracy subject to change.</p>
          </div>

          <footer className="text-sm text-slate-500 pt-6 border-t border-slate-800 flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">← bravery.academy home</Link>
            <Link href="/compare/vs-upheal" className="hover:text-white transition-colors">vs Upheal →</Link>
          </footer>

        </div>
      </main>
    </>
  );
}
