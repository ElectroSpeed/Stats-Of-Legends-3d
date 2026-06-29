# Stats Of Legends

Plateforme web dédiée à **League of Legends** : statistiques d'invocateurs (style OP.GG),
historiques de parties, leaderboards et tier list des champions. Cette version (v1) est
**non-3D et fonctionnelle** ; les modules 3D (carte de Runeterra, builder/theorycraft)
viendront enrichir cette base.

## Stack

| Couche          | Techno                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 15 (App Router) + TypeScript                         |
| Styling         | **SCSS Modules** + design tokens (architecture 7-1)          |
| Données client  | TanStack React Query                                         |
| État (3D futur) | Zustand                                                      |
| Base de données | PostgreSQL via **Prisma**                                    |
| Cache           | Redis (ioredis) — cache-aside resilient                      |
| Données de jeu  | Riot API (Account-V1, Summoner-V4, League-V4, Match-V5) + Data Dragon |
| Validation      | zod                                                          |
| 3D (à venir)    | Three.js / React Three Fiber + Drei                          |

## Fonctionnalités (v1)

- **Recherche + profil** d'invocateur (rang Solo/Flex, niveau, win rate).
- **Historique de parties** (KDA, CS, vision, items, *Legend Score*).
- **Leaderboard** par région/queue.
- **Tier list** des champions (win/pick/ban rate, grade S→D).

## Architecture (résumé)

```
src/
├── app/                # App Router : pages + routes API (BFF)
│   ├── api/            # summoner, matches, leaderboard, champions, health
│   ├── summoner/…      # profil (SSR)
│   ├── leaderboard/…   # classement (SSR)
│   └── champions/      # tier list (React Query)
├── services/           # Riot API + Data Dragon (server-only)
├── repositories/       # cache-aside : Redis → PostgreSQL → Riot
├── lib/                # env, db, cache, regions, validation, legendScore, security
├── components/         # ui, layout, search, summoner, leaderboard, champions, three (futur)
├── hooks/              # React Query
└── styles/             # SCSS Modules + abstracts (tokens/mixins/functions)
```

Le flux de données privilégie le **cache-aside** : une requête lit d'abord Redis, sinon
PostgreSQL (cache chaud), sinon l'API Riot — ce qui absorbe les rate limits et garde
le site rapide.

## Sécurité

- Clé Riot **server-only**, validée au démarrage (`src/lib/env.ts`).
- En-têtes durcis : CSP, HSTS, X-Frame-Options, nosniff… (`src/lib/security/headers.ts`).
- **Rate limiting** par IP (Redis) sur toutes les routes API.
- Validation **zod** de toutes les entrées.
- Voir [`SECURITY.md`](./SECURITY.md).

## CI/CD

- `CI` : lint, typecheck, tests (vitest), `prisma validate`, build — avec services
  PostgreSQL + Redis (`.github/workflows/ci.yml`).
- `CodeQL` : analyse de sécurité (`security-and-quality`).
- `Dependabot` : mises à jour hebdomadaires (npm + actions).

## Démarrage

```bash
cp .env.example .env.local        # RIOT_API_KEY, DATABASE_URL, REDIS_URL
docker compose up -d              # PostgreSQL + Redis (optionnel)
npm install
npx prisma migrate dev            # crée le schéma
npx prisma db seed                # données de démo (optionnel)
npm run dev                       # http://localhost:3000
```

> Note : leaderboard et tier list s'alimentent via des jobs d'agrégation
> (à brancher) ; la recherche d'invocateur et l'historique fonctionnent en direct
> dès qu'une clé Riot valide est fournie.

## Scripts

| Commande              | Rôle                                  |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Serveur de dev                        |
| `npm run build`       | `prisma generate` + build prod        |
| `npm run lint`        | ESLint (next)                         |
| `npm run typecheck`   | `tsc --noEmit`                        |
| `npm test`            | Vitest                                |
| `npm run db:migrate`  | Migration Prisma                      |
| `npm run db:studio`   | Prisma Studio                         |

## Documentation

Documents de conception dans [`docs/`](./docs) (SFD, ST, DAM).

## Licence

MIT — voir [LICENSE](./LICENSE). Non affilié à Riot Games. League of Legends © Riot Games, Inc.
