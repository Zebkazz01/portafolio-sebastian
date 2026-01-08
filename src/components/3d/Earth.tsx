import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface EarthProps {
  isMobile?: boolean;
}

const Earth = ({ isMobile = false }: EarthProps) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  // Geometry segments based on device
  const segments = isMobile ? 32 : 64;
  const cloudSegments = isMobile ? 16 : 32;

  // Create procedural earth-like material
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: isMobile
        ? `
          // Simplified shader for mobile - brighter version
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec3 oceanColor = vec3(0.1, 0.25, 0.55);
            vec3 landColor = vec3(0.2, 0.5, 0.25);
            vec3 iceColor = vec3(0.95, 0.97, 1.0);

            float continentNoise = fract(sin(dot(vUv * 8.0, vec2(12.9898, 78.233))) * 43758.5453);
            float iceCap = smoothstep(0.85, 1.0, abs(vUv.y - 0.5) * 2.0);

            vec3 color = mix(oceanColor, landColor, step(0.45, continentNoise));
            color = mix(color, iceColor, iceCap);

            float light = dot(vNormal, normalize(vec3(1.0, 0.5, 0.5)));
            light = max(0.35, light);

            // Brighter overall
            gl_FragColor = vec4(color * (0.85 + light * 0.5), 1.0);
          }
        `
        : `
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float time;

          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            vec3 oceanColor = vec3(0.05, 0.15, 0.4);
            vec3 landColor = vec3(0.1, 0.4, 0.15);
            vec3 desertColor = vec3(0.6, 0.5, 0.3);
            vec3 iceColor = vec3(0.9, 0.95, 1.0);

            float continentNoise = noise(vUv * 8.0);
            continentNoise += noise(vUv * 16.0) * 0.5;
            continentNoise += noise(vUv * 32.0) * 0.25;
            continentNoise = continentNoise / 1.75;

            float iceCap = smoothstep(0.85, 1.0, abs(vUv.y - 0.5) * 2.0);

            vec3 color = oceanColor;
            if (continentNoise > 0.5) {
              float landMix = (continentNoise - 0.5) * 2.0;
              color = mix(landColor, desertColor, landMix * noise(vUv * 20.0));
            }
            color = mix(color, iceColor, iceCap);

            float light = dot(vNormal, normalize(vec3(1.0, 0.5, 0.5)));
            light = max(0.2, light);

            gl_FragColor = vec4(color * light, 1.0);
          }
        `,
    });
  }, [isMobile]);

  // Atmosphere glow
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x4d7fff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.5);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      earthMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  // Earth: slides in from RIGHT - appears with About section (section 2)
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

  // Only visible during active phase
  const isVisible = slideIn > 0 && fadeOut < 1;

  // Position: slides in from RIGHT, centered on screen
  const posX = isVisible ? (55 - slideEased * 45 + fadeEased * 70) : 200;
  const posY = isVisible ? (2 - fadeEased * 15) : -100;
  const posZ = isVisible ? (-10 - fadeEased * 80) : -200;

  // Scale: full size immediately on entry (no growing), shrinks only on exit
  const entryScale = slideIn > 0 ? 5.5 : 0;
  const exitScale = 1 - fadeEased;
  const scale = isVisible ? (entryScale * exitScale) : 0;

  return (
    <group position={[posX, posY, posZ]} scale={[scale, scale, scale]}>
      {/* Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[3, segments, segments]} />
      </mesh>

      {/* Clouds layer - skip on mobile */}
      {!isMobile && (
        <Sphere ref={cloudsRef} args={[3.05, cloudSegments, cloudSegments]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </Sphere>
      )}

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[3.3, cloudSegments, cloudSegments]} />
      </mesh>
    </group>
  );
};

export default Earth;
