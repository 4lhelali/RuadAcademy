# RuadAcademy — Upgraded Project Setup Guide

This guide walks you through setting up all 7 new features step by step.

---

## 📦 Step 1 — Install Dependencies

```bash
npm install
```

---

## 🗄️ Step 2 — Neon Database Setup

### 2.1 Create Neon Project
1. Go to **https://neon.tech** → Sign up (free tier available)
2. Click **"New Project"** → Name it `ruad-academy`
3. Choose a region close to you (e.g., `AWS us-east-2`)
4. Click **"Create Project"**

### 2.2 Get Your Connection String
1. In your Neon dashboard → click your project
2. Go to **"Connection Details"** tab
3. Select **.env** format
4. Copy the `DATABASE_URL` value

### 2.3 Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Paste your Neon connection string:
   ```
   DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   VITE_DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   > **Note:** Both `DATABASE_URL` (for drizzle-kit CLI) and `VITE_DATABASE_URL` (for the browser client) are needed.

### 2.4 Push the Schema to Neon
```bash
npx drizzle-kit push
```
This creates the `users` and `posts` tables in your Neon database. ✅

---

## 📁 Step 3 — UploadThing Setup (Free Image Storage)

### 3.1 Create UploadThing App
1. Go to **https://uploadthing.com** → Sign up (free: 2GB storage)
2. Click **"Create a new app"** → Name it `ruad-academy`
3. Go to **API Keys** → Copy:
   - **App ID** → `UPLOADTHING_APP_ID` and `VITE_UPLOADTHING_APP_ID`
   - **Secret Key** → `UPLOADTHING_SECRET` and `VITE_UPLOADTHING_SECRET`

### 3.2 Add to .env
```
VITE_UPLOADTHING_APP_ID=your_app_id
VITE_UPLOADTHING_SECRET=sk_live_xxxxxxxxx
```

---

## 📧 Step 4 — EmailJS Setup (Contact Form → Email)

### 4.1 Create EmailJS Account
1. Go to **https://www.emailjs.com** → Sign up (free: 200 emails/month)

### 4.2 Add Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → sign in with `akadymytruad@gmail.com`
4. Name it `ruad-academy-service`
5. Click **Create Service** → copy the **Service ID**

### 4.3 Create Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Set the template:
   - **Subject:** `New Message from {{from_name}} — {{inquiry}}`
   - **Body:**
     ```
     You have received a new contact form submission:

     Name:    {{from_name}}
     Email:   {{from_email}}
     Phone:   {{phone}}
     Inquiry: {{inquiry}}

     Message:
     {{message}}
     ```
   - **To Email:** `akadymytruad@gmail.com`
3. Click **Save** → copy the **Template ID**

### 4.4 Get Public Key
1. Dashboard → **Account** → **API Keys**
2. Copy your **Public Key**

### 4.5 Add to .env
```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

---

## 🔐 Step 5 — Set Admin Credentials

In your `.env` file, set your admin username and password:
```
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=YourSecurePassword2026!
```

> **Security note:** These credentials are stored in the frontend. For a production app, consider using a backend auth service (Clerk, Supabase Auth, etc.).

---

## 🚀 Step 6 — Run the Project

```bash
npm run dev
```

Open **http://localhost:5173**

---

## 🗺️ URL Structure

| URL | Description |
|-----|-------------|
| `/` | Home page with recent posts carousel |
| `/about` | About page |
| `/services` | Services page |
| `/contact` | Contact page with email form |
| `/posts` | All recent posts |
| `/adminlogin` | Admin login (hidden from nav) |
| `/admin/dashboard` | Post management (admin only) |

---

## ✅ Feature Checklist

- [x] **Database** — Neon PostgreSQL via Drizzle ORM (`users` + `posts` tables)
- [x] **Image Storage** — UploadThing free tier
- [x] **Admin Login** — `/adminlogin` with username/password from `.env`
- [x] **Admin Dashboard** — `/admin/dashboard` to add/delete posts
- [x] **Post Form** — Title, Image, Description, Link fields
- [x] **Recent Posts Page** — Fetches all posts from DB, shows with cards
- [x] **Home Carousel** — Last 3 posts shown in auto-sliding carousel
- [x] **Contact Email** — Form sends to `akadymytruad@gmail.com` via EmailJS

---

## 🌐 Deploy to Vercel

1. Push your project to GitHub
2. Go to **https://vercel.com** → Import project
3. Add all `.env` variables in **Vercel → Settings → Environment Variables**
4. Deploy!

> The `vercel.json` already handles SPA routing.

---

## 🆘 Troubleshooting

**Posts not loading?**
→ Check `VITE_DATABASE_URL` is set correctly in `.env`
→ Run `npx drizzle-kit push` to make sure tables exist

**Images not uploading?**
→ Check `VITE_UPLOADTHING_SECRET` is set
→ Images will fall back to local preview if UploadThing fails

**Contact email not sending?**
→ Check all 3 EmailJS keys are set in `.env`
→ If not configured, the form will open your default email client as fallback

**Admin login not working?**
→ Check `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` in `.env`
→ Default credentials are `admin` / `ruadacademy2026`
