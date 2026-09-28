# GYM3

Modern gym landing page and lead generation website built with React + Vite on the frontend and Express on the backend.

This project includes a premium dark-theme design, animated hero section, fitness program cards, membership pricing, trainer highlights, and a working trial-class contact form.

## Features

- Premium dark UI with gym-inspired branding
- Interactive 3D hero section using Three.js and react-three-fiber
- Animated headline and scroll-based motion effects
- Program, stats, trainer, and membership sections
- Contact form backend for trial-class inquiries
- Responsive layout for desktop and mobile screens

## Tech Stack

- Frontend: React, Vite, CSS
- 3D/Animation: Three.js, @react-three/fiber, Framer Motion, GSAP
- Backend: Node.js, Express

## Project Structure

```bash
gym-website/
├── backend/
│   ├── routes/
│   │   └── contact.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
└── package-lock.json
```

## Installation

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/gym3.git
cd gym3
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

### 3) Install backend dependencies

```bash
cd ../backend
npm install
```

## Run Locally

Open two terminals.

### Start backend

```bash
cd backend
npm run dev
```

Backend runs on:

```bash
http://localhost:4000
```

### Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

The frontend is configured to proxy API requests to the backend through Vite.

## Contact Form API

The backend exposes:

- POST `/api/contact` — submits a trial-class request
- GET `/api/contact` — lists submitted entries
- GET `/api/health` — health check endpoint

## Notes

- The current contact submissions are stored in memory.
- For production, replace the in-memory array with a real database or external service.
- Add authentication before exposing admin endpoints publicly.

## License

This project is for educational and portfolio use.

## Author

Jyotiprakash
