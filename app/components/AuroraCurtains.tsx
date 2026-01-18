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
  count = 60,
  height = 70,
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
      const segmentsX = 30;
      const segmentsY = 120;
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

      // Random curtain palette
      const palette = Math.random();
      const bottomHue = palette < 0.4 ? 0.33 : 0.75; // green or purple
      const topHue = palette < 0.6 ? 0.75 : 0.33; // purple or green

      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j);
        const y = pos.getY(j);

        const v = (y + height / 2) / height; // 0 → 1 vertically
        const hue = THREE.MathUtils.lerp(bottomHue, topHue, v);

        const color = new THREE.Color().setHSL(hue, 0.7, 0.45);
        colors.push(color.r, color.g, color.b);

        // Ghostly opacity: fade at edges and top/bottom
        const fadeX = 1 - Math.pow(Math.abs(x) / (width / 2), 2.2);
        const fadeY = 0.1 + 0.9 * Math.sin(v * Math.PI); // opaque in middle
        alphas.push(fadeX * fadeY);
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
          varying vec3 vPos;
          void main() {
            vAlpha = alpha;
            vColor = color;
            vPos = position;
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

      // Random placement around the scene
      const angle = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 30;
      mesh.position.set(
        Math.cos(angle) * radius,
        0, // lower base so curtains extend below origin
        Math.sin(angle) * radius
      );
      mesh.rotation.y = Math.random() * Math.PI * 2;

      list.push({
        mesh,
        basePositions: base,
        phase: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.4,
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

          // Wave + Perlin noise motion for natural aurora
          const wave = Math.sin(y * 0.15 + t * speed + phase) * 1.5;
          const swirl =
            noise.noise(x * 0.1, y * 0.1, t * 0.1 + noiseOffset) * 3;

          pos.array[ix + 2] = z + wave + swirl; // Z ripple
          pos.array[ix + 0] = x + swirl * 0.4; // slight X drift
          pos.array[ix + 1] = y + swirl * 0.2; // slight Y drift
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
