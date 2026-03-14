# FormulaDream Race Center UI

Standalone frontend for the FormulaDream F1 Race Center experience, intended for deployment on Vercel.

## Stack

- Vite
- Vanilla JavaScript
- Static deploy on Vercel

## Local development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
VITE_API_BASE_URL=https://dev.formuladream.app/gaming-service
VITE_DEFAULT_SEASON=2025
BACKEND_API_BASE_URL=https://dev.formuladream.app/gaming-service
```

## Security choices

- No credentials are bundled in the app.
- User password is never persisted.
- Access tokens are stored only in `sessionStorage`, not `localStorage`.
- Non-sensitive UI preferences use `localStorage`.
- Backend base URL is env-driven, not user-editable in the page.
- Vercel security headers are set in [vercel.json](/Users/rajukumar/FormulaDreamRaceCenterUI/vercel.json).

## Backend requirements

- Browser traffic goes through the built-in Vercel proxy at `/api/proxy?path=...`, so backend CORS is not required for the deployed UI.
- The backend should keep auth on `https` only.
- The frontend expects these backend APIs:
  - `/api/v1/users/login`
  - `/api/v1/race-center/current`
  - `/api/v1/race-center/current/stream`
  - `/api/v1/race-center/drivers`
  - `/api/v1/race-center/teams`
  - `/api/v1/race-center/calendar`
  - `/api/v1/race-center/races`
  - `/api/v1/race-center/circuits`
  - `/api/v1/race-center/standings/drivers`
  - `/api/v1/race-center/standings/constructors`

## Deploy to Vercel

1. Import this repo into Vercel.
2. Set the root directory to this repo root.
3. Add:
   - `VITE_API_BASE_URL`
   - `VITE_DEFAULT_SEASON`
   - `BACKEND_API_BASE_URL`
4. Deploy.
