import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'bravery.academy vs Upheal — Platform Comparison',
  description:
    'bravery.academy vs Upheal: both privacy-first, both AI-powered — but different in scope. bravery.academy is a full platform with Zero-Knowledge architecture and AI supervision; Upheal is an AI overlay that requires a separate EHR.',
  keywords: [
    'bravery.academy vs Upheal',
    'Upheal alternative',
    'Upheal vs zero knowledge',
    'Upheal AI supervision comparison',
    'Upheal alternative Europe',
    'mental health AI platform comparison',
    'therapy platform zero knowledge',
    'Upheal competitor',
  ],
  alternates: {
    canonical: '/compare/vs-upheal',
  },
  openGraph: {
    title: 'bravery.academy vs Upheal',
    description:
      'Both prioritize therapist privacy. Key difference: bravery.academy is a full integrated platform with Zero-Knowledge architecture; Upheal is an AI overlay that sits on top of your existing EHR.',
    url: '/compare/vs-upheal',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promo.bravery.academy';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'bravery.academy vs Upheal Comparison',
  description: 'Detailed comparison of bravery.academy and Upheal therapy platforms.',
  url: `${siteUrl}/compare/vs-upheal`,
};

type Row = [string, string, string];

const rows: Row[] = [
  ['Product type', '✅ Full integrated platform', '⚠️ AI overlay (needs separate EHR)'],
  ['Zero-Knowledge architecture', '✅ Client-side encryption', '⚠️ Pseudonymized storage (not ZK)'],
  ['Sessions train AI model', '❌ Never', '❌ Never (stated policy)'],
  ['AI supervision workflow (CBT)', '✅ Supervisory process', '❌ Note-taking only'],
  ['HIPAA compliance', '✅ HIPAA-ready', '✅ HIPAA + BAA'],
  ['GDPR compliance', '✅ Privacy-by-design', '✅ GDPR + UK DPA'],
  ['SOC 2 certification', '⚠️ In progress', '✅ Certified'],
  ['EU / UA market focus', '✅ Primary', '⚠️ Secondary (US/CA primary)'],
  ['Requires separate EHR', '❌ All-in-one', '✅ Yes — Upheal is an overlay'],
  ['Pricing entry', '✅ Free beta', 'Free tier available'],
  ['Dedicated infrastructure', '✅ For clinics', '❌ Shared cloud'],
];

export default function VsUphealPage() {
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
            <Link href="/compare/vs-upheal" className="hover:text-white transition-colors">Compare</Link>
            <span className="mx-2">/</span>
            <span>vs Upheal</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            bravery.academy vs Upheal
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl">
            Both platforms are built by people who take therapist privacy seriously.
            The core difference: Upheal is an AI documentation overlay for your existing EHR.
            bravery.academy is an integrated platform with Zero-Knowledge encryption and AI supervision built in.
          </p>

          <section className="mb-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 pr-4 text-slate-400 font-medium w-1/2">Feature</th>
                  <th className="text-left py-3 pr-4 text-emerald-400 font-medium w-1/4">bravery.academy</th>
                  <th className="text-left py-3 text-slate-400 font-medium w-1/4">Upheal</th>
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
            <h2 className="text-2xl font-semibold text-white mb-4">The key architectural difference</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Upheal is a powerful AI scribe that sits <em>on top of</em> your existing EHR. It transcribes sessions,
              generates progress notes, and produces treatment plans. It integrates with SimplePractice, TherapyNotes,
              and others via copy-paste or light integration. You still need and pay for an EHR separately.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              bravery.academy is an <strong className="text-white">integrated platform</strong>: secure video sessions,
              clinical notes, tools, AI supervision, and analytics in one place — with Zero-Knowledge encryption at the core.
              You don&apos;t need a separate EHR.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Upheal&apos;s privacy model uses pseudonymization and SOC 2 certification — strong, but not Zero-Knowledge.
              Upheal engineers can technically access session data under certain support conditions (they disclose this
              in their privacy documentation). bravery.academy&apos;s client-side encryption prevents this entirely.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">When Upheal is the better fit</h2>
            <ul className="space-y-2 text-slate-300">
              {[
                'You already have an EHR you love and just want AI note generation added to it.',
                'You need SOC 2 certification now (bravery.academy is pursuing this during beta).',
                'You want battle-tested AI transcription with a large user base.',
                'You practice in US or Canada and want HIPAA/PHIPA compliance already verified.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-slate-500 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">When bravery.academy is the better fit</h2>
            <ul className="space-y-2 text-slate-300">
              {[
                'You want one integrated platform — not an EHR + a separate AI overlay.',
                'You need the strongest possible technical privacy guarantee (Zero-Knowledge, not pseudonymization).',
                'You want AI supervision (reflective clinical process) — Upheal does not offer this.',
                'You practice in Europe or Ukraine and need privacy-by-design architecture from the ground up.',
                'You are starting fresh and don\'t want to pay for two separate tools.',
                'Your clinic needs dedicated isolated infrastructure.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Privacy comparison: Zero-Knowledge vs. Pseudonymization</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-semibold text-emerald-300 mb-3">Zero-Knowledge (bravery.academy)</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Notes encrypted in your browser with your key. Server receives ciphertext.
                  No employee — technical or otherwise — can read your session content.
                  Not a policy. A mathematical guarantee.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-slate-700 bg-slate-800/30">
                <h3 className="font-semibold text-slate-300 mb-3">Pseudonymization (Upheal)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Personal identifiers replaced with pseudonyms. Data is not directly identifiable.
                  HIPAA-trained engineers may access PHI when required to resolve support issues.
                  Strong security, but not mathematically unreadable by the platform.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8 mb-12">
            <h2 className="text-xl font-semibold text-white mb-2">Join bravery.academy beta</h2>
            <p className="text-slate-300 mb-4 text-sm">
              One platform. Zero-Knowledge encryption. AI supervision. Free for first 30 private practitioners (3 years).
            </p>
            <Link
              href="/#hero-block"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-colors"
            >
              Join the waitlist
            </Link>
          </section>

          <div className="text-sm text-slate-600 mb-8">
            <p>Upheal feature and compliance information sourced from upheal.io/privacy-and-compliance (February 2026). Accuracy subject to change.</p>
          </div>

          <footer className="text-sm text-slate-500 pt-6 border-t border-slate-800 flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">← bravery.academy home</Link>
            <Link href="/compare/vs-simplepractice" className="hover:text-white transition-colors">vs SimplePractice →</Link>
          </footer>

        </div>
      </main>
    </>
  );
}
