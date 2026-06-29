import { useGLTF } from "@react-three/drei";

/** Précharge les modèles critiques pour éviter les temps de chargement perçus. */
export function preloadModels(urls: string[]): void {
  urls.forEach((url) => useGLTF.preload(url));
}
