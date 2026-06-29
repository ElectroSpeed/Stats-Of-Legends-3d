import "server-only";
import { z } from "zod";

// Valide la config au boot : échoue vite et clairement si une variable manque.
const schema = z.object({
  RIOT_API_KEY: z.string().min(10, "RIOT_API_KEY manquante ou invalide"),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  ALLOWED_ORIGINS: z.string().optional().default(""),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Variables d'environnement invalides:", parsed.error.flatten().fieldErrors);
  throw new Error("Configuration d'environnement invalide");
}

export const env = parsed.data;
