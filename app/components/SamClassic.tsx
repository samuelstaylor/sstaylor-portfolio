"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { Group } from "three";

type SamClassicProps = ThreeElements["group"];

export function SamClassic(props: SamClassicProps) {
  const group = useRef<Group>(null);

  // Load the mesh
  const { scene } = useGLTF("/models/sam-classic.glb");

  // Load the Mixamo waving animation
  const fbx = useFBX("/animation/Waving.fbx");

  // Hook to play animation
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!actions) return;

    // Play the first animation (Mixamo waving)
    const wave = Object.values(actions)[0];
    wave?.reset().fadeIn(0.5).play();

    return () => {
      wave?.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group ref={group} {...props} position={[1.2, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
