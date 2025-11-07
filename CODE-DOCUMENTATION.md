# 📚 DOKUMENTASI CODE - Web Inaugurasi FIK

## 🎯 BAGIAN PENTING DALAM PROJECT

### 1. ⚙️ **vercel.json** - Konfigurasi Deployment Vercel
**Lokasi**: `/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Fungsi**:
- ✅ Mengatasi masalah 404 pada SPA (Single Page Application) di Vercel
- ✅ Semua request akan di-rewrite ke `index.html`
- ✅ React Router akan handle routing di client-side
- ⚠️ **PENTING**: File ini WAJIB ada untuk deployment di Vercel!

---

### 2. 🔐 **useAuth.js** - Custom Hook Authentication
**Lokasi**: `/src/hooks/useAuth.js`

**Fungsi Utama**:
1. **Login**: Autentikasi user dan simpan token
2. **Logout**: Hapus token dan redirect ke landing page
3. **Auto-fetch**: Ambil data user otomatis dari token
4. **Validation**: Validasi token expired

**⚠️ KONFIGURASI PENTING**:
```javascript
// REDIRECT setelah logout
window.location.href = "/";  // ← Landing page (BUKAN login page)
```

**Return Values**:
- `user` - Data user yang login
- `loading` - Status loading
- `login()` - Function untuk login
- `logout()` - Function untuk logout
- `isAuthenticated` - Boolean status login
- `token` - JWT Token

---

### 3. 🗺️ **routes.jsx** - Konfigurasi Routing
**Lokasi**: `/src/routes.jsx`

**Struktur Route**:

```
📍 PUBLIC ROUTES
├── "/" → Landing Page
├── "/pendaftaranPeserta/:kodeEvent" → Form Peserta
├── "/pendaftaranPanitia/:kodeEvent" → Form Panitia
└── "/presensi*" → Presensi

🔐 AUTH ROUTES (Not Logged In)
└── "/admin/auth/login" → Login Page

🎛️ ADMIN ROUTES (Protected)
├── "/admin" → Dashboard
├── "/admin/events" → Event Management
├── "/admin/keuangan/*" → Keuangan
├── "/admin/listpeserta" → Daftar Peserta
├── "/admin/listpanitia" → Daftar Panitia
├── "/admin/dokumentasi" → Dokumentasi
└── "/admin/sertifikat" → Sertifikat

❌ CATCH ALL
└── "*" → NotFoundPage (404)
```

**⚠️ PENTING**:
- Route `"*"` harus di **paling bawah** untuk catch 404
- Middleware `IsLoginMiddleware` untuk protect admin routes
- Middleware `NotLoginMiddleware` untuk prevent logged in user ke login page
- Loader `CheckEventCode` untuk validasi kode event

---

### 4. 🔌 **authService.js** - Auth API Service
**Lokasi**: `/src/services/authService.js`

**API Endpoints**:
1. `POST /login` - Login user
2. `POST /logout` - Logout user
3. `GET /me` - Get user profile

**Environment Variables Required**:
```env
VITE_BASE_URL_API=your_api_url
VITE_ENVIRONMENT=production/development
```

---

## 🔒 MIDDLEWARE SISTEM

### 1. **IsLoginMiddleware**
- Protect route yang butuh authentication
- Redirect ke login jika belum login
- Digunakan di: `/admin/*`

### 2. **NotLoginMiddleware**
- Prevent user yang sudah login ke halaman auth
- Redirect ke dashboard jika sudah login
- Digunakan di: `/admin/auth/*`

### 3. **CheckEventCode**
- Validasi kode event valid
- Redirect ke 404 jika kode event tidak valid
- Digunakan di: `/pendaftaran*`

---

## 🚀 DEPLOYMENT WORKFLOW

### Local Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Deploy ke Vercel
```bash
git add .
git commit -m "Your message"
git push
```
- Vercel akan auto-deploy setelah push
- Pastikan `vercel.json` ada di root project

---

## ⚠️ TROUBLESHOOTING

### Problem: 404 setelah refresh di Vercel
**Solution**: Pastikan `vercel.json` sudah ada dengan konfigurasi rewrites

### Problem: Logout tidak ke landing page
**Solution**: Check `useAuth.js`, pastikan redirect ke `"/"` bukan `"/admin/auth/login"`

### Problem: Route tidak ditemukan
**Solution**: Check `routes.jsx`, pastikan route `"*"` ada di paling bawah

---

## 📝 CATATAN PENTING

✅ **DO**:
- Selalu test di local dulu sebelum push
- Pastikan environment variables sudah set
- Check error di browser console
- Commit dengan pesan yang jelas

❌ **DON'T**:
- Jangan hapus `vercel.json`
- Jangan ubah redirect logout tanpa testing
- Jangan ubah urutan route (path `"*"` harus di bawah)
- Jangan commit token atau credentials

---

## 🔄 UPDATE LOG

- **2025-11-07**: 
  - ✅ Tambah `vercel.json` untuk fix routing di Vercel
  - ✅ Ubah logout redirect dari login page ke landing page
  - ✅ Clean code dan tambah dokumentasi lengkap

---

## 📞 SUPPORT

Jika ada pertanyaan atau masalah, silakan check:
1. Dokumentasi ini
2. Console browser untuk error
3. Network tab untuk API errors
4. Vercel logs untuk deployment errors
