import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Умови використання / Terms of Use'
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Умови використання / Terms of Use
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Призначення сервісу / Service purpose</h2>
            <p>
              bravery.academy надає інформаційно-технологічну платформу для психологів, клінік та освітніх/корпоративних сценаріїв.
              bravery.academy provides an information-technology platform for psychologists, clinics, and educational/corporate scenarios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Beta-статус / Beta status</h2>
            <p>
              Сервіс може працювати у beta-режимі. Функціональність, UX та інтеграції можуть змінюватися без попереднього анонсу.
              The service may operate in beta mode. Features, UX, and integrations may evolve without prior announcement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Відповідальність / Responsibility</h2>
            <p>
              Платформа не замінює професійне клінічне рішення спеціаліста. Користувач несе відповідальність за застосування рекомендацій у своїй практиці.
              The platform does not replace professional clinical judgment. Users are responsible for applying recommendations in practice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Контакти / Contact</h2>
            <p>
              Питання щодо умов використання: <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hello@bravery.academy">hello@bravery.academy</a>.
            </p>
          </section>
        </div>

        <Link href="/" className="inline-block mt-10 text-emerald-300 hover:text-emerald-200">
          ← Повернутися на головну / Back to home
        </Link>
      </div>
    </main>
  );
}
