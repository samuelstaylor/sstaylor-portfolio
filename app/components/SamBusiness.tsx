"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamBusinessProps = ThreeElements["group"];

export function SamBusiness(props: SamBusinessProps) {
  const group = useRef<THREE.Group>(null);

  // Model
  const { scene } = useGLTF("/models/sam-business.glb");

  // Talking animation
  const fbx = useFBX("/animation/Talking.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!actions) return;

    /* ------------------------------
       FLOOR ALIGNMENT FIX
    --------------------------------*/
    const box = new THREE.Box3().setFromObject(scene);
    scene.position.y -= box.min.y;

    /* ------------------------------
       PLAY TALKING LOOP
    --------------------------------*/
    const talk = Object.values(actions)[0];
    if (talk) {
      talk.reset();
      talk.setLoop(THREE.LoopRepeat, Infinity);
      talk.clampWhenFinished = true;
      talk.play();
    }
  }, [actions, scene]);

  return (
    <group
      ref={group}
      position={[1.2, 0, 0]}
      rotation={[0, -0.25, 0]}
      scale={1}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-business.glb");
