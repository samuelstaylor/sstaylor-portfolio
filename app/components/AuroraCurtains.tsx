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
  count = 30,
  height = 200,
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

      // 🎨 Color probabilities
      const rand = Math.random();
      let bottomHue: number;
      let topHue: number;

      if (rand < 0.7) {
        bottomHue = 0.33;
        topHue = 0.43;
      } else if (rand < 0.95) {
        bottomHue = 0.75;
        topHue = 0.85;
      } else {
        bottomHue = 0.55;
        topHue = 0.6;
      }

      for (let j = 0; j < pos.count; j++) {
        const x = pos.getX(j);
        const y = pos.getY(j);
        const v = (y + height / 2) / height;

        const baseHue = THREE.MathUtils.lerp(bottomHue, topHue, v);
        const hueJitter = (noise.noise(x * 0.05, y * 0.02, 0.5) - 0.5) * 0.02;

        const color = new THREE.Color().setHSL(
          baseHue + hueJitter,
          0.6,
          0.28 + Math.random() * 0.04
        );

        colors.push(color.r, color.g, color.b);

        const fadeX = 1 - Math.pow(Math.abs(x) / (width / 2), 2.8);
        const fadeY = Math.sin(v * Math.PI) * Math.pow(v * (1 - v), 0.25);
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
            gl_FragColor = vec4(vColor, vAlpha * 0.4);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // 🌍 Radial sky placement
      const angle = Math.random() * Math.PI * 2;
      const radius = 70 + Math.random() * 60;
      const zOffset = -10 + Math.random() * 20;

      mesh.position.set(
        Math.cos(angle) * radius,
        -height * 0.25, // lifted into sky
        Math.sin(angle) * radius + zOffset
      );

      // 🌌 Critical realism rotations
      mesh.rotation.x = -THREE.MathUtils.degToRad(-40 + Math.random() * 10);
      mesh.rotation.y = angle + Math.PI / 2;

      list.push({
        mesh,
        basePositions: base,
        phase: Math.random() * Math.PI * 2,
        speed: 0.04 + Math.random() * 0.25,
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
          const slowWave = Math.sin(y * 0.02 + t * 0.05 + phase * 0.5) * 1.2;
          const swirl =
            noise.noise(x * 0.08, y * 0.04, t * 0.1 + noiseOffset) * 2;

          const thicknessX =
            noise.noise(x * 0.05, y * 0.05, t * 0.05 + noiseOffset) * 0.6;
          const thicknessZ =
            noise.noise(x * 0.04, y * 0.06, t * 0.07 + noiseOffset) * 0.6;

          // 🌌 Atmospheric curvature
          const curve = Math.pow(y / height, 2) * 6;

          pos.array[ix + 0] = x + swirl * 0.2 + thicknessX;
          pos.array[ix + 1] = y + swirl * 0.1;
          pos.array[ix + 2] = z + wave + slowWave + swirl + thicknessZ + curve;
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
