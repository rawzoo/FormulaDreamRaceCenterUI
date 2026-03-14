# FormulaDream Race Center UI

Standalone frontend for the FormulaDream Race Center experience, intended for deployment on Vercel.

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
```

## Security choices

- No credentials are bundled in the app.
- User password is never persisted.
- Access tokens are stored only in `sessionStorage`, not `localStorage`.
- Non-sensitive UI preferences use `localStorage`.
- Vercel security headers are set in [vercel.json](/Users/rajukumar/FormulaDreamRaceCenterUI/vercel.json).

## Backend requirements

- The backend must allow CORS from the Vercel domain.
- The backend should keep auth on `https` only.
- The frontend expects these backend APIs:
  - `/api/v1/users/login`
  - `/api/v1/bot/login`
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
4. Deploy.
