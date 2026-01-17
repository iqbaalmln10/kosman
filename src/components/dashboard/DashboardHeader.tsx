// src/components/dashboard/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { Building2, ChevronDown, Bell, Settings, Plus, ArrowLeft} from "lucide-react";
import { NavbarProfile } from "@/components/NavbarProfile";
import Link from "next/link";

// TODO: Replace with actual data from database
const properties = [
  { id: "1", name: "Kos Melati", totalRooms: 12, occupiedRooms: 10 },
  { id: "2", name: "Kos Mawar", totalRooms: 8, occupiedRooms: 7 },
  { id: "3", name: "Kos Kenanga", totalRooms: 15, occupiedRooms: 12 },
];

export function DashboardHeader() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
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
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
              {properties.map((prop) => (
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
          </>
        )}
      </div>

      {/* Right Actions */}
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
    </header>
    </>
  );
}
