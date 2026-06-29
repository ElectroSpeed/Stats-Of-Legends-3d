import "server-only";
import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

/**
 * Client Redis "best-effort" : si aucun serveur n'est disponible, les commandes
 * échouent vite et le cache dégrade proprement (voir lib/cache `cached`).
 * Redis est donc OPTIONNEL en dev — recommandé en prod.
 */
export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    maxRetriesPerRequest: 1,
    lazyConnect: true, // ne se connecte qu'à la 1re commande
    enableOfflineQueue: false, // échoue tout de suite si déconnecté
    retryStrategy: (times) => (times > 3 ? null : 200), // stoppe les retries en boucle
  });

// Avale les erreurs de connexion (le cache est non-bloquant).
redis.on("error", () => {});

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
