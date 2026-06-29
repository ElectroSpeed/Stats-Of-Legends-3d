"use client";

import { useGLTF } from "@react-three/drei";

/**
 * Chargeur GLTF avec décodeur Draco + KTX2 servis localement.
 * useGLTF gère GLTFLoader/DRACOLoader sous le capot.
 */
export default function GLTFModelLoader({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

useGLTF.setDecoderPath?.("/draco/");
