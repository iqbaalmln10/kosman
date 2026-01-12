Ini adalah draf file README.md yang lengkap, profesional, dan terstruktur khusus untuk proyek Kosman. File ini dirancang agar siap kamu pasang di GitHub atau Notion sebagai panduan utama proyek.

🏠 Kosman: Multi-Property Management System
Kosman adalah platform manajemen kos-kosan modern berbasis full-stack yang dirancang untuk membantu pemilik kos (Owner) mengelola banyak properti sekaligus secara efisien. Proyek ini mencakup ekosistem Web Dashboard untuk pengelolaan data berat dan Mobile App untuk pemantauan cepat serta notifikasi.

🚀 Fitur Utama (MVP)
🏢 Multi-Property Management
Single Account, Multiple Assets: Kelola banyak cabang kos-kosan (properti) dalam satu akun owner.

Property Switching: Berpindah antar dashboard properti dengan satu klik.

🛏️ Manajemen Kamar & Penghuni
Status Kamar: Monitoring status kamar (Tersedia, Terisi, Renovasi) secara real-time.

Tenant Database: Penyimpanan data penghuni lengkap dengan foto KTP dan tanggal jatuh tempo.

💰 Sistem Keuangan & Penagihan
Automated Invoicing: Pembuatan tagihan otomatis setiap bulan berdasarkan tanggal masuk penghuni.

Transaction Logs: Catatan riwayat pembayaran (Lunas, Menunggak, atau DP).

WhatsApp Integration: Kirim pengingat tagihan langsung ke WhatsApp penghuni melalui aplikasi.

📊 Dashboard Analytics
Visualisasi pendapatan bulanan per properti.

Statistik okupansi (persentase kamar yang terisi).

🛠️ Tech Stack
Frontend & Backend (Web)
Framework: Next.js 15+ (App Router)

Language: TypeScript

Styling: Tailwind CSS

Authentication: Clerk (Secure & Scalable Auth)

Database & Dev Tools
Database: PostgreSQL (Hosted on Supabase/Neon)

ORM: Prisma

Design Tool: Figma

API Testing: Postman

Mobile (Future Development)
Framework: React Native (Expo)

📂 Struktur Database (High Level)
Aplikasi ini menggunakan relasi database sebagai berikut:

User (Owner): Pemegang akun utama.

Property: Milik User (Relasi: One-to-Many).

Kamar: Milik Property (Relasi: One-to-Many).

Penghuni: Menghuni Kamar (Relasi: One-to-One).

Transaksi: Milik Penghuni (Relasi: One-to-Many).