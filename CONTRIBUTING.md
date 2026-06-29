# Contribuer

## Prérequis

- Node 20+
- PostgreSQL 16+ et Redis 7+ en local (ou via Docker)
- Une clé API Riot (https://developer.riotgames.com)

## Installation

```bash
cp .env.example .env.local   # renseigner RIOT_API_KEY, DATABASE_URL, REDIS_URL
npm install
npx prisma migrate dev       # crée le schéma
npm run dev
```

## Conventions

- **Commits** : Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`...).
- **Branches** : `feat/...`, `fix/...` ; PR vers `main`.
- **Qualité** : `npm run lint && npm run typecheck && npm test` avant de pousser.
- **Style** : SCSS Modules + tokens (`src/styles/abstracts`) — pas de valeurs en dur.
