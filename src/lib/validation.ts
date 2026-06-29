import { z } from "zod";
import { PLATFORMS } from "./regions";

export const platformSchema = z.enum(PLATFORMS);

export const riotIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[\p{L}\p{N} ._-]+#?[\p{L}\p{N}]*$/u, "Riot ID invalide");

export const queueSchema = z
  .enum(["RANKED_SOLO_5x5", "RANKED_FLEX_SR"])
  .default("RANKED_SOLO_5x5");

export const pageSchema = z.coerce.number().int().min(0).max(50).default(0);

export const roleSchema = z
  .enum(["TOP", "JUNGLE", "MID", "ADC", "SUPPORT", "ALL"])
  .default("ALL");
