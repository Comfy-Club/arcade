# Comfy TypeScript Arcade

Currently only focusing on a minesweeper game with multiplayer capabilities and infrastructure to (feature creep out of existance) expand.

## Start

### Backend:

-   TypeScript
-   Express
-   WebSockets (ws)

#### Start:

```bash
cd backend && docker-compose up
```

If you don't have docker, setup a postgres database on port 5432 and database named comfy-backend. After that, run:
```bash
cd backend && npm start
```

### Frontend:

-   TypeScript
-   Svelte

#### Start:

```bash
cd frontend
npm install
npm run dev
```

## Todo

-   Turn individual game to git submodules
-   User Interface
-   Sessions
-   Handling player data
-   Lobbies and games
-   Linking lobbies and games with the actual games
-   Refactor and clean up code to a presentable and collaboration enabling standard
-   Make infrastructure easy for others to develop for
-   Ensure clean and working deployment/building
