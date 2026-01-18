"use client";

import { createProperty, updateProperty } from "@/app/actions/property";
import { 
  Building2, MapPin, Info, Globe, CheckCircle2, 
  Building, Plus, X, Image as ImageIcon, AlignLeft
} from "lucide-react";
import { useState } from "react";

interface PropertyModalProps {
  initialData?: any;
  trigger?: React.ReactNode;
}

export default function PropertyModal({ initialData, trigger }: PropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEdit = !!initialData;

  const handleSubmit = async (formData: FormData) => {
    if (isEdit) {
      await updateProperty(initialData.id, formData);
    } else {
      await createProperty(formData);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger ? trigger : (
          <button className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold text-sm">Tambah Properti</span>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99]" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none text-slate-900">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="bg-slate-900 p-6 md:p-8 text-white flex items-center justify-between shrink-0 rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{isEdit ? "Edit Properti" : "Tambah Properti Baru"}</h2>
                    <p className="text-slate-400 text-xs">Kelola informasi dasar gedung kos Anda</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Form Content */}
              <form action={handleSubmit} className="p-6 md:p-10 space-y-8 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">

                {/* 2. Nama & Kota */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 tracking-widest uppercase ml-1">NAMA PROPERTI</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input name="name" required defaultValue={initialData?.name || ""} placeholder="Contoh: Kos The Raid" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 tracking-widest uppercase ml-1">KOTA</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input name="city" required defaultValue={initialData?.city || ""} placeholder="Contoh: Jember" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium" />
                    </div>
                  </div>
                </div>

                {/* 3. Alamat */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 tracking-widest uppercase ml-1">ALAMAT LENGKAP</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea name="address" required rows={2} defaultValue={initialData?.address || ""} placeholder="Jl. Tegal Gede No. 6..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all resize-none font-medium" />
                  </div>
                </div>

                {/* 4. Deskripsi */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 tracking-widest uppercase ml-1">DESKRIPSI (OPSIONAL)</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea name="description" rows={3} defaultValue={initialData?.description || ""} placeholder="Jelaskan fasilitas utama atau keunggulan kos ini..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all resize-none font-medium" />
                  </div>
                </div>

                {/* 1. Upload Section */}
                <div className="space-y-4">
                   <label className="text-xs font-bold text-slate-400 tracking-widest uppercase ml-1">FOTO UTAMA GEDUNG</label>
                   <div className="relative aspect-video w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-4xl flex flex-col items-center justify-center hover:bg-slate-100 transition-all group cursor-pointer">
                      <div className="p-4 bg-white rounded-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-xs font-semibold text-slate-500">Klik untuk unggah foto</p>
                      <p className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG (Max. 2MB)</p>
                      <input type="file" name="image" className="absolute inset-0 opacity-0 cursor-pointer" />
                   </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white rounded-b-3xl px-6 md:px-10 pb-6 md:pb-10 border-t border-slate-100">
                  <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-900 rounded-2xl hover:bg-slate-50 transition-all">Batal</button>
                  <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white rounded-3xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                    {isEdit ? "Simpan Perubahan" : "Konfirmasi Properti"}
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}