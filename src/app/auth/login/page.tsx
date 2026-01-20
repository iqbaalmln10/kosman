"use client"; // WAJIB untuk menggunakan hook auth

import { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect jika sudah login menggunakan useEffect untuk menghindari error rendering
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    return null;
  }

  // Logic Login Clerk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard"); // Setelah login berhasil, pindah ke dashboard
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logic Login Google
  const loginWithGoogle = () => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/auth/login", // Ke halaman login lagi untuk proses finishing
      redirectUrlComplete: "/dashboard", // TUJUAN AKHIR
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-600">Masuk ke dashboard Kosman Anda</p>
          </div>

          {/* Menampilkan Error jika ada */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">atau</span>
            </div>
          </div>

          <button
            onClick={loginWithGoogle}
            type="button"
            className="w-full py-3.5 border-2 border-slate-200 rounded-xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
          >
            {/* SVG Google tetap sama */}
            <span className="text-slate-700">Masuk dengan Google</span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
