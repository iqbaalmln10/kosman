Ini adalah draf file `README.md` yang lengkap, profesional, dan terstruktur khusus untuk proyek **Kosman**. File ini dirancang agar siap kamu pasang di GitHub atau Notion sebagai panduan utama proyek.

---

# 🏠 Kosman: Multi-Property Management System

**Kosman** adalah platform manajemen kos-kosan modern berbasis *full-stack* yang dirancang untuk membantu pemilik kos (Owner) mengelola banyak properti sekaligus secara efisien. Proyek ini mencakup ekosistem **Web Dashboard** untuk pengelolaan data berat dan **Mobile App** untuk pemantauan cepat serta notifikasi.

---

## 🚀 Fitur Utama (MVP)

### 🏢 Multi-Property Management

- **Single Account, Multiple Assets:** Kelola banyak cabang kos-kosan (properti) dalam satu akun owner.
- **Property Switching:** Berpindah antar dashboard properti dengan satu klik.

### 🛏️ Manajemen Kamar & Penghuni

- **Status Kamar:** Monitoring status kamar (Tersedia, Terisi, Renovasi) secara real-time.
- **Tenant Database:** Penyimpanan data penghuni lengkap dengan foto KTP dan tanggal jatuh tempo.

### 💰 Sistem Keuangan & Penagihan

- **Automated Invoicing:** Pembuatan tagihan otomatis setiap bulan berdasarkan tanggal masuk penghuni.
- **Transaction Logs:** Catatan riwayat pembayaran (Lunas, Menunggak, atau DP).
- **WhatsApp Integration:** Kirim pengingat tagihan langsung ke WhatsApp penghuni melalui aplikasi.

### 📊 Dashboard Analytics

- Visualisasi pendapatan bulanan per properti.
- Statistik okupansi (persentase kamar yang terisi).

---

## 🛠️ Tech Stack

### Frontend & Backend (Web)

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Clerk](https://clerk.com/) (Secure & Scalable Auth)

### Database & Dev Tools

- **Database:** [PostgreSQL](https://www.postgresql.org/) (Hosted on Supabase/Neon)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Design Tool:** [Figma](https://www.figma.com/)
- **API Testing:** Postman

### Mobile (Future Development)

- **Framework:** [React Native](https://reactnative.dev/) (Expo)

---

## 📂 Struktur Database (High Level)

Aplikasi ini menggunakan relasi database sebagai berikut:

1. **User (Owner):** Pemegang akun utama.
2. **Property:** Milik User (Relasi: *One-to-Many*).
3. **Kamar:** Milik Property (Relasi: *One-to-Many*).
4. **Penghuni:** Menghuni Kamar (Relasi: *One-to-One*).
5. **Transaksi:** Milik Penghuni (Relasi: *One-to-Many*).
