"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Atomium } from "./Atomium";
import { Vector3 } from "three";

type SceneProps = {
  cameraPosition: [number, number, number];
};

export default function Scene({ cameraPosition }: SceneProps) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 45 }}
      style={{ background: "#0a0a0a" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      {/* Animated camera */}
      <AnimatedCamera target={cameraPosition} />

      {/* Atomium */}
      <Suspense fallback={null}>
        <Atomium />
      </Suspense>
    </Canvas>
  );
}

// Smoothly moves camera to target whenever it changes
function AnimatedCamera({ target }: { target: [number, number, number] }) {
  const ref = useRef<any>();
  const { camera } = useThree();
  const currentTarget = useRef(new Vector3(...target));

  // Update currentTarget whenever target changes
  useEffect(() => {
    currentTarget.current.set(...target);
  }, [target]);

  useFrame(() => {
    if (camera) {
      // Move camera smoothly toward target
      camera.position.lerp(currentTarget.current, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null; // no need to render a separate perspectiveCamera
}
