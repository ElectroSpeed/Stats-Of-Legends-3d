# Politique de sécurité

## Signaler une vulnérabilité

Merci de **ne pas** ouvrir d'issue publique pour une faille de sécurité.
Contacte-nous en privé (Security Advisories GitHub) avec les détails et un PoC
si possible. Réponse visée sous 72 h.

## Pratiques en place

- **Secrets** : `RIOT_API_KEY` est strictement server-only (jamais `NEXT_PUBLIC_`),
  validée au démarrage (`src/lib/env.ts`). Les `.env*` sont git-ignorés.
- **En-têtes** : CSP stricte, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy
  (`src/lib/security/headers.ts`).
- **Rate limiting** : par IP via Redis sur toutes les routes API
  (`src/lib/security/rateLimit.ts`).
- **Validation** : toutes les entrées (params/query) sont validées via zod
  (`src/lib/validation.ts`).
- **Origines** : le middleware rejette les requêtes mutantes cross-origin non
  autorisées (`ALLOWED_ORIGINS`).
- **Dépendances** : Dependabot + CodeQL (security-and-quality) hebdomadaires.
- **Surface** : `poweredByHeader` désactivé ; pas de données brutes Riot exposées
  au client (DTO filtrés en modèles de domaine).

## Conformité Riot

Le projet respecte les conditions d'utilisation de l'API Riot : appels
server-side, mise en cache raisonnable, rate limits respectés, et mention
"non affilié à Riot Games".
