# ⚠️ QUICK REFERENCE - BAGIAN PENTING

## 🔥 FILE-FILE CRITICAL

### 1. `vercel.json` (Root)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
**⚠️ WAJIB ADA** - Fix routing SPA di Vercel

---

### 2. `src/hooks/useAuth.js`
**Line Penting**:
```javascript
// Line ~60: LOGOUT REDIRECT
window.location.href = "/";  // ← Ke landing page
```

---

### 3. `src/routes.jsx`
**Route Penting**:
```javascript
// Path "*" HARUS DI PALING BAWAH
{
  path: "*",
  element: <NotFoundPage />,
}
```

---

### 4. `src/services/authService.js`
**Environment Variables**:
- `VITE_BASE_URL_API` ✅ Required
- `VITE_ENVIRONMENT` ✅ Required

---

## 🎯 EMOJI LEGEND

- 🔥 = Critical/Penting
- ⚠️ = Warning/Perhatian
- ✅ = Success/Correct
- ❌ = Error/Wrong
- 🔐 = Authentication
- 🗺️ = Routing
- 📝 = Documentation
- 🚀 = Deployment

---

## 📋 CHECKLIST SEBELUM PUSH

- [ ] Code sudah di-test di local
- [ ] No console errors
- [ ] `vercel.json` ada di root
- [ ] Environment variables sudah set
- [ ] Logout redirect ke "/" (landing page)
- [ ] Route "*" di paling bawah routes.jsx

---

**📚 Lihat dokumentasi lengkap**: `CODE-DOCUMENTATION.md`
