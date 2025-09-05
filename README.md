# vehicle-rental-app
Complete solution: React + Material UI frontend, Node + Express + Prisma backend, SQLite database.
Multi-step vehicle booking form with validation and overlap-safe bookings.

## Project Overview

This project implements a vehicle booking wizard:

-> Frontend: React + Material UI (MUI), single-question-per-step wizard.

-> Backend: Node.js + Express + Prisma ORM, SQLite database.

-> Features:

1. Choose number of wheels → vehicle type → specific model → booking dates.

2. Dynamic lists from database (no hardcoded options).

3. Prevents overlapping bookings for the same vehicle.

4. Backend validates all inputs with Zod.

## Folder Structure

vehicle-rental-app/
├─ backend/
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.js
│  ├─ src/
│  │  └─ server.js
│  ├─ .env
│  └─ package.json
└─ frontend/
   ├─ src/
   │  ├─ components/
   │  ├─ api.js
   │  ├─ App.jsx
   │  ├─ main.jsx
   │  └─ theme.js
   ├─ index.html
   ├─ package.json
   └─ vite.config.js

## Setup Instructions

1. Backend
   
-> cd backend

-> npm install

-> npx prisma migrate dev --name init  

-> npm run seed 

-> npm run dev                         

Server runs on: http://localhost:4000

-> Endpoints:

GET /api/wheels → [2,4]

GET /api/vehicle-types?wheels=4 → list of vehicle types

GET /api/vehicles?typeId=1 → list of vehicles for a type

POST /api/bookings → create booking with overlap check

2. Frontend

cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173

-> Features a wizard:

1. Enter name

2. Select number of wheels

3. Select vehicle type

4. Select specific model

5. Choose date range

6. Review & submit booking

## Notes

Backend validates all inputs

Overlapping bookings for the same vehicle are not allowed



