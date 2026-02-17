# TikTok Login

A TikTok-style login page built with React, TypeScript, Vite, and Tailwind CSS. Credentials are stored locally on the server.

## Run the project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server (stores credentials in `server/data/credentials.json`):
   ```bash
   npm run server
   ```

3. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 and use the login form.

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run server` – Start Express server (port 3000)
- `npm run build` – Production build
- `npm run preview` – Preview production build
