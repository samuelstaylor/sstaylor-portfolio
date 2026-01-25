"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
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
  rotY = -Math.PI / 6,
  rotZ = 0,
  scale = 0.3,
  ...props
}: SamClassicProps) {
  const group = useRef<THREE.Group>(null);
  const hasMounted = useRef(false);

  const { scene } = useGLTF("/models/sam-classic.glb");
  const fbx = useFBX("/animation/Waving.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  // Animation + initial transform setup
  useEffect(() => {
    if (!group.current || !actions) return;

    const action = Object.values(actions)[0];
    if (!action) return;

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();

    // Disable frustum culling for skinned meshes
    scene.traverse((obj) => {
      if ((obj as THREE.SkinnedMesh).isSkinnedMesh) {
        obj.frustumCulled = false;
      }
    });

    // Initial transform
    group.current.position.set(posX, posY, posZ);
    group.current.rotation.set(rotX, rotY, rotZ);
    scene.position.set(0, 0, 0);

    // ✅ Snap initial scale (prevents big → small on load)
    group.current.scale.set(scale, scale, scale);
    hasMounted.current = true;

    const onVisibilityChange = () => {
      action.paused = document.hidden;
    };
    action.paused = document.hidden;

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [actions, scene, posX, posY, posZ, rotX, rotY, rotZ, scale]);

  // Smooth scale transitions on visibility change
  useFrame(() => {
    if (!group.current || !hasMounted.current) return;

    const targetScale = visible ? scale : 0;
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-classic.glb");
