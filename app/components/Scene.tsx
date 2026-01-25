"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Vector3, Quaternion } from "three";
import { Environment } from "@react-three/drei";

import { Atomium } from "./Atomium";
import { SamClassic } from "./SamClassic";
import { SamBusiness } from "./SamBusiness";
import { SamScientist } from "./SamScientist";
import { SamMusician } from "./SamMusician";
import { SamProject } from "./SamProject";
import { AuroraCurtains } from "./AuroraCurtains";

type SceneProps = {
  cameraPosition: [number, number, number];
  cameraLocalOffset?: [number, number, number]; // [right, up, forward]
  isHome: boolean;
  isResearch: boolean;
  isEducation: boolean;
  isMusic: boolean;
  isProjects: boolean;
};

export default function Scene(props: SceneProps) {
  const {
    cameraPosition,
    cameraLocalOffset = [0, 0, 0],
    isHome,
    isResearch,
    isEducation,
    isProjects,
  } = props;

  return (
    <Canvas
      shadows
      gl={{ logarithmicDepthBuffer: true }}
      camera={{ fov: 50, near: 0.1, far: 5000 }}
      style={{ background: "#020617" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight castShadow position={[5, 10, 5]} intensity={1.3} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 6, 0]} intensity={0.4} />

      <Environment files="/hdr/aurora.jpg" background={false} blur={0.15} />
      <AuroraCurtains />

      <AnimatedCamera
        basePosition={cameraPosition}
        localOffset={cameraLocalOffset}
      />

      <Suspense fallback={null}>
        <Atomium />
        <SamClassic visible={isHome} />
        <SamScientist visible={isResearch} />
        <SamBusiness visible={isEducation} />
        <SamMusician />
        <SamProject visible={isProjects} />
      </Suspense>
    </Canvas>
  );
}

function AnimatedCamera({
  basePosition,
  localOffset,
}: {
  basePosition: [number, number, number];
  localOffset: [number, number, number];
}) {
  const base = useRef(new Vector3());
  const finalPos = useRef(new Vector3());

  const lockedQuat = useRef(new Quaternion());
  const orientationLocked = useRef(false);

  const right = useRef(new Vector3());
  const up = useRef(new Vector3());
  const forward = useRef(new Vector3());

  useEffect(() => {
    base.current.set(...basePosition);
    orientationLocked.current = false; // 🔑 full reset on route change
  }, [basePosition]);

  useFrame(({ camera }) => {
    // 1️⃣ Always move toward canonical base position
    camera.position.lerp(base.current, 0.1);

    // 2️⃣ Once close enough, establish canonical orientation
    if (!orientationLocked.current) {
      if (camera.position.distanceTo(base.current) < 0.02) {
        camera.lookAt(0, 1, 0); // 🎯 canonical focus
        lockedQuat.current.copy(camera.quaternion);

        // Cache camera local axes
        right.current.set(1, 0, 0).applyQuaternion(camera.quaternion);
        up.current.set(0, 1, 0).applyQuaternion(camera.quaternion);
        forward.current.set(0, 0, -1).applyQuaternion(camera.quaternion);

        orientationLocked.current = true;
      }
      return;
    }

    // 3️⃣ Reapply locked orientation (NO re-aiming)
    camera.quaternion.copy(lockedQuat.current);

    // 4️⃣ Apply local-space offset from BASE pose
    finalPos.current
      .copy(base.current)
      .addScaledVector(right.current, localOffset[0])
      .addScaledVector(up.current, localOffset[1])
      .addScaledVector(forward.current, localOffset[2]);

    camera.position.lerp(finalPos.current, 0.15);
  });

  return null;
}
