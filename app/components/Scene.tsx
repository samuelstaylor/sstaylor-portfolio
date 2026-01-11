"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Atomium } from "./Atomium";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 45 }}
      style={{ background: "#0a0a0a" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      {/* Load Atomium */}
      <Suspense fallback={null}>
        <Atomium />
      </Suspense>
    </Canvas>
  );
}
