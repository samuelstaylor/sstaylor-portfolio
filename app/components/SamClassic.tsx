"use client";

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type SamClassicProps = ThreeElements["group"];

export function SamClassic(props: SamClassicProps) {
  const { scene } = useGLTF("/models/sam-classic.glb");

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
