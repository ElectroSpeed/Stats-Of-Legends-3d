"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./SceneCanvas.module.scss";

type Mode = "map" | "builder";

/** Racine WebGL partagée par la carte 3D et le builder. */
export default function SceneCanvas({ mode }: { mode: Mode }) {
  return (
    <div className={styles.stage}>
      <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <Suspense fallback={null}>
          {/* TODO: <ThreePointLighting /> + scène selon `mode` */}
          {mode === "map" ? null : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
