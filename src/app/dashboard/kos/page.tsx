// src/app/dashboard/kos/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
  BedDouble, 
  Users, 
  TrendingUp, 
  Calendar,
  Plus,
  AlertCircle
} from 'lucide-react';
import CreatePropertyModal from "@/components/dashboard/CreatePropertyModal";

async function getDashboardData(userId: string) {
  // Get user's properties with room and tenant data
  const properties = await prisma.properties.findMany({
    where: { userId },
    include: {
      rooms: {
        include: {
          tenants: true,
        },
      },
    },
  });

  // Calculate statistics
  const totalProperties = properties.length;
  const totalRooms = properties.reduce((sum, prop) => sum + prop.rooms.length, 0);
  const occupiedRooms = properties.reduce(
    (sum, prop) => sum + prop.rooms.filter(room => room.status === 'OCCUPIED').length,
    0
  );

  // Get recent transactions (last 10)
  const recentTransactions = await prisma.transactions.findMany({
    where: {
      tenants: {
        rooms: {
          properties: {
            userId,
          },
        },
      },
    },
    include: {
      tenants: {
        include: {
          rooms: {
            include: {
              properties: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  // Calculate financial data
  const thisMonth = new Date();
  const startOfMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
  
  const monthlyRevenue = await prisma.transactions.aggregate({
    where: {
      status: 'PAID',
      paidAt: {
        gte: startOfMonth,
      },
      tenants: {
        rooms: {
          properties: {
            userId,
          },
        },
      },
    },
    _sum: {
      amount: true,
    },
  });

  const totalRevenue = await prisma.transactions.aggregate({
    where: {
      status: 'PAID',
      tenants: {
        rooms: {
          properties: {
            userId,
          },
        },
      },
    },
    _sum: {
      amount: true,
    },
  });

  const overduePayments = await prisma.transactions.aggregate({
    where: {
      status: 'OVERDUE',
      tenants: {
        rooms: {
          properties: {
            userId,
          },
        },
      },
    },
    _sum: {
      amount: true,
    },
  });

  return {
    properties,
    stats: {
      totalProperties,
      totalRooms,
      occupiedRooms,
      occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
    },
    financial: {
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      totalRevenue: totalRevenue._sum.amount || 0,
      overdueAmount: overduePayments._sum.amount || 0,
    },
    recentTransactions,
  };
}

export default async function KosDashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Sync user first
  const dbUser = await prisma.users.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser) {
    // User belum tersinkronisasi, redirect ke halaman onboarding
    redirect("/onboarding");
  }

  const dashboardData = await getDashboardData(dbUser.id);

  // If no properties, show empty state
  if (dashboardData.stats.totalProperties === 0) {
    return <EmptyDashboard />;
  }

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Total Kamar */}
        <StatCard
          icon={BedDouble}
          label="Total Kamar"
          value={dashboardData.stats.totalRooms}
          iconBg="bg-slate-100"
          iconColor="text-slate-700"
        />

        {/* Terisi */}
        <StatCard
          icon={Users}
          label="Terisi"
          value={dashboardData.stats.occupiedRooms}
          badge={`${dashboardData.stats.occupancyRate}%`}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          badgeColor="text-green-600"
        />

        {/* Pendapatan Bulan Ini */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-blue-600 font-medium">Bulan Ini</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">
            Rp {(dashboardData.financial.monthlyRevenue / 1000000).toFixed(1)}jt
          </h3>
          <p className="text-sm text-slate-500">Pendapatan bulan ini</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Transaksi Terbaru</h2>
          </div>

          <div className="space-y-4">
            {dashboardData.recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                Belum ada transaksi
              </div>
            ) : (
              dashboardData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    transaction.status === 'PAID' ? 'bg-green-50' :
                    transaction.status === 'OVERDUE' ? 'bg-red-50' :
                    'bg-yellow-50'
                  }`}>
                    <Calendar className={`w-5 h-5 ${
                      transaction.status === 'PAID' ? 'text-green-600' :
                      transaction.status === 'OVERDUE' ? 'text-red-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{transaction.tenants.fullName}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {transaction.tenants.rooms.properties.name} - Kamar {transaction.tenants.rooms.roomNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      Rp {(transaction.amount / 1000).toFixed(0)}k
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      transaction.status === 'PAID' ? 'text-green-600' :
                      transaction.status === 'OVERDUE' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {transaction.status === 'PAID' ? 'Lunas' :
                       transaction.status === 'OVERDUE' ? 'Terlambat' :
                       'Pending'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-6">Ringkasan Keuangan</h2>

          <div className="space-y-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Pendapatan</p>
              <h3 className="text-2xl font-bold">
                Rp {(dashboardData.financial.totalRevenue / 1000000).toFixed(1)}jt
              </h3>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm">Bulan Ini</span>
                <span className="text-white font-medium">
                  Rp {(dashboardData.financial.monthlyRevenue / 1000000).toFixed(1)}jt
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm">Tertunggak</span>
                <span className="text-red-400 font-medium">
                  Rp {(dashboardData.financial.overdueAmount / 1000000).toFixed(1)}jt
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Kamar Kosong</span>
                <span className="text-yellow-400 font-medium">
                  {dashboardData.stats.totalRooms - dashboardData.stats.occupiedRooms} kamar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionButton icon={Plus} label="Tambah Penghuni" href="/dashboard/kos/tenants/new" />
        <QuickActionButton icon={Calendar} label="Buat Tagihan" href="/dashboard/kos/transactions/new" />
        <QuickActionButton icon={BedDouble} label="Kelola Kamar" href="/dashboard/kos/rooms" />
        <QuickActionButton icon={TrendingUp} label="Laporan" href="/dashboard/kos/reports" />
      </div>
    </>
  );
}

// Helper Components
function StatCard({ icon: Icon, label, value, badge, iconBg, iconColor, badgeColor }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {badge && (
          <span className={`text-xs ${badgeColor} font-medium`}>{badge}</span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, href }: any) {
  return (
    <a
      href={href}
      className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-slate-600 mb-2" />
      <p className="text-sm font-medium text-slate-900">{label}</p>
    </a>
  );
}

function EmptyDashboard() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Belum Ada Properti
        </h2>
        <p className="text-slate-600 mb-8">
          Mulai dengan menambahkan properti kos pertama Anda untuk mulai mengelola bisnis kos-kosan.
        </p>
        <CreatePropertyModal />
      </div>
    </div>
  );
}