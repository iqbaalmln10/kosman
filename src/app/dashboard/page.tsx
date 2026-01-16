"use client";

import React, { useState } from 'react';
import { Building2, BedDouble, Users, TrendingUp, Calendar, Bell, Settings, Plus, ChevronDown } from 'lucide-react';
import { NavbarProfile } from '@/components/NavbarProfile';

// Dummy data untuk preview
const properties = [
  { id: '1', name: 'Kos Melati', totalRooms: 12, occupiedRooms: 10 },
  { id: '2', name: 'Kos Mawar', totalRooms: 8, occupiedRooms: 7 },
  { id: '3', name: 'Kos Kenanga', totalRooms: 15, occupiedRooms: 12 },
];

const recentActivities = [
  { type: 'payment', tenant: 'Ahmad Rizki', room: 'A-01', property: 'Kos Melati', time: '2 jam lalu' },
  { type: 'checkout', tenant: 'Siti Nurhaliza', room: 'B-03', property: 'Kos Mawar', time: '5 jam lalu' },
  { type: 'checkin', tenant: 'Budi Santoso', room: 'C-12', property: 'Kos Kenanga', time: '1 hari lalu' },
];

export default function KosmanDashboard() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalRevenue = 45600000;
  const thisMonthRevenue = 12500000;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header dengan Property Switcher */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Kosman</span>
            </div>

            {/* Property Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Building2 className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-900">{selectedProperty.name}</span>
                <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  {properties.map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => {
                        setSelectedProperty(prop);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors ${
                        selectedProperty.id === prop.id ? 'bg-slate-50' : ''
                      }`}
                    >
                      <div className="font-medium text-slate-900">{prop.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {prop.occupiedRooms}/{prop.totalRooms} kamar terisi
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                    <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      <Plus className="w-4 h-4" />
                      Tambah Properti
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
              <NavbarProfile />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Kamar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <BedDouble className="w-5 h-5 text-slate-700" />
              </div>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedProperty.totalRooms}</h3>
            <p className="text-sm text-slate-500">Kamar</p>
          </div>

          {/* Terisi */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-green-600 font-medium">
                {Math.round((selectedProperty.occupiedRooms / selectedProperty.totalRooms) * 100)}%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{selectedProperty.occupiedRooms}</h3>
            <p className="text-sm text-slate-500">Terisi</p>
          </div>

          {/* Pendapatan Bulan Ini */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 md:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 font-medium">+12%</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">
              Rp {(thisMonthRevenue / 1000000).toFixed(1)}jt
            </h3>
            <p className="text-sm text-slate-500">Pendapatan bulan ini</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Aktivitas Terbaru */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Aktivitas Terbaru</h2>
              <button className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'payment' ? 'bg-green-50' :
                    activity.type === 'checkout' ? 'bg-red-50' :
                    'bg-blue-50'
                  }`}>
                    {activity.type === 'payment' && <Calendar className="w-5 h-5 text-green-600" />}
                    {activity.type === 'checkout' && <Users className="w-5 h-5 text-red-600" />}
                    {activity.type === 'checkin' && <Users className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{activity.tenant}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {activity.type === 'payment' && `Bayar sewa - ${activity.room}`}
                      {activity.type === 'checkout' && `Keluar dari ${activity.room}`}
                      {activity.type === 'checkin' && `Masuk ke ${activity.room}`}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan Keuangan */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-6">Ringkasan Keuangan</h2>

            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-2">Total Pendapatan</p>
                <h3 className="text-2xl font-bold">
                  Rp {(totalRevenue / 1000000).toFixed(1)}jt
                </h3>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 text-sm">Bulan Ini</span>
                  <span className="text-white font-medium">
                    Rp {(thisMonthRevenue / 1000000).toFixed(1)}jt
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 text-sm">Tertunggak</span>
                  <span className="text-red-400 font-medium">Rp 2.5jt</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Kamar Kosong</span>
                  <span className="text-yellow-400 font-medium">
                    {selectedProperty.totalRooms - selectedProperty.occupiedRooms} kamar
                  </span>
                </div>
              </div>

              <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-100 transition-colors mt-6">
                Lihat Detail
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors text-left">
            <Plus className="w-5 h-5 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-900">Tambah Penghuni</p>
          </button>
          <button className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors text-left">
            <Calendar className="w-5 h-5 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-900">Buat Tagihan</p>
          </button>
          <button className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors text-left">
            <BedDouble className="w-5 h-5 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-900">Kelola Kamar</p>
          </button>
          <button className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors text-left">
            <TrendingUp className="w-5 h-5 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-900">Laporan</p>
          </button>
        </div>
      </main>
    </div>
  );
}