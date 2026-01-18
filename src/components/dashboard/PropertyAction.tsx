"use client";

import { useState } from "react";
import { MoreVertical, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { deleteProperty } from "@/app/actions/property"; // Kita akan buat ini nanti
import PropertyModal from "./CreatePropertyModal"; // Import modal edit properti

export default function PropertyAction({
  property,
}: {
  property: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
            {/* --- EDIT BAGIAN INI --- */}
            <PropertyModal
              initialData={property}
              trigger={
                <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                  <Edit2 className="w-4 h-4" /> Edit Properti
                </button>
              }
            />
            {/* ----------------------- */}

            <button
              onClick={() => {
                setIsOpen(false);
                setShowDeleteConfirm(true);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Hapus Properti
            </button>
          </div>
        </>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Hapus Properti?
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Apakah Anda yakin ingin menghapus{" "}
              <span className="font-bold text-slate-800">"{property.name}"</span>
              ? Data kamar dan transaksi di dalamnya juga akan terhapus.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl transition-all"
              >
                Batal
              </button>
              <form
                action={async () => {
                  await deleteProperty(property.id);
                  setShowDeleteConfirm(false);
                }}
                className="flex-1"
              >
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white font-semibold hover:bg-red-700 rounded-xl shadow-lg shadow-red-100 transition-all"
                >
                  Ya, Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
