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
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  scale?: number;
};

export function SamClassic({
  visible = true,
  posX = 0,
  posY = 1.98,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 0.2,
  ...props
}: SamClassicProps) {
  const group = useRef<THREE.Group>(null);

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

    // prevent animated mesh clipping
    scene.traverse((obj) => {
      if ((obj as THREE.SkinnedMesh).isSkinnedMesh) {
        obj.frustumCulled = false;
      }
    });

    // Apply manual transforms
    group.current.position.set(posX, posY, posZ);
    group.current.rotation.set(rotX, rotY, rotZ);
    group.current.scale.set(scale, scale, scale);

    // Reset the internal scene position
    scene.position.set(0, 0, 0);
  }, [actions, scene, posX, posY, posZ, rotX, rotY, rotZ, scale]);

  return (
    <group ref={group} visible={visible} {...props}>
      <primitive object={scene} />
    </group>
  );
}

// Preload model
useGLTF.preload("/models/sam-classic.glb");
