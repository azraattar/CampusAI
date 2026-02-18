# CampusAI

Simple local project combining a Python backend and a Vite + React frontend for campus AI features.

## Contents
- `backend/` — Python API and AI helpers (`main.py`, `ai-check.py`, `requirements.txt`)
- `frontend/` — Vite + React app (`package.json`, `src/`, `vite.config.js`)

## Prerequisites
- Python 3.8+ and pip
- Node.js 16+ and npm or yarn

## Quickstart

1) Backend (Python)

Open a terminal and run:

```powershell
cd CampusAI
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python backend\main.py
```

2) Frontend (React + Vite)

Open a separate terminal and run:

```powershell
cd CampusAI\frontend
npm install
npm run dev
```

The frontend dev server (Vite) will provide a local URL (usually http://localhost:5173). The backend server's URL and port are defined in `backend/main.py` — check that file for details.

## Project structure

```
CampusAI/
  backend/
    main.py
    ai-check.py
    requirements.txt
  frontend/
    package.json
    vite.config.js
    public/
    src/
      App.jsx
      main.jsx
      pages/
        Loginpage.jsx
        StudentDashboard.jsx
        AdminDashboard.jsx
```

