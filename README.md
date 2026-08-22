# IndoKerja

IndoKerja adalah aplikasi web untuk pencarian, pengelolaan, dan pelamaran lowongan pekerjaan.

Repository ini terdiri dari:

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: Zustand
- **Authentication**: JWT melalui HTTP-only cookie

Repository:
https://github.com/azkaowi222/arman-interndeveloper

---

## 1. Struktur Project

```text
arman-interndeveloper/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── routes/
│   ├── src/
│   │   └── generated/
│   ├── .env.example
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
│
├── frontend-ts/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

---

# 2. Requirements

Pastikan sudah menginstall:

- Git
- Node.js
- npm
- PostgreSQL atau akses ke PostgreSQL yang sudah berjalan

Cek instalasi:

```bash
git --version
node --version
npm --version
```

Versi Node.js yang kompatibel dengan dependency project sebaiknya digunakan.

---

# 3. Clone Repository

Clone repository:

```bash
git clone https://github.com/azkaowi222/arman-interndeveloper.git
```

Masuk ke project:

```bash
cd arman-interndeveloper
```

Setelah repository sudah di-clone, **tidak perlu melakukan `git clone` lagi** untuk mengambil perubahan berikutnya.

Jika ada perubahan terbaru di GitHub, gunakan:

```bash
git pull origin main
```

---

# 4. Setup Backend

Masuk ke folder backend:

```bash
cd backend
```

Install semua dependency:

```bash
npm install
```

---

## 4.1. Environment Variable Backend

Di dalam folder `backend`, buat file:

```text
.env
```

Gunakan `.env.example` sebagai referensi.

Isi `.env`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE"
SECRET_KEY="your-jwt-secret-key"
```

### DATABASE_URL

`DATABASE_URL` digunakan Prisma untuk terhubung ke PostgreSQL.

Contoh PostgreSQL lokal:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/indokerja"
```

Jika menggunakan PostgreSQL Azure:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:5432/DATABASE"
```

### SECRET_KEY

Digunakan untuk membuat dan memverifikasi JWT.

Contoh:

```env
SECRET_KEY="secret-key-development"
```

> Jangan commit file `.env` ke GitHub.

---

# 5. Setup Prisma

Pastikan `DATABASE_URL` sudah benar sebelum menjalankan Prisma.

Generate Prisma Client:

```bash
npx prisma generate
```

Schema database berada di:

```text
backend/prisma/schema.prisma
```

Project menggunakan PostgreSQL sebagai database.

Model utama:

- `User`
- `Company`
- `Job`
- `Application`
- `ApplicationStatusHistory`

---

# 6. Membuat / Menyiapkan Database

Jika menggunakan database development baru dan ingin menjalankan migration:

```bash
npx prisma migrate dev
```

Jika repository memiliki seed data dan ingin memasukkan data awal:

```bash
npm run seed
```

Untuk melihat database menggunakan Prisma Studio:

```bash
npx prisma studio
```

---

# 7. Menjalankan Backend dalam Development

Dari folder `backend`:

```bash
npm run dev
```

Script tersebut menjalankan:

```text
nodemon --exec tsx server.ts
```

Backend akan berjalan menggunakan server TypeScript secara langsung.

Jika backend menggunakan port tertentu yang ditentukan di kode/environment, gunakan port tersebut.

---

# 8. Backend Production Build

Untuk membuat build production:

```bash
npm run build
```

Script build menjalankan:

```text
prisma generate
tsc
```

Hasil TypeScript berada di:

```text
backend/dist/
```

Untuk menjalankan hasil build:

```bash
npm start
```

Script production:

```text
node dist/server.js
```

Urutan production:

```bash
npm install
npm run build
npm start
```

---

# 9. Setup Frontend

Buka terminal baru.

Dari root project:

```bash
cd frontend-ts
```

Install dependency:

```bash
npm install
```

---

# 10. Menjalankan Frontend Development

Jalankan:

```bash
npm run dev
```

Vite akan memberikan alamat seperti:

```text
http://localhost:5173
```

Buka alamat tersebut di browser.

---

# 11. Frontend Production Build

Untuk membuat production build:

```bash
npm run build
```

Script tersebut menjalankan:

```text
tsc -b
vite build
```

Hasil build berada di:

```text
frontend-ts/dist/
```

Untuk menjalankan preview production build:

```bash
npm run preview
```

---

# 12. Menjalankan Full Application

Untuk menjalankan frontend dan backend secara bersamaan, gunakan dua terminal.

## Terminal 1 - Backend

```bash
cd arman-interndeveloper/backend
npm install
npm run dev
```

## Terminal 2 - Frontend

```bash
cd arman-interndeveloper/frontend-ts
npm install
npm run dev
```

Arsitektur development:

```text
Browser
   │
   ▼
React + Vite
   │
   │ API Request
   ▼
Express + TypeScript
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

---

# 13. Authentication

Aplikasi menggunakan JWT untuk authentication.

Token authentication disimpan menggunakan **HTTP-only cookie**.

Frontend harus mengirim credentials ketika melakukan request ke backend.

Contoh menggunakan `fetch`:

```typescript
fetch("http://localhost:3000/api/...", {
  credentials: "include",
});
```

Jika menggunakan library HTTP client, pastikan opsi credentials diaktifkan.

Backend juga harus mengizinkan credentials melalui CORS.

Contoh konfigurasi:

```typescript
cors({
  origin: "http://localhost:5173",
  credentials: true,
});
```

> Sesuaikan URL frontend dan backend dengan environment yang digunakan.

---

# 14. Cookie dan HTTPS

Untuk development lokal, frontend dan backend dapat menggunakan HTTP jika konfigurasi cookie dan CORS disesuaikan.

Untuk production, jika cookie menggunakan:

```typescript
{
  httpOnly: true,
  secure: true,
  sameSite: "none"
}
```

maka koneksi harus menggunakan HTTPS.

Frontend dan backend production juga harus dikonfigurasi dengan CORS dan credentials yang sesuai.

Contoh:

```typescript
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
```

Frontend:

```typescript
fetch("https://api.example.com/...", {
  credentials: "include",
});
```

Backend:

```typescript
cors({
  origin: "https://app.example.com",
  credentials: true,
});
```

---

# 15. State Management

Frontend menggunakan Zustand.

State digunakan untuk menyimpan state aplikasi seperti:

- User
- Authentication state
- Company
- Company jobs
- Loading state

Contoh:

```typescript
const user = useUserStore((state) => state.user);
```

State Zustand tanpa `persist` hanya berada di memory browser.

Artinya:

```text
Pindah halaman
    ↓
State tetap ada
```

Tetapi:

```text
Refresh browser
    ↓
State dibuat ulang
    ↓
State kembali ke nilai awal
```

Authentication tetap sebaiknya divalidasi oleh backend menggunakan HTTP-only cookie.

---

# 16. Database Schema

Project menggunakan PostgreSQL dengan Prisma.

## User

Role:

```text
JOB_SEEKER
COMPANY
```

## Job

Jenis pekerjaan:

```text
FULL_TIME
PART_TIME
CONTRACT
INTERNSHIP
FREELANCE
```

## Application

Status lamaran:

```text
APPLIED
REVIEWING
SHORTLISTED
REJECTED
ACCEPTED
```

Relasi utama:

```text
User
 ├── Company
 └── Application
        │
        └── Job
             │
             └── Company
```

Satu user tidak dapat melamar pekerjaan yang sama lebih dari satu kali.

---

# 17. Perintah Prisma yang Sering Digunakan

Generate Prisma Client:

```bash
npx prisma generate
```

Membuat migration development:

```bash
npx prisma migrate dev
```

Menjalankan seed:

```bash
npm run seed
```

Melihat database:

```bash
npx prisma studio
```

---

# 18. Melihat Database PostgreSQL Azure

Jika PostgreSQL production menggunakan Private Access, komputer lokal mungkin tidak dapat langsung mengakses database.

Gunakan server/VM yang mempunyai akses ke network/VNet PostgreSQL.

Di Ubuntu server, install PostgreSQL client:

```bash
sudo apt update
sudo apt install postgresql-client -y
```

Cek:

```bash
psql --version
```

Jika perlu mengecek DNS:

```bash
sudo apt install dnsutils -y
```

Kemudian:

```bash
nslookup YOUR_POSTGRES_HOST
```

Tes port PostgreSQL:

```bash
nc -vz YOUR_POSTGRES_HOST 5432
```

Jika perlu install `nc`:

```bash
sudo apt install netcat-openbsd -y
```

Connect ke PostgreSQL:

```bash
psql -h YOUR_POSTGRES_HOST \
     -p 5432 \
     -U YOUR_USERNAME \
     -d YOUR_DATABASE
```

Setelah masuk `psql`:

```sql
\dt
```

Melihat data:

```sql
SELECT * FROM "companies";
```

atau sesuai nama tabel yang digunakan database.

Keluar:

```sql
\q
```

> Jika PostgreSQL menggunakan Private Access, DNS dan network/VNet harus dapat diakses dari server yang menjalankan `psql`.

---

# 19. Deployment Backend ke Azure App Service

Backend dapat di-build sebelum deployment:

```bash
cd backend
npm install
npm run build
```

Pastikan production memiliki environment variable:

```env
DATABASE_URL="..."
SECRET_KEY="..."
```

Startup command production:

```bash
npm start
```

atau:

```bash
node dist/server.js
```

Setelah deployment, log `console.log()` backend dapat dilihat dari:

```text
Azure Portal
    ↓
App Service
    ↓
Monitoring
    ↓
Log stream
```

Application logging dapat diaktifkan melalui:

```text
App Service
    ↓
App Service logs
    ↓
Application logging
    ↓
File System
```

Contoh:

```typescript
console.log("companyId:", companyId);
```

akan muncul di **Log stream** ketika endpoint tersebut dipanggil.

---

# 20. Deployment Frontend

Build frontend:

```bash
cd frontend-ts
npm install
npm run build
```

Hasilnya:

```text
frontend-ts/dist/
```

Folder `dist` berisi file production seperti:

```text
dist/
├── index.html
└── assets/
```

Folder tersebut dapat di-host menggunakan web server atau layanan hosting yang mendukung static frontend.

---

# 21. Deployment Frontend Menggunakan Nginx

Jika menggunakan Ubuntu + Nginx:

Install Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Build frontend:

```bash
cd /home/USERNAME/arman-interndeveloper/frontend-ts
npm install
npm run build
```

Buat direktori web:

```bash
sudo mkdir -p /var/www/frontend
```

Copy hasil build:

```bash
sudo cp -r dist/* /var/www/frontend/
```

Buat konfigurasi:

```bash
sudo nano /etc/nginx/sites-available/frontend
```

Isi:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name _;

    root /var/www/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Aktifkan:

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/frontend
```

Jika konfigurasi default mengganggu:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Test konfigurasi:

```bash
sudo nginx -t
```

Jika berhasil:

```bash
sudo systemctl reload nginx
```

`try_files` penting karena frontend menggunakan React Router. Route seperti:

```text
/login
/company
/company/jobs
/company/jobs/create
```

harus diarahkan kembali ke:

```text
index.html
```

agar React Router dapat menangani route tersebut.

---

# 22. Update Project Setelah `git clone`

Repository cukup di-clone satu kali.

Jika ada perubahan di GitHub:

```bash
cd arman-interndeveloper
git pull origin main
```

## Jika ada perubahan frontend

```bash
cd frontend-ts
npm install
npm run build
```

Jika dependency tidak berubah, `npm install` tidak harus dijalankan setiap kali.

## Jika ada perubahan backend

```bash
cd backend
npm install
npm run build
```

Kemudian jalankan/restart aplikasi:

```bash
npm start
```

---

# 23. Git Workflow

Setelah melakukan perubahan:

```bash
git status
```

Tambahkan perubahan:

```bash
git add .
```

Commit:

```bash
git commit -m "update application"
```

Push:

```bash
git push origin main
```

Di server yang sudah pernah melakukan clone:

```bash
git pull origin main
```

Tidak perlu melakukan:

```bash
git clone ...
```

lagi.

---

# 24. Troubleshooting

## `npm install` tidak menginstall dependency

Pastikan berada di folder yang benar.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend-ts
npm install
```

Cek dependency:

```bash
npm ls
```

---

## `tsx` tidak ditemukan

Di backend:

```bash
npm install
```

Kemudian cek:

```bash
npm ls tsx
```

Jika `tsx` tercantum di `devDependencies`, install development dependencies tidak boleh dinonaktifkan ketika proses development membutuhkan `tsx`.

---

## Prisma Client error

Jalankan:

```bash
cd backend
npx prisma generate
```

Kemudian:

```bash
npm run build
```

---

## Foreign key `jobs_companyId_fkey`

Jika muncul:

```text
Foreign key constraint violated on the constraint: jobs_companyId_fkey
```

berarti `companyId` yang dikirim ke backend tidak memiliki record Company yang sesuai di database.

Periksa:

```sql
SELECT * FROM "companies";
```

Pastikan `companyId` yang digunakan memang ada di database production.

---

## React route menghasilkan 404 setelah refresh

Jika menggunakan Nginx, pastikan ada:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Ini diperlukan untuk React Router.

---

## Cookie authentication tidak tersimpan

Periksa:

1. Backend mengirim `Set-Cookie`.
2. Frontend mengirim credentials.
3. CORS menggunakan `credentials: true`.
4. `origin` sesuai dengan frontend.
5. Jika menggunakan `SameSite=None`, cookie harus menggunakan `Secure`.
6. Jika menggunakan `Secure`, koneksi harus HTTPS.

Contoh:

```typescript
res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});
```

Frontend:

```typescript
fetch("https://API_URL/...", {
    credentials: "include",
});
```

Backend:

```typescript
cors({
    origin: "https://FRONTEND_URL",
    credentials: true,
});
```

---

# 25. Perintah Singkat Menjalankan Project

Jika semua konfigurasi sudah tersedia:

## Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

## Frontend

Terminal baru:

```bash
cd frontend-ts
npm install
npm run dev
```

---

# 26. Production

## Backend

```bash
cd backend
npm install
npm run build
npm start
```

## Frontend

```bash
cd frontend-ts
npm install
npm run build
```

Hasil frontend:

```text
frontend-ts/dist/
```

---

# 27. Security

Jangan commit:

```text
.env
```

Jangan menyimpan:

- Password database
- JWT secret
- Credential production
- Token authentication

ke dalam source code atau repository.

Gunakan environment variable untuk credential.

---

# 28. Ringkasan Arsitektur

```text
                    USER
                     │
                     ▼
              React + Vite
             (Frontend)
                     │
                     │ HTTP/HTTPS
                     │ credentials
                     ▼
            Express + TypeScript
               (Backend)
                     │
                     ▼
                  Prisma
                     │
                     ▼
               PostgreSQL
                     │
                     ▼
              Database
```

Untuk production:

```text
                         INTERNET
                            │
                            ▼
                    Frontend / Web Server
                            │
                            │ API Request
                            ▼
                    Azure App Service
                         Backend
                            │
                            ▼
                         Prisma
                            │
                            ▼
                    Azure PostgreSQL
```

---

# 29. Repository

Source code:

https://github.com/azkaowi222/arman-interndeveloper
