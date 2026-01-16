"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamClassicProps = ThreeElements["group"] & {
  visible?: boolean;
  posX?: number;
  posY?: number;
  posZ?: number;
};

export function SamClassic({
  visible = true,
  posX = 0,
  posY = 2,
  posZ = 0,
  ...props
}: SamClassicProps) {
  const group = useRef<THREE.Group>(null);

  const scale = 0.2;

  // Load model and animation
  const { scene } = useGLTF("/models/sam-classic.glb");
  const fbx = useFBX("/animation/Waving.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    // Play animation
    const action = Object.values(actions)[0];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }

    // Set position manually
    group.current.position.set(posX, posY, posZ);

    // Reset scene's internal position
    scene.position.set(0, 0, 0);
  }, [actions, scene, posX, posY, posZ]);

  return (
    <group
      ref={group}
      visible={visible}
      scale={scale}
      rotation={[0, 0, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
