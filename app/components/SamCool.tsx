"use client";

import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type SamCoolProps = ThreeElements["group"] & {
  visible?: boolean;
  posX?: number;
  posY?: number;
  posZ?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  scale?: number;
};

export function SamCool({
  visible = true,
  posX = 0.65,
  posY = 0,
  posZ = 0.7,
  rotX = 0,
  rotY = -Math.PI / 6,
  rotZ = 0,
  scale = 0.6,
  ...props
}: SamCoolProps) {
  const group = useRef<THREE.Group>(null);
  const hasMounted = useRef(false);

  const { scene } = useGLTF("/models/sam-cool.glb");
  const fbx = useFBX("/animation/LeaningWall.fbx");
  const { actions } = useAnimations(fbx.animations, group);

  /* ---------------- animation ---------------- */

  useEffect(() => {
    if (!group.current) return;

    const targetScale = visible ? scale : 0;
    const startScale = group.current.scale.x;

    // ⛔ Skip animation on first mount
    if (!hasMounted.current) {
      group.current.scale.set(
        visible ? scale : 0,
        visible ? scale : 0,
        visible ? scale : 0
      );
      hasMounted.current = true;
      return;
    }

    let t = 0;
    const duration = 0.7;

    const animate = () => {
      t += 0.016;
      const alpha = Math.min(t / duration, 1);
      const eased = THREE.MathUtils.smoothstep(alpha, 0, 1);
      const s = THREE.MathUtils.lerp(startScale, targetScale, eased);
      group.current!.scale.set(s, s, s);

      if (alpha < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [visible, scale]);

  /* ---------------- setup ---------------- */

  useEffect(() => {
    if (!group.current || !actions) return;

    const action = Object.values(actions)[0];
    if (!action) return;

    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();

    scene.traverse((obj) => {
      if ((obj as THREE.SkinnedMesh).isSkinnedMesh) {
        obj.frustumCulled = false;
      }
    });

    group.current.position.set(posX, posY, posZ);
    group.current.rotation.set(rotX, rotY, rotZ);
    scene.position.set(0, 0, 0);

    const onVisibilityChange = () => {
      action.paused = document.hidden;
    };

    action.paused = document.hidden;
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [actions, scene, posX, posY, posZ, rotX, rotY, rotZ]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/sam-cool.glb");
