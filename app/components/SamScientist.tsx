"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamScientistProps = ThreeElements["group"] & {
  visible?: boolean;
  posX?: number;
  posY?: number;
  posZ?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  scale?: number;
};

export function SamScientist({
  visible = true,
  posX = 0,
  posY = 1.48,
  posZ = 0.71,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 0.2,
  ...props
}: SamScientistProps) {
  const group = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const { scene } = useGLTF("/models/sam-scientist.glb");
  const fbx = useFBX("/animation/Research.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    const action = Object.values(actions)[0];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      mixerRef.current = action.getMixer();
    }

    scene.traverse((obj) => {
      if ((obj as THREE.SkinnedMesh).isSkinnedMesh) obj.frustumCulled = false;
    });

    group.current.position.set(posX, posY, posZ);
    group.current.rotation.set(rotX, rotY, rotZ);
    group.current.scale.set(scale, scale, scale);
    scene.position.set(0, 0, 0);

    const onVisibility = () => {
      if (mixerRef.current)
        mixerRef.current.timeScale =
          document.visibilityState === "visible" ? 1 : 0;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [actions, scene, posX, posY, posZ, rotX, rotY, rotZ, scale]);

  return (
    <group ref={group} visible={visible} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-scientist.glb");
