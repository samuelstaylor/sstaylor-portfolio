"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamClassicProps = ThreeElements["group"];

export function SamClassic(props: SamClassicProps) {
  const group = useRef<THREE.Group>(null);

  // Model
  const { scene } = useGLTF("/models/sam-classic.glb");

  // Animation
  const fbx = useFBX("/animation/Waving.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    /* ------------------------------
       1. FIX FLOOR CLIPPING
    --------------------------------*/
    const box = new THREE.Box3().setFromObject(scene);
    const minY = box.min.y;

    // Lift model so feet sit exactly on ground (y = 0)
    scene.position.y -= minY;

    /* ------------------------------
       2. PLAY ANIMATION IMMEDIATELY
    --------------------------------*/
    const wave = Object.values(actions)[0];
    if (wave) {
      wave.reset();
      wave.clampWhenFinished = true;
      wave.setLoop(THREE.LoopRepeat, Infinity);
      wave.play();
    }
  }, [actions, scene]);

  return (
    <group
      ref={group}
      position={[1.2, 0, 0]}
      rotation={[0, -0.3, 0]}
      scale={1}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
