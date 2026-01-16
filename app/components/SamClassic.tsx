"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamClassicProps = ThreeElements["group"];

export function SamClassic(props: SamClassicProps) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/sam-classic.glb");
  const fbx = useFBX("/animation/Waving.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    // Fix ground clipping
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
    // [x,y,z] x right/left (closer to camera), y up/down, z forward/backward
    <group
      ref={group}
      position={[0, 3.1, 0]}
      scale={0.2} //{0.2}
      rotation={[0, 0, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
