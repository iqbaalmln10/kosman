import { createProperty } from "@/app/actions/property";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link
        href="/dashboard/kos"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tambah Properti
            </h1>
            <p className="text-slate-500">
              Daftarkan kos atau kontrakan baru Anda
            </p>
          </div>
        </div>

        <form action={createProperty} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nama Properti
            </label>
            <input
              name="name"
              required
              placeholder="Contoh: Kos Mangga 12"
              className="w-full px-4 py-3 rounded-xl 
               border border-slate-200 
               text-slate-900 
               placeholder:text-slate-400
               focus:ring-4 focus:ring-slate-100 
               focus:border-slate-400 
               outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              name="address"
              required
              placeholder="Jl. Raya No. 123..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl 
               border border-slate-200 
               text-slate-900 
               placeholder:text-slate-400
               focus:ring-4 focus:ring-slate-100 
               focus:border-slate-400 
               outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Simpan Properti
          </button>
        </form>
      </div>
    </div>
  );
}
