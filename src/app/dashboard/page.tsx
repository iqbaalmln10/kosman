import React from 'react';
import { Building2, Coffee, Shirt, Package, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

const apps = [
  {
    id: 'kos',
    name: 'Manajemen Kos',
    description: 'Kelola properti kos, penghuni, dan tagihan',
    icon: Building2,
    color: 'slate',
    available: true,
    href: '/dashboard/kos/'
  },
  {
    id: 'fnb',
    name: 'F&B Management',
    description: 'Kelola restoran, menu, dan pesanan',
    icon: Coffee,
    color: 'orange',
    available: false,
    comingSoon: true
  },
  {
    id: 'laundry',
    name: 'Laundry Service',
    description: 'Kelola layanan laundry dan tracking',
    icon: Shirt,
    color: 'blue',
    available: false,
    comingSoon: true
  },
  {
    id: 'inventory',
    name: 'Inventory',
    description: 'Manajemen stok dan gudang',
    icon: Package,
    color: 'green',
    available: false,
    comingSoon: true
  }
];

export default function AppSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Kosman</span>
            </div>
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-700">Selamat Datang di Kosman</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Pilih Aplikasi
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Platform all-in-one untuk berbagai kebutuhan bisnis Anda
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {apps.map((app) => {
            const Icon = app.icon;
            const isAvailable = app.available;
            
            const appContent = (
              <>
                {/* Coming Soon Badge */}
                {app.comingSoon && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-slate-100 rounded-full">
                    <span className="text-xs font-medium text-slate-600">Soon</span>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-6
                  ${isAvailable ? 'bg-slate-900 group-hover:scale-110' : 'bg-slate-200'}
                  transition-transform
                `}>
                  <Icon className={`w-6 h-6 ${isAvailable ? 'text-white' : 'text-slate-400'}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {app.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 min-h-[40px]">
                  {app.description}
                </p>

                {/* Arrow */}
                {isAvailable && (
                  <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                    <span className="text-sm font-medium">Buka</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </>
            );

            if (!isAvailable) {
              return (
                <div
                  key={app.id}
                  className={`
                    relative group text-left p-8 bg-white rounded-2xl border-2 transition-all
                    border-slate-100 opacity-60 cursor-not-allowed
                  `}
                >
                  {appContent}
                </div>
              );
            }

            return (
              <Link
                key={app.id}
                href={app.href}
                className={`
                  relative group text-left p-8 bg-white rounded-2xl border-2 transition-all
                  border-slate-200 hover:border-slate-900 hover:shadow-lg cursor-pointer
                `}
              >
                {appContent}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}