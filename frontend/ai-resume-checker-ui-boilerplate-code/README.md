# Frontend — AI Resume Checker (React + Vite)

This folder contains the Vite + React frontend for AI Resume Checker. It ships with a minimal development setup, Tailwind styling, and an API client preconfigured to talk to the backend.

Quick overview

- Source: `src/`
- Main entry: `src/main.jsx`
- API client: `src/api/client.js` (reads `VITE_API_URL`)
- Dev server: Vite HMR

Requirements

- Node.js 18+ and npm or yarn

Local development

1. Install dependencies:

```bash
cd frontend/ai-resume-checker-ui-boilerplate-code
npm install
```

2. Create a local env file (optional) to point the frontend at your backend. Vite reads variables prefixed with `VITE_` from `.env` files.

Create `.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

3. Start the dev server:

```bash
npm run dev
```

Open the app at the address printed by Vite (typically `http://localhost:5173`).

Scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build production assets into `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint on the project

API configuration

- The API client default base URL is `http://localhost:8000/api`. To override it in development or production, set `VITE_API_URL` in your environment (see `src/api/client.js`).

Build & deploy

- Build:

```bash
npm run build
```

- The production-ready static files will be in `dist/` and can be served by any static hosting (Vercel, Netlify, etc.). This repository includes a Vercel config at `vercel.json` in the frontend folder for streamlined deployment.

Environment variables for CI/CD / hosting

- On Vercel or Netlify set `VITE_API_URL` to your deployed backend API endpoint (e.g., `https://api.example.com/api`).

Testing & linting

- Lint the frontend:

```bash
npm run lint
```

Troubleshooting

- CORS: ensure the backend `CLIENT_ORIGIN` includes the frontend origin when running in the browser.
- Auth issues: the frontend sends requests with credentials (`withCredentials: true`) — ensure backend CORS and cookie settings allow this.

Customizing

- Tailwind: update `tailwind.config.js` and `src/index.css` to change styles.
- Add or modify routes in `src/routes.jsx` and page components in `src/pages/`.

Further reading

- API client: `src/api/client.js`
- Backend env reference: see project root `README.md` and `backend/src/config/env.js`

Contributing

- Follow the repository CONTRIBUTING guidelines. Open issues and PRs against the monorepo root.

License

- See repository `LICENSE` at the project root.
