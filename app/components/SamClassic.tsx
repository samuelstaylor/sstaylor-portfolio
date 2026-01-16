"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamClassicProps = ThreeElements["group"] & {
  visible?: boolean;
};

export function SamClassic({ visible = true, ...props }: SamClassicProps) {
  const group = useRef<THREE.Group>(null);

  const scale = 0.2;

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

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene);

    // Atomium top Y in Blender
    const atomiumTopY = 2;

    // Set group position so feet sit on top of Atomium
    group.current.position.y = atomiumTopY - box.min.y * scale;

    // Reset scene Y inside group
    scene.position.y = 0;
  }, [actions, scene, scale]);

  return (
    <group
      ref={group}
      visible={visible}
      position={[0, 0, 0]}
      scale={scale}
      rotation={[0, 0, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
