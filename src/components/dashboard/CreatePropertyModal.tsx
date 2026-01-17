"use client";

import { createProperty } from "@/app/actions/property";
import { 
  Building2, 
  MapPin, 
  Info, 
  Globe, 
  CheckCircle2,
  Building,
  Plus,
  X
} from "lucide-react";
import { useState } from "react";

export default function CreatePropertyModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await createProperty(formData);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-semibold text-sm">Tambah Properti</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop dengan Blur */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99] animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          
          {/* Elegant Header */}
          <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Daftarkan Properti</h2>
                <p className="text-slate-400 text-sm">Lengkapi detail aset properti kos Anda</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Form Section */}
          <form action={handleSubmit} className="p-8 md:p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            {/* Group 1: Informasi Dasar */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Info className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-slate-900">Informasi Utama</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Nama Properti</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="name"
                      required
                      placeholder="Kos Exclusive Tegal Gede"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Kota</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      name="city"
                      required
                      placeholder="Jember"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Group 2: Lokasi & Detail */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-slate-900">Lokasi & Detail</h3>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Alamat Lengkap</label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="Jl. Tegal Gede Gg. Tawangmangu No. 6..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all resize-none text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Deskripsi (Opsional)</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Ceritakan sedikit tentang fasilitas kos Anda..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-400 outline-none transition-all resize-none text-slate-900"
                />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 order-2 md:order-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-[2] order-1 md:order-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
              >
                Simpan Properti
                <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}