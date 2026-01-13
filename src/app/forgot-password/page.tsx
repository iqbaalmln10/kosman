// src/app/forgot-password/page.tsx
import Link from 'next/link';
import { Building2, ArrowLeft, Mail } 
from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Login
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-slate-900" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Lupa Password?
            </h1>
            <p className="text-slate-600">
              Tidak masalah! Masukkan email Anda dan kami akan kirimkan link untuk reset password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Kirim Link Reset
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-medium text-slate-900">Catatan:</span> Link reset password akan dikirim ke email Anda dan berlaku selama 1 jam.
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Ingat password Anda?{' '}
              <Link 
                href="/login"
                className="text-slate-900 font-medium hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Butuh bantuan?{' '}
            <a href="mailto:support@kosman.com" className="text-slate-900 font-medium hover:underline">
              Hubungi Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}