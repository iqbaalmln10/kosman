// src/components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  BedDouble, 
  Users, 
  Receipt, 
  TrendingUp, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard/kos',
    icon: LayoutDashboard,
  },
  {
    name: 'Properti',
    href: '/dashboard/kos/properties',
    icon: Building2,
  },
  {
    name: 'Kamar',
    href: '/dashboard/kos/rooms',
    icon: BedDouble,
  },
  {
    name: 'Penghuni',
    href: '/dashboard/kos/tenants',
    icon: Users,
  },
  {
    name: 'Transaksi',
    href: '/dashboard/kos/transactions',
    icon: Receipt,
  },
  {
    name: 'Laporan',
    href: '/dashboard/kos/reports',
    icon: TrendingUp,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`
      bg-white border-r border-slate-200 flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
        {!isCollapsed && (
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-75 transition-opacity group"
            title="Kembali ke Dashboard"
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">Kosman</span>
          </Link>
        )}
        {isCollapsed && (
          <Link 
            href="/dashboard"
            className="flex items-center justify-center hover:opacity-75 transition-opacity"
            title="Kembali ke Dashboard"
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 text-slate-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-slate-200">
        <Link
          href="/dashboard/kos/settings"
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
            text-slate-600 hover:bg-slate-50 hover:text-slate-900
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? 'Pengaturan' : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium text-sm">Pengaturan</span>
          )}
        </Link>
      </div>
    </aside>
  );
}