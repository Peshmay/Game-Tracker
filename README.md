# Game Tracker

[![Backend Tests](https://github.com/Peshmay/Game-Tracker/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/Peshmay/Game-Tracker/actions/workflows/backend-tests.yml)

A game tracking application with admin/user roles, statistics, and CI-tested backend.

## Screenshots

### Login Page

![Login Page](screenshots/Userlogin.png)

### Users

![Users](screenshots/UserDashboard.png)

### Play Game

![Play Page](screenshots/PlayGamepage.png)

### Timer Page

![Timer Page](screenshots/Timepage.png)

### Statistics

![Statistics](screenshots/StatisticPage.png)

### Admin Login

![Admin Login](screenshots/AdminLogin.png)

### Admin Dashboard

![Admin Dashboard](screenshots/AdminDashboard.png)

### Admin Users

![Admin Users](screenshots/AllUsers.png)

### Register page

![Register page](screenshots/Registerpage.png)

## API Documentation (Swagger)

Swagger UI: http://localhost:4000/api-docs

### CI Pipeline

![CI](screenshots/ci-passing.png)

Game Tracker is a full-stack TypeScript application for tracking game playtime per user, visualizing statistics, and managing users through an admin interface.

The project demonstrates CRUD operations, authentication, REST APIs, testing, and CI with GitHub Actions.

🛠 Technologies Used
Frontend

React

TypeScript

Vite

Tailwind CSS

Recharts

Firebase Authentication

Backend

Node.js

Express

TypeScript

Prisma ORM

Zod

Multer

Winston (logging)

Jest + Supertest (testing)

Database

PostgreSQL

CI / Tooling

GitHub Actions

Jest Coverage

Prisma Migrations & Seed

✅ Prerequisites

Make sure you have the following installed:

Node.js (>= 18)

PostgreSQL

Firebase project (Email/Password auth enabled)

OpenWeatherMap API key

📦 Installation

1. Clone the Repository
   git clone https://github.com/Peshmay/Game-Tracker.git
   cd Game-Tracker

2. Backend Setup
   cd backend
   npm install

Create a PostgreSQL database:

CREATE DATABASE gametimetracker_dev;

Create .env file in backend/:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gametimetracker_dev?schema=public"
WEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY"
PORT=4000

Run Prisma:

npx prisma migrate dev --name init
npx prisma db seed

3. Frontend Setup
   cd ../frontend
   npm install

▶️ Running the Application
Start the Backend
cd backend
npm run dev

Backend runs on:
👉 http://localhost:4000

Start the Frontend
cd frontend
npm run dev

Frontend runs on:
👉 http://localhost:5173

🔐 Authentication (Firebase)

Authentication is handled with Firebase Email/Password.

User Login

Visit /login

Sign in using Firebase credentials

Redirected to /play

Admin Login

On /login, click Admin login

Admin emails are defined in:

frontend/src/pages/AdminLoginPage.tsx

Redirected to /users (admin dashboard)

📊 Main Features
User Features

Select user and game

Start and stop game sessions

View statistics:

Time per game

Time per user

Weekly activity

Leaderboard

Weather widget (OpenWeatherMap)

Admin Features

View all users

Create users (with optional avatar upload)

Delete users

View detailed user statistics

🌐 API Overview (Backend)
Users

GET /api/users

GET /api/users/:id

POST /api/users

DELETE /api/users/:id

Games

GET /api/games

POST /api/games

Sessions

POST /api/sessions/start

PATCH /api/sessions/:id/stop

Statistics

GET /api/statistics

Weather

GET /api/weather?city=CityName

🧪 Testing

Backend tests are written using Jest + Supertest and run automatically in GitHub Actions.

Run Tests Locally
cd backend
npm test

Run Tests with Coverage
cd backend
npm run test:coverage

🔄 Continuous Integration

GitHub Actions runs backend tests on:

Every push to main

Every pull request to main

Coverage artifacts are generated automatically

📁 Project Customization

Admin emails: frontend/src/pages/AdminLoginPage.tsx

Avatars mapping: frontend/src/utils/avatars.ts

Seed data: backend/prisma/seed.ts

Database schema: backend/prisma/schema.prisma

Logger config: backend/src/utils/logger.ts

🎯 Project Purpose

This project was built to demonstrate:

Full-stack TypeScript development

REST API design

Authentication with Firebase

Database modeling with Prisma

Automated testing & CI pipelines

Clean project structure and documentation
