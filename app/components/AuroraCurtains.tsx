"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

type Curtain = {
  mesh: THREE.Mesh;
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
  const isVisible = useRef(true);

  // Pause animation when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      isVisible.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

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
      const colors: number[] = [];
      const alphas: number[] = [];

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
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        vertexColors: true,
        uniforms: {
          time: { value: 0 },
          phase: { value: Math.random() * Math.PI * 2 },
          speed: { value: 0.04 + Math.random() * 0.25 },
          noiseOffset: { value: Math.random() * 100 },
          height: { value: height },
        },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          varying vec3 vColor;
          uniform float time;
          uniform float phase;
          uniform float speed;
          uniform float noiseOffset;
          uniform float height;

          float hash(vec3 p){
            return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453);
          }

          float noise(vec3 p){
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f*f*(3.0-2.0*f);
            float n000 = hash(i + vec3(0,0,0));
            float n100 = hash(i + vec3(1,0,0));
            float n010 = hash(i + vec3(0,1,0));
            float n110 = hash(i + vec3(1,1,0));
            float n001 = hash(i + vec3(0,0,1));
            float n101 = hash(i + vec3(1,0,1));
            float n011 = hash(i + vec3(0,1,1));
            float n111 = hash(i + vec3(1,1,1));
            return mix(
              mix(mix(n000,n100,f.x), mix(n010,n110,f.x), f.y),
              mix(mix(n001,n101,f.x), mix(n011,n111,f.x), f.y),
              f.z
            );
          }

          void main() {
            vec3 p = position;
            float wave = sin(p.y * 0.1 + time * speed + phase) * 2.5;
            float slowWave = sin(p.y * 0.02 + time * 0.05 + phase * 0.5) * 1.2;
            float swirl = noise(vec3(p.x*0.08,p.y*0.04,time*0.1+noiseOffset))*2.0;
            float thicknessX = noise(vec3(p.x*0.05,p.y*0.05,time*0.05+noiseOffset))*0.6;
            float thicknessZ = noise(vec3(p.x*0.04,p.y*0.06,time*0.07+noiseOffset))*0.6;
            float curve = pow(p.y/height,2.0)*6.0;
            p.x += swirl*0.2 + thicknessX;
            p.y += swirl*0.1;
            p.z += wave + slowWave + swirl + thicknessZ + curve;
            vAlpha = alpha;
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            float a = vAlpha * 0.4;
            if(a < 0.01) discard;
            gl_FragColor = vec4(vColor, a);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      geometry.computeBoundingSphere();
      if (geometry.boundingSphere) geometry.boundingSphere.radius *= 1.5;
      mesh.frustumCulled = true;

      const angle = Math.random() * Math.PI * 2;
      const radius = 70 + Math.random() * 60;
      const zOffset = -10 + Math.random() * 20;
      mesh.position.set(
        Math.cos(angle) * radius,
        -height * 0.25,
        Math.sin(angle) * radius + zOffset
      );
      mesh.rotation.x = -THREE.MathUtils.degToRad(-40 + Math.random() * 10);
      mesh.rotation.y = angle + Math.PI / 2;

      list.push({
        mesh,
        phase: material.uniforms.phase.value,
        speed: material.uniforms.speed.value,
        noiseOffset: material.uniforms.noiseOffset.value,
      });
    }
    return list;
  }, [count, height, width, noise]);

  useFrame(({ clock }) => {
    if (!isVisible.current) return;
    const t = clock.getElapsedTime();
    curtains.current.forEach(({ mesh }) => {
      (mesh.material as THREE.ShaderMaterial).uniforms.time.value = t;
    });
  });

  return (
    <>
      {curtains.current.map((c, i) => (
        <primitive key={i} object={c.mesh} />
      ))}
    </>
  );
}
