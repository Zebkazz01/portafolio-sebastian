import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

const Nebula = () => {
  const ref = useRef<THREE.Points>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    // Realistic nebula colors - more subtle
    const color1 = new THREE.Color('#4a3060'); // Deep purple
    const color2 = new THREE.Color('#2a4080'); // Deep blue
    const color3 = new THREE.Color('#603050'); // Dark magenta

    for (let i = 0; i < count; i++) {
      // Create cloud-like distribution far in background
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 60;

      // Cluster effect
      const clusterX = Math.sin(theta * 2) * 15;
      const clusterY = Math.cos(phi * 1.5) * 8;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta) + clusterX;
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.2 + clusterY;
      pos[i * 3 + 2] = radius * Math.cos(phi) - 80;

      // Random subtle color mixing
      const t1 = Math.random();
      const t2 = Math.random();
      const mixedColor = new THREE.Color();

      if (t1 < 0.33) {
        mixedColor.copy(color1).lerp(color2, t2);
      } else if (t1 < 0.66) {
        mixedColor.copy(color2).lerp(color3, t2);
      } else {
        mixedColor.copy(color3).lerp(color1, t2);
      }

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      siz[i] = Math.random() * 3 + 1;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollProgress: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform float scrollProgress;

        void main() {
          vColor = color;

          vec3 pos = position;

          // Very subtle drift
          pos.x += sin(time * 0.02 + position.y * 0.01) * 0.2;
          pos.y += cos(time * 0.02 + position.x * 0.01) * 0.2;

          // Subtle parallax
          pos.z += scrollProgress * 10.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;

          // Soft gaussian-like falloff
          float alpha = exp(-r * r * 8.0) * 0.15;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (ref.current) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.scrollProgress.value = scrollProgress;

      // Almost imperceptible rotation
      ref.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
    </points>
  );
};

export default Nebula;
