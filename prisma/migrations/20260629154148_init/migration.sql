-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "QueueType" AS ENUM ('RANKED_SOLO_5x5', 'RANKED_FLEX_SR');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Summoner" (
    "puuid" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "summonerLevel" INTEGER NOT NULL,
    "revisionDate" BIGINT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "lastMatchFetch" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("puuid")
);

-- CreateTable
CREATE TABLE "SummonerRank" (
    "id" TEXT NOT NULL,
    "summonerPuuid" TEXT NOT NULL,
    "queueType" "QueueType" NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "rankValue" BIGINT NOT NULL DEFAULT 0,
    "legendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummonerRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "gameCreation" TIMESTAMP(3) NOT NULL,
    "gameDuration" INTEGER NOT NULL,
    "gameMode" TEXT NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "patch" TEXT NOT NULL,
    "averageTier" TEXT,
    "jsonData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummonerMatch" (
    "summonerPuuid" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "championId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UNKNOWN',
    "win" BOOLEAN NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "totalDamageToChampions" INTEGER NOT NULL DEFAULT 0,
    "totalMinionsKilled" INTEGER NOT NULL DEFAULT 0,
    "goldEarned" INTEGER NOT NULL DEFAULT 0,
    "visionScore" INTEGER NOT NULL DEFAULT 0,
    "items" JSONB,
    "legendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gameCreation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummonerMatch_pkey" PRIMARY KEY ("summonerPuuid","matchId")
);

-- CreateTable
CREATE TABLE "ChampionStat" (
    "id" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "tier" TEXT NOT NULL,
    "patch" TEXT NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "bans" INTEGER NOT NULL DEFAULT 0,
    "pickRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "winRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "banRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalKills" INTEGER NOT NULL DEFAULT 0,
    "totalDeaths" INTEGER NOT NULL DEFAULT 0,
    "totalAssists" INTEGER NOT NULL DEFAULT 0,
    "totalDamage" INTEGER NOT NULL DEFAULT 0,
    "totalGold" INTEGER NOT NULL DEFAULT 0,
    "totalCs" INTEGER NOT NULL DEFAULT 0,
    "totalDuration" INTEGER NOT NULL DEFAULT 0,
    "items" JSONB,
    "runes" JSONB,
    "spells" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScannedMatch" (
    "id" TEXT NOT NULL,
    "patch" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScannedMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Summoner_region_idx" ON "Summoner"("region");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_gameName_tagLine_region_key" ON "Summoner"("gameName", "tagLine", "region");

-- CreateIndex
CREATE INDEX "SummonerRank_queueType_rankValue_idx" ON "SummonerRank"("queueType", "rankValue");

-- CreateIndex
CREATE INDEX "SummonerRank_summonerPuuid_idx" ON "SummonerRank"("summonerPuuid");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerRank_summonerPuuid_queueType_key" ON "SummonerRank"("summonerPuuid", "queueType");

-- CreateIndex
CREATE INDEX "Match_patch_idx" ON "Match"("patch");

-- CreateIndex
CREATE INDEX "Match_region_gameCreation_idx" ON "Match"("region", "gameCreation");

-- CreateIndex
CREATE INDEX "SummonerMatch_summonerPuuid_gameCreation_idx" ON "SummonerMatch"("summonerPuuid", "gameCreation");

-- CreateIndex
CREATE INDEX "SummonerMatch_matchId_idx" ON "SummonerMatch"("matchId");

-- CreateIndex
CREATE INDEX "SummonerMatch_championId_idx" ON "SummonerMatch"("championId");

-- CreateIndex
CREATE INDEX "ChampionStat_role_tier_patch_idx" ON "ChampionStat"("role", "tier", "patch");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionStat_championId_role_tier_patch_key" ON "ChampionStat"("championId", "role", "tier", "patch");

-- CreateIndex
CREATE INDEX "ScannedMatch_patch_idx" ON "ScannedMatch"("patch");

-- CreateIndex
CREATE INDEX "Job_status_priority_idx" ON "Job"("status", "priority");

-- AddForeignKey
ALTER TABLE "SummonerRank" ADD CONSTRAINT "SummonerRank_summonerPuuid_fkey" FOREIGN KEY ("summonerPuuid") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummonerMatch" ADD CONSTRAINT "SummonerMatch_summonerPuuid_fkey" FOREIGN KEY ("summonerPuuid") REFERENCES "Summoner"("puuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SummonerMatch" ADD CONSTRAINT "SummonerMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
