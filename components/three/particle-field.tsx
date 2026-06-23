"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D particle-field background for the hero (design-system/MASTER.md §5.3
 * "Accent gradient" — teal-green, no purple/pink). Additive-blended points on
 * the OLED base read like a calm institutional star-field. Slow drift + cursor
 * parallax; frozen when `animate` is false (prefers-reduced-motion).
 *
 * Colors are baked into the WebGL buffer (CSS tokens can't reach the GPU), but
 * the hexes mirror MASTER §2.3/§2.4 exactly.
 */
const BRAND = new THREE.Color("#00E5A0"); // --brand
const GOLD = new THREE.Color("#D4AF37"); // --gold (sparse, premium hint)
const PALE = new THREE.Color("#9FB4C4"); // cool foreground, for depth

function Field({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // wide, shallow volume so it reads as a horizon field behind the text
      pos[i * 3] = (Math.random() - 0.5) * 17;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const r = Math.random();
      c.copy(r > 0.965 ? GOLD : r > 0.82 ? PALE : BRAND);
      const b = 0.45 + Math.random() * 0.55; // brightness variance = depth
      col[i * 3] = c.r * b;
      col[i * 3 + 1] = c.g * b;
      col[i * 3 + 2] = c.b * b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p || !animate) return;
    p.rotation.y += delta * 0.015;
    const { x, y } = state.pointer;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, -y * 0.12, 0.04);
    p.position.x = THREE.MathUtils.lerp(p.position.x, x * 0.5, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleField({ animate }: { animate: boolean }) {
  // Fewer points on small screens for a 60fps budget (MASTER §5.2)
  const [count, setCount] = useState(2200);
  useEffect(() => {
    setCount(window.innerWidth < 768 ? 1400 : 4500);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Field count={count} animate={animate} />
    </Canvas>
  );
}
