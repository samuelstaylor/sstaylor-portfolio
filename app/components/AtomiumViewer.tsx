"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { Vector3 } from "three";

interface Props {
  cameraPosition: [number, number, number];
}

export default function AtomiumViewer({ cameraPosition }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Example Atomium model: 9 spheres for now */}
      {[
        [0, 0, 0],
        [2, 0, 0],
        [-2, 0, 0],
        [0, 2, 0],
        [0, -2, 0],
        [1.5, 1.5, 0],
        [-1.5, 1.5, 0],
        [-1.5, -1.5, 0],
        [1.5, -1.5, 0],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ))}

      <CameraMover targetPosition={cameraPosition} />
      <OrbitControls />
    </Canvas>
  );
}

function CameraMover({
  targetPosition,
}: {
  targetPosition: [number, number, number];
}) {
  const { camera } = useThree();

  useEffect(() => {
    const target = new Vector3(...targetPosition);
    const duration = 1000; // 1 second
    const start = camera.position.clone();
    let startTime: number | null = null;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const t = Math.min((time - startTime) / duration, 1);
      camera.position.lerpVectors(start, target, t);
      camera.lookAt(0, 0, 0);
      if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [targetPosition, camera]);

  return null;
}
