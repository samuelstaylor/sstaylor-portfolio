"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Atomium } from "./Atomium";
import { Vector3 } from "three";
import { Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

type SceneProps = {
  cameraPosition: [number, number, number];
  isHome: boolean;
};

/* ---------- Sam Model ---------- */
function SamClassic() {
  const { scene } = useGLTF("/models/sam-classic.glb");

  return (
    <primitive
      object={scene}
      position={[1.2, 0, 0]} // slightly beside Atomium
      scale={1}
    />
  );
}

useGLTF.preload("/models/sam-classic.glb");

/* ---------- Scene ---------- */
export default function Scene({ cameraPosition, isHome }: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: cameraPosition, fov: 50 }}
      style={{ background: "#1e1e1e" }}
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

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Animated camera */}
      <AnimatedCamera target={cameraPosition} />

      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.25}
          roughness={0.75}
        />
      </mesh>

      {/* Models */}
      <Suspense fallback={null}>
        <Atomium />
        {isHome && <SamClassic />}
      </Suspense>
    </Canvas>
  );
}

/* ---------- Camera Animation ---------- */
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
