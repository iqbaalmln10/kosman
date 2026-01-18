import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Building2,
  MapPin,
  BedDouble,
  Users,
  MoreVertical,
  ExternalLink,
  Search,
} from "lucide-react";
import CreatePropertyModal from "@/components/dashboard/CreatePropertyModal";
import PropertyAction  from "@/components/dashboard/PropertyAction";

async function getProperties(userId: string) {
  return await prisma.properties.findMany({
    where: { users: { clerkId: userId } },
    include: {
      _count: {
        select: { rooms: true },
      },
      rooms: {
        select: { status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function PropertiesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const properties = await getProperties(userId);

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Semua Properti
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola dan pantau seluruh aset kos Anda
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              placeholder="Cari properti..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-slate-100 transition-all text-sm w-full md:w-64"
            />
          </div>
          <CreatePropertyModal />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => {
          const occupiedRooms = prop.rooms.filter(
            (r) => r.status === "OCCUPIED",
          ).length;
          const totalRooms = prop._count.rooms;
          const occupancyRate =
            totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

          return (
            <div
              key={prop.id}
              className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Card Header (Image Placeholder) */}
              <div className="h-32 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  {prop.city || "Kota Tidak Set"}
                </div>
                <Building2 className="absolute bottom-[-10px] left-4 w-16 h-16 text-white/20" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <p className="text-xs truncate max-w-[200px]">
                        {prop.address}
                      </p>
                    </div>
                  </div>
                    <PropertyAction propertyId={prop.id} propertyName={prop.name} />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BedDouble className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                        Total Kamar
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {totalRooms}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                        Terisi
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {occupiedRooms}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Occupancy Progress */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Tingkat Hunian</span>
                    <span
                      className={
                        occupancyRate > 80 ? "text-green-600" : "text-blue-600"
                      }
                    >
                      {occupancyRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${occupancyRate > 80 ? "bg-green-500" : "bg-blue-500"}`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-900 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn">
                  Lihat Detail Properti
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
