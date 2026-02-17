import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Політика конфіденційності / Privacy Policy'
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Політика конфіденційності / Privacy Policy
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Які дані збираються / Data we collect</h2>
            <p>
              Для запису в beta-лист очікування ми обробляємо email, роль користувача, мову інтерфейсу та джерело заявки.
              For beta waitlist signup, we process email, user role, interface language, and signup source.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Мета обробки / Purpose</h2>
            <p>
              Дані використовуються для комунікації щодо beta-доступу, пілотів та продуктового оновлення.
              Data is used to communicate about beta access, pilots, and product updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Безпека / Security</h2>
            <p>
              Передача заявок виконується через захищений SMTP-канал. Доступ до даних обмежується відповідальними особами команди.
              Submissions are delivered over secure SMTP transport. Access is limited to authorized team members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Контакт / Contact</h2>
            <p>
              Для запитів щодо персональних даних: <a className="text-emerald-300 hover:text-emerald-200" href="mailto:hello@bravery.academy">hello@bravery.academy</a>.
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
