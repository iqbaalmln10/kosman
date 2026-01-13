// src/app/register/page.tsx
import Link from 'next/link';
import { Building2, ArrowLeft, Check } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Back to home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <div className="bg-slate-900 rounded-3xl p-10 h-full text-white">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-8 h-8" />
                  <span className="text-2xl font-semibold">Kosman</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Bergabung dengan Owner Modern
                </h2>
                <p className="text-slate-300">
                  Kelola semua properti kos Anda dalam satu platform yang powerful namun mudah digunakan.
                </p>
              </div>

              <div className="space-y-6">
                <BenefitItem text="Unlimited properti dan kamar" />
                <BenefitItem text="Tagihan otomatis setiap bulan" />
                <BenefitItem text="WhatsApp reminder terintegrasi" />
                <BenefitItem text="Laporan keuangan real-time" />
                <BenefitItem text="Dashboard analytics" />
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  "Sejak pakai Kosman, waktu saya untuk urusan tagihan berkurang 80%. Sekarang semua otomatis!"
                </p>
                <div className="mt-4">
                  <p className="font-medium">Pak Budi</p>
                  <p className="text-slate-400 text-sm">Owner 5 Kos di Jakarta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Buat Akun
              </h1>
              <p className="text-slate-600">
                Mulai kelola kos Anda dengan lebih mudah
              </p>
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                  placeholder="Nama lengkap Anda"
                />
              </div>

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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                  placeholder="08xxxxxxxxxx"
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
                  placeholder="Minimal 8 karakter"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                  placeholder="Masukkan password lagi"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  Saya setuju dengan{' '}
                  <Link href="/terms" className="text-slate-900 font-medium hover:underline">
                    Syarat & Ketentuan
                  </Link>
                  {' '}dan{' '}
                  <Link href="/privacy" className="text-slate-900 font-medium hover:underline">
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Daftar Sekarang
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">atau</span>
              </div>
            </div>

            {/* Google Sign Up */}
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
              <span className="text-slate-700">Daftar dengan Google</span>
            </button>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Sudah punya akun?{' '}
                <Link 
                  href="/login"
                  className="text-slate-900 font-medium hover:underline"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-slate-100">{text}</span>
    </div>
  );
}