"use client";

import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

interface AtomiumProps {
  position?: [number, number, number];
  scale?: number;
}

export function Atomium({ position = [0, 0, 0], scale = 1 }: AtomiumProps) {
  const { scene } = useGLTF("/models/atomium.glb");
  return <primitive object={scene} position={position} scale={scale} />;
}

useGLTF.preload("/models/atomium.glb");
