import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface MoonProps {
  isMobile?: boolean;
}

const Moon = ({ isMobile = false }: MoonProps) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  const segments = isMobile ? 16 : 32;

  // Create procedural moon material with craters
  const moonMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: isMobile
        ? `
          // Simplified shader for mobile
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec3 baseColor = vec3(0.6, 0.6, 0.55);
            float n = fract(sin(dot(vUv * 20.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.15;
            vec3 color = baseColor + n;

            float light = dot(vNormal, normalize(vec3(1.0, 0.5, 0.5)));
            light = max(0.15, light);

            gl_FragColor = vec4(color * light, 1.0);
          }
        `
        : `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
              f.y
            );
          }

          float crater(vec2 p, vec2 center, float size) {
            float d = length(p - center);
            float rim = smoothstep(size * 0.8, size, d) * smoothstep(size * 1.2, size, d);
            float floor = 1.0 - smoothstep(0.0, size * 0.7, d);
            return rim * 0.3 - floor * 0.15;
          }

          void main() {
            vec3 baseColor = vec3(0.6, 0.6, 0.55);

            float n = noise(vUv * 20.0) * 0.15;
            n += noise(vUv * 40.0) * 0.1;
            n += noise(vUv * 80.0) * 0.05;

            float craters = 0.0;
            craters += crater(vUv, vec2(0.3, 0.4), 0.08);
            craters += crater(vUv, vec2(0.6, 0.3), 0.12);
            craters += crater(vUv, vec2(0.5, 0.7), 0.06);
            craters += crater(vUv, vec2(0.2, 0.6), 0.09);
            craters += crater(vUv, vec2(0.8, 0.5), 0.07);
            craters += crater(vUv, vec2(0.4, 0.2), 0.05);
            craters += crater(vUv, vec2(0.7, 0.8), 0.1);

            vec3 color = baseColor + n + craters;

            float light = dot(vNormal, normalize(vec3(1.0, 0.5, 0.5)));
            light = max(0.15, light);

            gl_FragColor = vec4(color * light, 1.0);
          }
        `,
    });
  }, [isMobile]);

  useFrame((state) => {
    if (groupRef.current) {
      // Moon: follows Earth - appears with About section (section 2)
      const enterStart = 0.20;
      const peakStart = 0.25;
      const peakEnd = 0.30;
      const exitEnd = 0.36;

      let slideIn = 0;
      let fadeOut = 0;

      if (scrollProgress >= enterStart && scrollProgress < peakStart) {
        slideIn = (scrollProgress - enterStart) / (peakStart - enterStart);
      } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
        slideIn = 1;
      } else if (scrollProgress > peakEnd && scrollProgress <= exitEnd) {
        slideIn = 1;
        fadeOut = (scrollProgress - peakEnd) / (exitEnd - peakEnd);
      } else if (scrollProgress > exitEnd) {
        slideIn = 1;
        fadeOut = 1;
      }

      slideIn = Math.max(0, Math.min(1, slideIn));
      fadeOut = Math.max(0, Math.min(1, fadeOut));

      // Ultra smooth easing - quintic for very gradual transitions
      const slideEased = slideIn * slideIn * slideIn * (slideIn * (slideIn * 6 - 15) + 10);
      const fadeEased = fadeOut * fadeOut * fadeOut * (fadeOut * (fadeOut * 6 - 15) + 10);
      const isVisible = slideIn > 0 && fadeOut < 1;

      // Orbit around Earth's position (matching Earth's animation)
      const time = state.clock.elapsedTime * 0.2;
      const earthX = isVisible ? (60 - slideEased * 50 + fadeEased * 80) : 200;
      const earthY = isVisible ? (0 - fadeEased * 15) : -100;
      const earthZ = isVisible ? (5 - fadeEased * 100) : -200;

      // Orbit radius - much bigger to avoid touching Earth
      const orbitRadius = 45;
      const moonVisible = slideIn > 0 && fadeOut < 1;
      const moonScale = moonVisible ? (1 - fadeOut) * Math.min(1, slideIn) : 0;

      groupRef.current.position.x = earthX + Math.cos(time) * orbitRadius * Math.min(1, slideIn);
      groupRef.current.position.z = earthZ + Math.sin(time) * orbitRadius * Math.min(1, slideIn) - 10;
      groupRef.current.position.y = earthY + Math.sin(time * 0.5) * 8 * Math.min(1, slideIn);

      // Scale: visible only during active phase, then disappears completely
      const scale = moonScale * 2;
      groupRef.current.scale.setScalar(scale);
    }
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={moonRef} material={moonMaterial}>
        <sphereGeometry args={[1, segments, segments]} />
      </mesh>
    </group>
  );
};

export default Moon;
