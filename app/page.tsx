import { LanguageProvider } from '../components/LanguageCtx';
import { Hero } from '../components/Hero';

import { RoleProvider } from '../components/RoleContext';
import { RoleSelector } from '../components/RoleSelector';

import { UseCases } from '../components/UseCases';
import { AIPersonas } from '../components/AIPersonas';
import { ToolsCatalog } from '../components/ToolsCatalog';
import { ZeroKnowledgeSection } from '../components/ZeroKnowledgeSection';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { buildFaqSchema } from '../lib/faq';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promo.bravery.academy';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'bravery.academy',
  url: siteUrl,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bravery.academy',
  description:
    'Secure online platform for psychologists with structured tools, AI supervision, and Zero-Knowledge architecture.',
  foundingDate: '2024',
  areaServed: ['UA', 'EU', 'US'],
  knowsAbout: [
    'Zero-Knowledge encryption for therapy notes',
    'AI clinical supervision for psychologists',
    'HIPAA-compliant telehealth',
    'Privacy-first mental health practice management'
  ]
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'bravery.academy',
  url: siteUrl,
  inLanguage: ['uk', 'en']
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'bravery.academy',
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'Mental Health Practice Management',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Beta waitlist access — first 30 users get 3 years free'
  },
  url: siteUrl,
  description:
    'Platform for psychologists: secure video sessions, case tools, analytics, and AI supervision with privacy-first architecture.',
  featureList: [
    'Zero-Knowledge architecture for clinical notes',
    'AI supervision assistant (CBT-oriented)',
    'Secure HIPAA/GDPR-ready video sessions',
    'Structured therapy tools and assessment flows',
    'Client progress tracking and analytics',
    'Dedicated infrastructure option for clinics'
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Psychologists, Therapists, Mental Health Clinics, Student Practitioners'
  }
};

const schemas = [
  organizationSchema,
  websiteSchema,
  softwareSchema,
  buildFaqSchema('uk'),
  buildFaqSchema('en')
];

export default function LandingPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <LanguageProvider>
        <RoleProvider>
          <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
            <RoleSelector />
            <Hero />
            <UseCases />
            <AIPersonas />
            <ToolsCatalog />
            <ZeroKnowledgeSection />
            <FAQ />
            <Footer />
          </main>
        </RoleProvider>
      </LanguageProvider>
    </>
  );
}
