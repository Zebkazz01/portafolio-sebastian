import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// Bright galactic core
const GalaxyCore = ({ scrollProgress: _scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const coreWhite = new THREE.Color('#fffef5');
    const coreYellow = new THREE.Color('#fff4d6');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 4) * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.25;

      pos[i3] = Math.cos(theta) * r;
      pos[i3 + 1] = phi * r;
      pos[i3 + 2] = Math.sin(theta) * r;

      const mixedColor = new THREE.Color().copy(coreWhite).lerp(coreYellow, r / 6);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;

      siz[i] = (1 - r / 6) * 1.0 + Math.random() * 0.25;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          float angle = time * 0.002;
          vec3 rotatedPos = vec3(
            position.x * cos(angle) - position.z * sin(angle),
            position.y,
            position.x * sin(angle) + position.z * cos(angle)
          );
          vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
          gl_PointSize = size * (550.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          float alpha = exp(-r * r * 4.0) * 0.85;
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
    }
  });

  return (
    <points ref={ref} material={material} rotation={[-0.7, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
};

// Dust lanes around core
const GalaxyDust = ({ scrollProgress: _scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 8000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const dustCore = new THREE.Color('#ffeedd');
    const dustMid = new THREE.Color('#cc9966');
    const dustOuter = new THREE.Color('#664422');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 2) * 22;
      const theta = Math.random() * Math.PI * 2 + r * 0.25;
      const verticalSpread = (Math.random() - 0.5) * r * 0.12;

      pos[i3] = Math.cos(theta) * r + (Math.random() - 0.5) * 2;
      pos[i3 + 1] = verticalSpread;
      pos[i3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 2;

      const normalizedRadius = r / 22;
      const mixedColor = new THREE.Color();

      if (normalizedRadius < 0.3) {
        mixedColor.copy(dustCore).lerp(dustMid, normalizedRadius / 0.3);
      } else {
        mixedColor.copy(dustMid).lerp(dustOuter, (normalizedRadius - 0.3) / 0.7);
      }

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
      siz[i] = (1 - normalizedRadius * 0.5) * 0.5 + Math.random() * 0.25;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        void main() {
          vColor = color;
          float angle = time * 0.003;
          vec3 rotatedPos = vec3(
            position.x * cos(angle) - position.z * sin(angle),
            position.y,
            position.x * sin(angle) + position.z * cos(angle)
          );
          float dist = length(position.xz);
          vAlpha = 1.0 - smoothstep(0.0, 18.0, dist);
          vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
          gl_PointSize = size * (450.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          float alpha = exp(-r * r * 3.0) * 0.3 * vAlpha;
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
    }
  });

  return (
    <points ref={ref} material={material} rotation={[-0.7, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
};

// Spiral arms
const GalaxyArms = ({ scrollProgress: _scrollProgress }: { scrollProgress: number }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 12000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const branches = 5;
    const spin = 2.5;
    const randomness = 0.15;
    const randomnessPower = 3;
    const radius = 55;

    const colorCore = new THREE.Color('#fff8e0');
    const colorMid = new THREE.Color('#e8d0a0');
    const colorOuter = new THREE.Color('#7090c0');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radiusValue = Math.pow(Math.random(), 1.5) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radiusValue * spin * 0.06;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusValue;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusValue * 0.08;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusValue;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radiusValue + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusValue + randomZ;

      const normalizedRadius = radiusValue / radius;
      const mixedColor = new THREE.Color();

      if (normalizedRadius < 0.2) {
        mixedColor.copy(colorCore).lerp(colorMid, normalizedRadius / 0.2);
      } else {
        mixedColor.copy(colorMid).lerp(colorOuter, (normalizedRadius - 0.2) / 0.8);
      }

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
      siz[i] = (1 - normalizedRadius * 0.7) * 0.28 + Math.random() * 0.08;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          float angle = time * 0.006;
          vec3 rotatedPos = vec3(
            position.x * cos(angle) - position.z * sin(angle),
            position.y,
            position.x * sin(angle) + position.z * cos(angle)
          );
          vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          float alpha = exp(-r * r * 5.0) * 0.5;
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
    }
  });

  return (
    <points ref={ref} material={material} rotation={[-0.7, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
};

// Main Galaxy component - all layers move together
const Galaxy = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  useFrame(() => {
    if (groupRef.current) {
      // All layers move together as one unit
      const zStart = -30;
      const zEnd = -180;
      groupRef.current.position.z = zStart + scrollProgress * (zEnd - zStart);

      // Unified scale for all layers
      const scaleStart = 2.5;
      const scaleEnd = 0.4;
      groupRef.current.scale.setScalar(scaleStart + scrollProgress * (scaleEnd - scaleStart));
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -30]}>
      <GalaxyCore scrollProgress={scrollProgress} />
      <GalaxyDust scrollProgress={scrollProgress} />
      <GalaxyArms scrollProgress={scrollProgress} />
    </group>
  );
};

export default Galaxy;
