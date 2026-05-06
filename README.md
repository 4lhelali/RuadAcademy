# Ruad Academy Website — Hostinger Deployment Guide

  ---

  

  ### Step 2 — Configure the PHP API
  Open **`api/config.php`** and fill in your database credentials:
  ```php
  define('DB_HOST', 'localhost');           // Always localhost on Hostinger
  define('DB_NAME', 'your_database_name'); // e.g. u123456789_ruad
  define('DB_USER', 'your_database_user'); // e.g. u123456789_ruaduser
  define('DB_PASS', 'your_database_pass'); // Your MySQL password
  ```

  ### Step 3 — Create the Database Tables
  1. In hPanel → **phpMyAdmin** → select your database → **SQL** tab
  2. Paste and run the contents of **`db_setup.sql`**
  3. This creates the `posts` and `users` tables

  ### Step 4 — Build the React App
  ```bash
  npm install
  npm run build
  ```
  This creates a `dist/` folder with the compiled React app.

  ### Step 5 — Upload to Hostinger via File Manager
  Upload the following to your **`public_html/`** folder:
  - Everything inside `dist/` (the built React files)
  - The `api/` folder (PHP backend)
  - The `images/` folder (for uploaded images)
  - `.htaccess` (SPA routing)
  - `db_setup.sql` (for reference — optional)


  ---

  ## Local Development

  ```bash
  npm install
  npm run dev
  ```

  ---

  ## Environment Variables (`.env`)
  | Variable | Purpose |
  |----------|---------|
  | `VITE_ADMIN_USERNAME` | Admin login username |
  | `VITE_ADMIN_PASSWORD` | Admin login password |
  | `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
  | `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
  | `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

  Database credentials are **NOT** in `.env` — they live in `api/config.php` (server-side only).

