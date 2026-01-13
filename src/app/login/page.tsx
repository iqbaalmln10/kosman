// src/app/login/page.tsx
import Link from 'next/link';
import { Building2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-600">
              Masuk ke dashboard Kosman Anda
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Masuk
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">atau</span>
            </div>
          </div>

          {/* Social Login - Optional */}
          <button
            type="button"
            className="w-full py-3.5 border-2 border-slate-200 rounded-xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-slate-700">Masuk dengan Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Belum punya akun?{' '}
              <Link 
                href="/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Dilindungi oleh enkripsi end-to-end
          </p>
        </div>
      </div>
    </div>
  );
}