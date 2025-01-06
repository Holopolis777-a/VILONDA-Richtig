import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuthStore } from '../../../store/authStore';

function MemberDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('Willkommen')}, {user?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('Schnellzugriff')}</h2>
          <div className="space-y-4">
            <a
              href="/member/vehicles"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium">{t('Fahrzeuge durchsuchen')}</h3>
              <p className="text-sm text-gray-500">
                {t('Finden Sie Ihr Wunschfahrzeug')}
              </p>
            </a>
            <a
              href="/member/requests"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium">{t('Meine Anfragen')}</h3>
              <p className="text-sm text-gray-500">
                {t('Verfolgen Sie den Status Ihrer Fahrzeuganfragen')}
              </p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t('Support')}</h2>
          <div className="space-y-4">
            <a
              href="/member/tickets"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium">{t('Support-Tickets')}</h3>
              <p className="text-sm text-gray-500">
                {t('Erhalten Sie Hilfe bei Fragen')}
              </p>
            </a>
            <a
              href="/member/faq"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium">{t('FAQ')}</h3>
              <p className="text-sm text-gray-500">
                {t('Häufig gestellte Fragen und Antworten')}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
