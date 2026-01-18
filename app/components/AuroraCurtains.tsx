"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

type Curtain = {
  mesh: THREE.Mesh;
  basePositions: Float32Array;
  phase: number;
  speed: number;
  noiseOffset: number;
};

export function AuroraCurtains({
  count = 50,
  height = 180, // taller for zoomed out camera
  width = 20,
}: {
  count?: number;
  height?: number;
  width?: number;
}) {
  const curtains = useRef<Curtain[]>([]);
  const noise = useMemo(() => new ImprovedNoise(), []);

  curtains.current = useMemo(() => {
    const list: Curtain[] = [];

    for (let i = 0; i < count; i++) {
      const segmentsX = 40;
      const segmentsY = 200;
      const geometry = new THREE.PlaneGeometry(
        width,
        height,
        segmentsX,
        segmentsY
      );
      const pos = geometry.attributes.position;
      const base = new Float32Array(pos.array);

      const colors: number[] = [];
      const alphas: number[] = [];

      const palette = Math.random();
      const bottomHue = palette < 0.4 ? 0.33 : 0.75; // green or purple
      const topHue = palette < 0.6 ? 0.75 : 0.33;

      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j);
        const y = pos.getY(j);

        const v = (y + height / 2) / height;

        // Slight random hue variation per vertex
        const hueJitter = (Math.random() - 0.5) * 0.02;
        const hue = THREE.MathUtils.lerp(bottomHue, topHue, v) + hueJitter;

        const color = new THREE.Color().setHSL(hue, 0.7, 0.45);
        colors.push(color.r, color.g, color.b);

        // Ghostly opacity: edges & bottom transparent, middle opaque
        const fadeX = 1 - Math.pow(Math.abs(x) / (width / 2), 2.5);
        const fadeY = Math.sin(v * Math.PI); // 0 at bottom & top, 1 in middle
        const alpha = fadeX * fadeY;
        alphas.push(alpha);
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      geometry.setAttribute(
        "alpha",
        new THREE.Float32BufferAttribute(alphas, 1)
      );

      const material = new THREE.ShaderMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: { time: { value: 0 } },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            vAlpha = alpha;
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(vColor, vAlpha * 0.6);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 50;
      const zOffset = -15 + Math.random() * 30;
      mesh.position.set(
        Math.cos(angle) * radius,
        -height * 0.3, // start lower for full coverage
        Math.sin(angle) * radius + zOffset
      );

      mesh.rotation.y = Math.random() * Math.PI * 2;

      list.push({
        mesh,
        basePositions: base,
        phase: Math.random() * Math.PI * 2,
        speed: 0.05 + Math.random() * 0.3, // slower for more natural drift
        noiseOffset: Math.random() * 100,
      });
    }

    return list;
  }, [count, height, width]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    curtains.current.forEach(
      ({ mesh, basePositions, phase, speed, noiseOffset }) => {
        const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < pos.count; i++) {
          const ix = i * 3;
          const x = basePositions[ix];
          const y = basePositions[ix + 1];
          const z = basePositions[ix + 2];

          const wave = Math.sin(y * 0.1 + t * speed + phase) * 2.5;
          const swirl =
            noise.noise(x * 0.08, y * 0.04, t * 0.1 + noiseOffset) * 3;

          // Aurora motion with slight horizontal & vertical drift
          pos.array[ix + 2] = z + wave + swirl;
          pos.array[ix + 0] = x + swirl * 0.25;
          pos.array[ix + 1] = y + swirl * 0.15;
        }

        pos.needsUpdate = true;
      }
    );
  });

  return (
    <>
      {curtains.current.map((c, i) => (
        <primitive key={i} object={c.mesh} />
      ))}
    </>
  );
}
