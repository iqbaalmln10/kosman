"use client";

import { createProperty, updateProperty } from "@/app/actions/property";
import { Building2, MapPin, Info, Globe, CheckCircle2, Building, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

interface PropertyModalProps {
  initialData?: any; // Data properti jika mode Edit
  trigger?: React.ReactNode; // Tombol pemicu custom
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
      {/* Tombol Pemicu */}
      <div onClick={() => setIsOpen(true)}>
        {trigger ? (
          trigger
        ) : (
          <button className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold text-sm">Tambah Properti</span>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99]" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-300">
              
              {/* Header */}
              <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{isEdit ? "Edit Properti" : "Daftarkan Properti"}</h2>
                    <p className="text-slate-400 text-sm">{isEdit ? "Perbarui detail aset Anda" : "Lengkapi detail aset properti kos Anda"}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
              </div>

              {/* Form */}
              <form action={handleSubmit} className="p-8 md:p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Nama Properti</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        name="name"
                        required
                        defaultValue={initialData?.name || ""}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all"
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
                        defaultValue={initialData?.city || ""}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Alamat Lengkap</label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    defaultValue={initialData?.address || ""}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 ml-1">Deskripsi (Opsional)</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={initialData?.description || ""}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-4 font-bold text-slate-500">Batal</button>
                  <button type="submit" className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                    {isEdit ? "Simpan Perubahan" : "Simpan Properti"}
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