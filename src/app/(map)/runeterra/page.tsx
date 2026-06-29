"use client";

import dynamic from "next/dynamic";

// Le canvas 3D est strictement client-only et chargé paresseusement
// afin de ne jamais bloquer le rendu serveur des pages statistiques.
const SceneCanvas = dynamic(
  () => import("@/components/three/canvas/SceneCanvas"),
  { ssr: false },
);

export default function RuneterraPage() {
  return <SceneCanvas mode="map" />;
}
