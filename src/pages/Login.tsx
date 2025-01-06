import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ForgotPasswordButton } from '../components/auth/ForgotPasswordButton';
import { Logo } from '../components/common/Logo';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Willkommen im Vilonda Portal
          </h1>
          <p className="text-gray-600">
            Melden Sie sich an, um auf die Plattform zuzugreifen
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full h-12 px-4 text-base rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full h-12 px-4 text-base rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-400 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
            >
              Anmelden
            </button>

            <ForgotPasswordButton />
          </form>
        </div>
      </div>
    </div>
  );
}
