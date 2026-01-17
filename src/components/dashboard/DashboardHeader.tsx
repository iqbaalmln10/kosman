"use client";

import { useState } from "react";
import { Building2, ChevronDown, Bell, Settings, Plus } from "lucide-react";
import { NavbarProfile } from "@/components/NavbarProfile";
import Link from "next/link";
import CreatePropertyModal from "@/components/dashboard/CreatePropertyModal";

// Tambahkan Interface untuk Type Data
interface Property {
  id: string;
  name: string;
  _count?: {
    rooms: number;
  };
  rooms?: {
    status: string;
  }[];
}

export function DashboardHeader({ properties }: { properties: Property[] }) {
  // Default ke properti pertama dari DB, jika tidak ada pakai object kosong
  const [selectedProperty, setSelectedProperty] = useState(properties[0] || { name: "Pilih Properti", id: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hitung kamar terisi (opsional, jika data rooms disertakan)
  const getOccupiedCount = (prop: Property) => {
    return prop.rooms?.filter(r => r.status === 'OCCUPIED').length || 0;
  };

  const getTotalRooms = (prop: Property) => {
    return prop._count?.rooms || prop.rooms?.length || 0;
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Building2 className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-900">
            {selectedProperty.name}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
            <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
              {properties.length === 0 ? (
                <div className="px-4 py-2 text-sm text-slate-500 text-center">Belum ada properti</div>
              ) : (
                properties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => {
                      setSelectedProperty(prop);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors ${
                      selectedProperty.id === prop.id ? "bg-slate-50" : ""
                    }`}
                  >
                    <div className="font-medium text-slate-900">{prop.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {getOccupiedCount(prop)}/{getTotalRooms(prop)} kamar terisi
                    </div>
                  </button>
                ))
              )}
              
              <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                <p className="text-xs text-slate-500 mb-2">Ingin menambah properti baru?</p>
                <CreatePropertyModal />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* ... (Notif & Settings tetap sama) */}
        <NavbarProfile />
      </div>
    </header>
  );
}