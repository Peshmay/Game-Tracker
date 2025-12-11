# GameTimeTracker – Monorepo (Backend + Frontend)

This is a **full-stack TypeScript project** using:

- Backend: Node.js, Express, PostgreSQL, Prisma, Zod, Multer
- Frontend: React, TypeScript, Vite, TailwindCSS, Recharts, Firebase Auth
- Extra: Weather widget using OpenWeatherMap API

## 1. Prerequisites

- Node.js (>= 18)
- PostgreSQL running locally
- An OpenWeatherMap API key
- A Firebase project (you already have: `gametimetracker-8a5ed`)

## 2. Clone & install

```bash
cd gametimetracker-monorepo

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 3. Configure backend (.env)

In `backend/.env` (create it from `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gametimetracker_dev?schema=public"
WEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY"
PORT=4000
```

Create the database in Postgres:

```sql
CREATE DATABASE gametimetracker_dev;
```

## 4. Prisma migrate & seed

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

This will create tables and seed:

- A demo user (`demo.user@example.com`)
- A few games (GTA V, Portal 2, Witcher 3, Civilization V)

## 5. Run the backend

```bash
cd backend
npm run dev
```

Backend is now on **http://localhost:4000**.

## 6. Run the frontend

```bash
cd frontend
npm run dev
```

Frontend dev server: usually **http://localhost:5173**.

## 7. Login flow (Firebase)

You will manage accounts directly in the **Firebase console**:

- Create normal users there (email/password).
- Create at least one admin user with email `admin@example.com`
  (or change the list in `frontend/src/pages/AdminLoginPage.tsx`).

**User login:**

- Go to `/login` (root redirects here).
- Sign in with Firebase (email/password).
- On success → redirected to `/play`.

**Admin login:**

- On `/login`, click **“Go to admin login”**.
- Sign in with admin email.
- On success → redirected to `/users` (Admin area).

## 8. Main pages

- `/login` – normal user login (Firebase).
- `/admin-login` – admin login.
- `/play` – choose user + game, see game cards, start timer.
- `/play/timer` – timer page, shows selected user & game, “STOP”.
- `/statistics` – charts with Recharts (per game, per user, weekly trend, leaderboard).
- `/users` – admin page: see all users, delete users, “+ Add User”.
- `/users/:id` – user details with per‑game breakdown.
- `/profile` – register user (email, first/last name, optional profile picture).

## 9. API overview (backend)

- `GET /api/users` – list users
- `GET /api/users/:id` – get user with sessions
- `POST /api/users` – create user (multipart/form-data, uses Multer)
- `DELETE /api/users/:id` – delete user (and their sessions)

- `GET /api/games` – list games
- `POST /api/games` – create game

- `POST /api/sessions/start` – start a session
- `PATCH /api/sessions/stop` – stop a session (body: `{ id }`)
- `PATCH /api/sessions/:id/stop` – alternative stop endpoint

- `GET /api/statistics` – aggregate minutes per game, per user, weekly usage, leaderboard

- `GET /api/weather?city=Uddevalla` – weather widget data

## 10. Tailwind & styling

The frontend already has Tailwind configured. Components use utility classes to create:

- Dark background (gaming style)
- Responsive layouts (grids, flex)
- Nice cards for users and games

## 11. Where to customise

- **Admin emails**: `frontend/src/pages/AdminLoginPage.tsx`
- **Game showcase cards**: `frontend/src/assets/genres.ts`
- **Avatar mapping**: `frontend/src/utils/avatars.ts`
- **Seed games & demo user**: `backend/prisma/seed.ts`
- **Database models**: `backend/prisma/schema.prisma`

You can now open VS Code, run both servers, and show everything in your presentation:
auth, CRUD, Prisma, charts, weather widget, etc.
