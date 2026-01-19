"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamBusinessProps = ThreeElements["group"] & {
  visible?: boolean;
  posX?: number;
  posY?: number;
  posZ?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  scale?: number;
};

export function SamBusiness({
  visible = true,
  posX = 1,
  posY = 0,
  posZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scale = 1,
  ...props
}: SamBusinessProps) {
  const group = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const { scene } = useGLTF("/models/sam-business.glb");
  const fbx = useFBX("/animation/Talking.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  useEffect(() => {
    if (!group.current || !actions) return;

    const action = Object.values(actions)[0];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      mixerRef.current = actions[
        action.getClip().name
      ].getMixer() as THREE.AnimationMixer;
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

useGLTF.preload("/models/sam-business.glb");
