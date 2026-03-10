# AI Coding Quest

A full-stack web app where users solve coding challenges and receive layered AI mentorship hints instead of direct answers.

## Stack
- **Frontend:** React + Tailwind + React Router (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB via Mongoose (with in-memory fallback if `MONGO_URI` is missing)
- **AI:** OpenAI API (`OPENAI_API_KEY`) with fallback hint engine

## Core Features
- Challenge list with difficulty (Easy/Medium/Hard) and XP values.
- Code editor page with JavaScript code execution against hidden test cases.
- AI mentor hints:
  - Conceptual hint
  - Debugging suggestion
  - Improvement tip
- XP progression dashboard + completion progress bar.
- Leaderboard based on solved challenge XP.

## Run locally
```bash
npm install
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`

## Environment variables
Create `backend/.env` if needed:
```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/ai-coding-quest
OPENAI_API_KEY=your_openai_key
```

If `MONGO_URI` is not provided, app runs in in-memory mode and still works for demo/testing.
