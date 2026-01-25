"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Atomium } from "./Atomium";
import { Vector3 } from "three";
import { Environment } from "@react-three/drei";

import { SamClassic } from "./SamClassic";
import { SamCool } from "./SamCool";
import { SamBusiness } from "./SamBusiness";
import { SamScientist } from "./SamScientist";
import { SamMusician } from "./SamMusician";
import { SamProject } from "./SamProject";
import { AuroraCurtains } from "./AuroraCurtains";

type SceneProps = {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  isHome: boolean;
  isBio: boolean;
  isResearch: boolean;
  isEducation: boolean;
  isMusic: boolean;
  isProjects: boolean;
};

export default function Scene(props: SceneProps) {
  const {
    cameraPosition,
    cameraTarget,
    isHome,
    isBio,
    isResearch,
    isEducation,
    isProjects,
  } = props;

  return (
    <Canvas
      shadows
      gl={{ logarithmicDepthBuffer: true }}
      camera={{
        fov: 50,
        near: 0.1,
        far: 5000,
        position: cameraPosition,
      }}
      style={{ background: "#020617" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 6, 0]} intensity={0.4} />

      <Environment files="/hdr/aurora.jpg" background={false} blur={0.15} />

      <AuroraCurtains />

      {/* Smooth camera */}
      <AnimatedCamera target={cameraPosition} lookAt={cameraTarget} />

      {/* Models */}
      <Suspense fallback={null}>
        <Atomium />
        <SamClassic visible={isHome} />
        <SamCool visible={isBio} /> {/* Only show on bio page */}
        <SamScientist visible={isResearch} />
        <SamBusiness visible={isEducation} />
        <SamMusician />
        <SamProject visible={isProjects} />
      </Suspense>
    </Canvas>
  );
}

function AnimatedCamera({
  target,
  lookAt,
}: {
  target: [number, number, number];
  lookAt: [number, number, number];
}) {
  const currentPosition = useRef(new Vector3(...target));
  const currentLookAt = useRef(new Vector3(...lookAt));

  const desiredPosition = new Vector3(...target);
  const desiredLookAt = new Vector3(...lookAt);

  useFrame(({ camera }) => {
    // Smoothly interpolate position
    currentPosition.current.lerp(desiredPosition, 0.05);
    camera.position.copy(currentPosition.current);

    // Smoothly interpolate lookAt
    currentLookAt.current.lerp(desiredLookAt, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
