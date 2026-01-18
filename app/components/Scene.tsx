"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Atomium } from "./Atomium";
import { Vector3 } from "three";
import { Environment } from "@react-three/drei";

import { SamClassic } from "./SamClassic";
import { SamBusiness } from "./SamBusiness";
import { SamScientist } from "./SamScientist";
import { SamMusician } from "./SamMusician";
import { SamProject } from "./SamProject";
import { AuroraCurtains } from "./AuroraCurtains";

type SceneProps = {
  cameraPosition: [number, number, number];
  isHome: boolean;
  isResearch: boolean;
  isEducation: boolean;
  isMusic: boolean;
  isProjects: boolean;
};

export default function Scene(props: SceneProps) {
  const { cameraPosition, isHome, isResearch, isEducation, isProjects } = props;

  return (
    <Canvas
      shadows
      gl={{ logarithmicDepthBuffer: true }} // 🔑 CRITICAL FIX
      camera={{
        fov: 50,
        near: 0.1, // 🔑 restore sane near plane
        far: 5000, // large far is now safe
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

      <AnimatedCamera target={cameraPosition} />

      <AnimatedCamera target={cameraPosition} />

      {/* Models (ALWAYS MOUNTED) */}
      <Suspense fallback={null}>
        <Atomium />

        <SamClassic visible={isHome} />
        <SamScientist visible={isResearch} />
        <SamBusiness visible={isEducation} />

        {/* ✅ ALWAYS VISIBLE ON ALL PAGES */}
        <SamMusician />

        <SamProject visible={isProjects} />
      </Suspense>
    </Canvas>
  );
}

function AnimatedCamera({ target }: { target: [number, number, number] }) {
  const currentTarget = useRef(new Vector3(...target));

  useEffect(() => {
    currentTarget.current.set(...target);
  }, [target]);

  useFrame(({ camera }) => {
    camera.position.lerp(currentTarget.current, 0.05);
    camera.lookAt(0, 1, 0);
  });

  return null;
}
