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

      {/* Animated camera must be inside Canvas */}
      <AnimatedCamera target={cameraPosition} />

      {/* Atomium */}
      <Suspense fallback={null}>
        <Atomium />
      </Suspense>
    </Canvas>
  );
}

// AnimatedCamera is fully client-side; only runs inside Canvas
function AnimatedCamera({ target }: { target: [number, number, number] }) {
  const { camera } = useThree(); // now safe
  const currentTarget = useRef(new Vector3(...target));

  // update target vector when cameraPosition changes
  useEffect(() => {
    currentTarget.current.set(...target);
  }, [target]);

  useFrame(() => {
    if (camera) {
      camera.position.lerp(currentTarget.current, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
