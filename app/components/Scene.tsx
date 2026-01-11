"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Atomium } from "./Atomium";
import { Vector3 } from "three";
import { OrbitControls, Environment } from "@react-three/drei";

type SceneProps = {
  cameraPosition: [number, number, number];
};

export default function Scene({ cameraPosition }: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: cameraPosition, fov: 50 }}
      style={{ background: "#1e1e1e" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.3} />

      {/* Environment for reflections */}
      <Environment preset="sunset" />

      {/* Animated camera */}
      <AnimatedCamera target={cameraPosition} />

      {/* Ground plane closer to Atomium scale */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]} // plane at y=0
      >
        <planeGeometry args={[5, 5]} /> {/* smaller, fits Atomium better */}
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.3}
          roughness={0.7}
          side={2}
        />
      </mesh>

      {/* Atomium model sitting on the plane */}
      <Suspense fallback={null}>
        <Atomium position={[0, 0.0, 0]} scale={1} />{" "}
        {/* slight lift above plane */}
      </Suspense>

      {/* Orbit controls */}
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

// Smoothly moves camera to target whenever it changes
function AnimatedCamera({ target }: { target: [number, number, number] }) {
  const currentTarget = useRef(new Vector3(...target));

  // Update target when cameraPosition changes
  useEffect(() => {
    currentTarget.current.set(...target);
  }, [target]);

  useFrame(({ camera }) => {
    camera.position.lerp(currentTarget.current, 0.05);
    camera.lookAt(0, 1, 0); // center on Atomium
  });

  return null;
}
