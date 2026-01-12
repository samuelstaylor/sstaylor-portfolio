"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamProjectProps = ThreeElements["group"];

export function SamProject(props: SamProjectProps) {
  const group = useRef<THREE.Group>(null);

  // Model
  const { scene } = useGLTF("/models/sam-project.glb");

  // Animation
  const fbx = useFBX("/animation/SittingIdle.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    // Align model to ground
    const box = new THREE.Box3().setFromObject(scene);
    scene.position.y -= box.min.y;

    const action = Object.values(actions)[0];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }
  }, [actions, scene]);

  return (
    <group
      ref={group}
      position={[1.2, 0, 0]}
      rotation={[0, -0.3, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-project.glb");
