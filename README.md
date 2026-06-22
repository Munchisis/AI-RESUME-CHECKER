# AI Resume Checker

AI Resume Checker analyzes resumes, provides insights, and suggests improvements to increase ATS compatibility and hiring-readiness.

**Repository structure**

- **backend/**: Express API, analysis services, DB models.
- **frontend/**: Vite + React app (UI and client-side API wrappers).

**Tech stack**

- Node.js, Express, MongoDB
- React, Vite, Tailwind/CSS
- External AI services for analysis (see backend config)

**Quick start (local)**

Prerequisites:

- Node.js 18+ and npm/yarn
- MongoDB (local or cloud)

Backend

1. Install dependencies and start:

```bash
cd backend
npm install
# copy and populate env vars: see backend/src/config/env.js
npm run dev
```

Frontend

1. Install and start:

```bash
cd frontend/ai-resume-checker-ui-boilerplate-code
npm install
npm run dev
```

Environment variables

- See [backend/src/config/env.js](backend/src/config/env.js) for the canonical source of required variables. The key variables used by the backend are:
  - `MONGO_URI` (required): MongoDB connection string used by the app.
  - `JWT_SECRET` (required): Secret for signing JWTs.
  - `PORT` (optional): Server port (default: `8000`).
  - `NODE_ENV` (optional): `development` or `production`.
  - `JWT_EXPIRES_IN` (optional): Token lifetime (default: `7d`).
  - `COOKIE_NAME` (optional): Cookie name for auth (default: `arr_token`).
  - `CLIENT_ORIGIN` (optional): Comma-separated list of allowed client origins (defaults include `http://localhost:5173`).
  - `GEMINI_API_KEY` (optional): API key for the Gemini/AI service used for analysis.
  - `GEMINI_MODEL` (optional): Model id to use (default: `gemini-2.5-flash`).

Sample `.env` (backend)

```env
MONGO_URI=mongodb://localhost:27017/ai_resume_checker
JWT_SECRET=change_me_to_a_strong_secret
PORT=8000
NODE_ENV=development
JWT_EXPIRES_IN=7d
COOKIE_NAME=arr_token
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Notes

- The backend will exit on startup if a required env var is missing (`MONGO_URI`, `JWT_SECRET`).
- Set `CLIENT_ORIGIN` to the frontend origin(s) used in development or production, comma-separated.

Testing

- Backend and frontend may include project-specific scripts; run `npm test` in the relevant folder if available.

Deployment

- This project is structured to deploy the backend as a Node service and the frontend as a static site (Vercel, Netlify, or similar). See `frontend/ai-resume-checker-ui-boilerplate-code/vercel.json` for Vercel config.

API example

- Health check (after backend is running):

```bash
curl http://localhost:8000/api/health
```

Contributing

- Fork the repo, create a feature branch, and open a pull request with a clear description and any testing notes.

Contributing

- Fork the repo, create a feature branch, and open a pull request with a clear description and any testing notes.

License

- This repository includes an MIT license in `LICENSE`.

Questions

- For local issues, check logs from `backend` and the browser console for frontend errors. Reach out to the project maintainer for access or API key details.
