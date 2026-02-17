'use client';

import { LanguageProvider } from '../components/LanguageCtx';
import { Hero } from '../components/Hero';

import { RoleProvider } from '../components/RoleContext';
import { RoleSelector } from '../components/RoleSelector';

import { UseCases } from '../components/UseCases';
import { AIPersonas } from '../components/AIPersonas';
import { ToolsCatalog } from '../components/ToolsCatalog';
import { ZeroKnowledgeSection } from '../components/ZeroKnowledgeSection';
import { Footer } from '../components/Footer';

export default function LandingPage() {
  return (
    <LanguageProvider>
      <RoleProvider>
        <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
          <RoleSelector />
          <Hero />
          <UseCases />
          <AIPersonas />
          <ToolsCatalog />
          <ZeroKnowledgeSection />
          <Footer />
        </main>
      </RoleProvider>
    </LanguageProvider>
  );
}
