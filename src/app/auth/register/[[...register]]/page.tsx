import Link from "next/link";
import { Building2, ArrowLeft, Check } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {" "}
        {/* Sedikit diperlebar */}
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits (Tetap Gunakan UI Anda yang bagus) */}
          <div className="hidden lg:block h-full">
            <div className="bg-slate-900 rounded-3xl p-10 h-full text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-8 h-8" />
                  <span className="text-2xl font-semibold">Kosman</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Bergabung dengan Owner Modern
                </h2>
                <p className="text-slate-300 mb-8">
                  Kelola semua properti kos Anda dalam satu platform yang
                  powerful namun mudah digunakan.
                </p>

                <div className="space-y-6">
                  <BenefitItem text="Unlimited properti dan kamar" />
                  <BenefitItem text="Tagihan otomatis setiap bulan" />
                  <BenefitItem text="WhatsApp reminder terintegrasi" />
                  <BenefitItem text="Laporan keuangan real-time" />
                  <BenefitItem text="Dashboard analytics" />
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700">
                <p className="text-slate-400 text-sm italic">
                  "Sejak pakai Kosman, waktu saya untuk urusan tagihan berkurang
                  80%. Sekarang semua otomatis!"
                </p>
                <div className="mt-4">
                  <p className="font-medium">Pak Budi</p>
                  <p className="text-slate-400 text-sm">
                    Owner 5 Kos di Jakarta
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Clerk SignUp Form */}
          <div className="flex justify-center">
            {/* Kita bungkus SignUp dengan Appearance prop agar sesuai tema Slate */}
            <SignUp
              routing="path"
              path="/auth/register"
              fallbackRedirectUrl="/dashboard"
              signInUrl="/auth/login"
              appearance={{
                layout: {
                  logoPlacement: "none", // MENGHILANGKAN LOGO CLERK
                  shimmer: true,
                },
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-none p-0 w-full", // Menghilangkan kartu putih agar menyatu dengan background
                  headerTitle:
                    "text-3xl font-bold text-slate-900 tracking-tight",
                  headerSubtitle: "text-slate-600 text-base mb-4",
                  main: "gap-4", // Merapatkan jarak antar elemen
                  formButtonPrimary:
                    "bg-slate-900 hover:bg-slate-800 text-sm normal-case py-3 rounded-xl shadow-none",
                  formFieldInput:
                    "rounded-xl border-slate-200 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all py-3",
                  socialButtonsBlockButton:
                    "border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all py-3",
                  socialButtonsBlockButtonText: "font-medium text-slate-700",
                  dividerLine: "bg-slate-200",
                  dividerText: "text-slate-400 text-xs uppercase font-semibold",
                  footerActionLink: "text-slate-900 font-bold hover:underline",
                  formFieldLabel: "text-slate-700 font-medium mb-1",
                  internal: "hidden", // Menyembunyikan elemen internal Clerk yang tidak perlu
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-slate-100">{text}</span>
    </div>
  );
}
