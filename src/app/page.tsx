// src/app/page.tsx
import Link from 'next/link';
import { ArrowRight, Building2, Users, TrendingUp, Shield } 
from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-7 h-7 text-slate-900" />
              <span className="text-xl font-semibold text-slate-900">Kosman</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/login"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Masuk
              </Link>
              <Link 
                href="/auth/register"
                className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Mulai Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-slate-900/5 rounded-full">
                <span className="text-sm font-medium text-slate-700">
                  Multi-Property Management System
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Kelola Kos-kosan
                <span className="block text-slate-600">Jadi Lebih Mudah</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Satu platform untuk mengelola semua properti kos Anda. Monitoring kamar, 
                tagihan otomatis, dan laporan keuangan dalam satu dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/register"
                  className="group px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Dashboard Overview</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-500 mb-1">Total Kamar</p>
                      <p className="text-2xl font-bold text-slate-900">48</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-500 mb-1">Terisi</p>
                      <p className="text-2xl font-bold text-slate-900">42</p>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-slate-300" />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-900 rounded-full opacity-5"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-900 rounded-full opacity-5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Fitur yang Memudahkan
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola kos-kosan modern
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Building2 className="w-6 h-6" />}
              title="Multi-Property"
              description="Kelola banyak properti kos dalam satu akun. Berpindah antar dashboard dengan mudah."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Manajemen Penghuni"
              description="Database lengkap penghuni dengan foto KTP dan tanggal jatuh tempo otomatis."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Laporan Keuangan"
              description="Visualisasi pendapatan dan okupansi real-time untuk setiap properti."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Siap untuk Mulai?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Bergabung dengan owner kos modern yang sudah menggunakan Kosman
              </p>
              <Link 
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Daftar Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p>© 2025 Kosman. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="group p-8 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg">
      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}