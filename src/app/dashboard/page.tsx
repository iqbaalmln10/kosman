import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { syncUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) redirect("/auth/login");

  // JALANKAN SINKRONISASI
  const dbUser = await syncUser();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard Kosman</h1>
          <p className="text-sm text-slate-500">Selamat datang kembali, {dbUser?.lastName}</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Status Database */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl">
          <p className="text-slate-400 text-sm mb-1">Status Database</p>
          <h3 className="text-lg font-semibold">Tersinkronisasi</h3>
          <div className="mt-4 text-xs bg-white/10 p-2 rounded-lg truncate">
            Local ID: {dbUser?.id}
          </div>
        </div>
        
        {/* Placeholder untuk Properti */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-sm mb-1">Total Properti</p>
          <h3 className="text-2xl font-bold text-slate-900">0</h3>
        </div>
      </div>
    </div>
  );
}