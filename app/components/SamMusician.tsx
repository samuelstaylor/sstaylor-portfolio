"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamMusicianProps = ThreeElements["group"];

export function SamMusician(props: SamMusicianProps) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/sam-musician.glb");
  const fbx = useFBX("/animation/PianoPlaying.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    // Align feet with ground
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

useGLTF.preload("/models/sam-musician.glb");
