"use client";

import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function SamClassic(props: GroupProps) {
  const { scene } = useGLTF("/models/sam-classic.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/sam-classic.glb");
