"use client";

import { useGLTF } from "@react-three/drei";

export function Atomium() {
  const { scene } = useGLTF("/models/atomium.glb");

  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

useGLTF.preload("/models/atomium.glb");
