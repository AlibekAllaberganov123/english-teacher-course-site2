# English Teacher Course Site

Modern English teaching platform uchun to'liq fullstack sayt.

## Tech Stack

- **Backend**: Encore.ts (TypeScript backend framework)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: PostgreSQL (Encore bilan avtomatik)
- **Auth**: Clerk
- **Hosting**: Encore Cloud (backend) + Vercel (frontend)

## Loyihaning tuzilishi

```
.
├── backend/          # Encore.ts backend
│   ├── admin/        # Admin panel API endpoints
│   ├── auth/         # Authentication
│   ├── contact/      # Contact form
│   ├── courses/      # Courses API
│   ├── db/           # Database va migrations
│   ├── student/      # Student dashboard API
│   └── testimonials/ # Testimonials API
│
├── frontend/         # React frontend
│   ├── components/   # UI komponentlar
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Sahifalar
│   └── App.tsx       # Main app
│
└── README.md
```

## Local ishga tushirish

### 1. Backend (Encore.ts)

```bash
cd backend
npm install
encore run
```

Backend http://localhost:4000 da ishga tushadi.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend http://localhost:5173 da ishga tushadi.

## Deploy qilish

### Backend (Encore Cloud)

1. Encore Cloud'da yangi app yarating
2. GitHub repository'ni ulang
3. Encore avtomatik deploy qiladi

```bash
encore app create
git push encore main
```

### Frontend (Vercel)

1. Vercel'da yangi project yarating
2. GitHub repository'ni ulang
3. Build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## Environment Variables

### Backend
Encore Cloud dashboard'da qo'shing:
- Database avtomatik yaratiladi

### Frontend (Vercel)
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `VITE_BACKEND_URL` - Encore backend URL

## Features

- ✅ Admin Panel (login: admin@alibek.uz / admin123)
- ✅ Teacher Panel (login: teacher@alibek.uz / teacher123)
- ✅ Student Dashboard (Clerk auth)
- ✅ Course Management
- ✅ Video Lessons
- ✅ Homework System
- ✅ Contact Form
- ✅ Testimonials
- ✅ Dark Mode
- ✅ O'zbek va English tillar

## Admin Panel

URL: `/admin`
Login: `admin@alibek.uz`
Password: `admin123`

Imkoniyatlar:
- O'quvchilarni ko'rish
- Yangi video qo'shish
- Yangi uy vazifa qo'shish
- Yangi kurs qo'shish
- Yangi lesson qo'shish
- Statistika

## Teacher Panel

URL: `/teacher`
Login: `teacher@alibek.uz`
Password: `teacher123`

Imkoniyatlar:
- O'quvchilarni ko'rish va baholash
- Uy vazifalarni tekshirish
- Statistika

## Student Dashboard

URL: `/dashboard`
Auth: Clerk (Google, Email)

Imkoniyatlar:
- Video darslarni ko'rish
- Uy vazifalarni topshirish
- Progress tracking
- Course materiallari

## Support

WhatsApp: +998 90 123 45 67
Email: info@alibek.uz
