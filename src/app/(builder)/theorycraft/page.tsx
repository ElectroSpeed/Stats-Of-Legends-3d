"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () => import("@/components/three/canvas/SceneCanvas"),
  { ssr: false },
);

export default function TheorycraftPage() {
  return <SceneCanvas mode="builder" />;
}
