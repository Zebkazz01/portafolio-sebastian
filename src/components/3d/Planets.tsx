import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// Lerp factor for smooth animations (lower = smoother, higher = more responsive)
const LERP_FACTOR = 0.06;

interface PlanetProps {
  isMobile?: boolean;
}

// High quality Mars
const Mars = ({ isMobile = false }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const smoothScrollRef = useRef(scrollProgress);

  const segments = isMobile ? 32 : 64;
  const atmosphereSegments = isMobile ? 16 : 32;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
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
          // Simplified Mars shader for mobile
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec3 rust = vec3(0.75, 0.35, 0.2);
            vec3 darkRust = vec3(0.5, 0.22, 0.12);
            vec3 polar = vec3(0.95, 0.92, 0.9);

            float n = fract(sin(dot(vUv * 12.0, vec2(127.1, 311.7))) * 43758.5453);
            vec3 color = mix(rust, darkRust, n);

            float polarCap = smoothstep(0.82, 0.95, abs(vUv.y - 0.5) * 2.0);
            color = mix(color, polar, polarCap * 0.8);

            vec3 lightDir = normalize(vec3(1.0, 0.5, 0.8));
            float light = max(0.1, dot(vNormal, lightDir));

            gl_FragColor = vec4(color * (0.7 + light * 0.5), 1.0);
          }
        `
        : `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;

          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 5; i++) {
              value += amplitude * noise(p);
              p *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            vec3 rust = vec3(0.75, 0.35, 0.2);
            vec3 darkRust = vec3(0.5, 0.22, 0.12);
            vec3 sand = vec3(0.85, 0.6, 0.4);
            vec3 polar = vec3(0.95, 0.92, 0.9);

            float n = fbm(vUv * 12.0);
            vec3 color = mix(rust, darkRust, n);
            color = mix(color, sand, fbm(vUv * 8.0 + 5.0) * 0.3);

            float volcano = smoothstep(0.08, 0.0, length(vUv - vec2(0.3, 0.45)));
            color = mix(color, darkRust * 0.8, volcano * 0.5);

            float polarCap = smoothstep(0.82, 0.95, abs(vUv.y - 0.5) * 2.0);
            color = mix(color, polar, polarCap * 0.8);

            vec3 lightDir = normalize(vec3(1.0, 0.5, 0.8));
            float light = dot(vNormal, lightDir);
            light = max(0.1, light);

            float terminator = smoothstep(0.0, 0.3, light);
            vec3 glowColor = vec3(0.9, 0.4, 0.2);
            color = mix(color * 0.1, color, terminator);
            color += glowColor * (1.0 - terminator) * 0.15;

            gl_FragColor = vec4(color * (0.7 + light * 0.5), 1.0);
          }
        `,
    });
  }, [isMobile]);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.9, 0.5, 0.3, intensity * 0.15);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    // Smooth scroll interpolation
    smoothScrollRef.current += (scrollProgress - smoothScrollRef.current) * LERP_FACTOR;
    const smoothScroll = smoothScrollRef.current;

    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      material.uniforms.time.value = state.clock.elapsedTime;

      const enterStart = 0.32;
      const peakStart = 0.37;
      const peakEnd = 0.42;
      const exitEnd = 0.48;

      let slideIn = 0;
      let fadeOut = 0;

      if (smoothScroll >= enterStart && smoothScroll < peakStart) {
        slideIn = (smoothScroll - enterStart) / (peakStart - enterStart);
      } else if (smoothScroll >= peakStart && smoothScroll <= peakEnd) {
        slideIn = 1;
      } else if (smoothScroll > peakEnd && smoothScroll <= exitEnd) {
        slideIn = 1;
        fadeOut = (smoothScroll - peakEnd) / (exitEnd - peakEnd);
      } else if (smoothScroll > exitEnd) {
        slideIn = 1;
        fadeOut = 1;
      }

      slideIn = Math.max(0, Math.min(1, slideIn));
      fadeOut = Math.max(0, Math.min(1, fadeOut));

      const slideEased = slideIn * slideIn * slideIn * (slideIn * (slideIn * 6 - 15) + 10);
      const fadeEased = fadeOut * fadeOut * fadeOut * (fadeOut * (fadeOut * 6 - 15) + 10);
      const isVisible = slideIn > 0 && fadeOut < 1;

      ref.current.position.z = isVisible ? (-15 - fadeEased * 80) : -200;
      ref.current.position.x = isVisible ? (-65 + slideEased * 55 - fadeEased * 70) : -200;
      ref.current.position.y = isVisible ? (5 - fadeEased * 15) : -100;

      const entryScale = slideIn > 0 ? 5.5 : 0;
      const exitScale = 1 - fadeEased;
      ref.current.scale.setScalar(isVisible ? (entryScale * exitScale) : 0);
    }
    if (atmosphereRef.current && ref.current) {
      atmosphereRef.current.position.copy(ref.current.position);
      atmosphereRef.current.scale.copy(ref.current.scale);
    }
  });

  return (
    <group>
      <mesh ref={ref} material={material}>
        <sphereGeometry args={[3.5, segments, segments]} />
      </mesh>
      {!isMobile && (
        <mesh ref={atmosphereRef} material={atmosphereMaterial}>
          <sphereGeometry args={[3.7, atmosphereSegments, atmosphereSegments]} />
        </mesh>
      )}
    </group>
  );
};

// High quality Jupiter
const Jupiter = ({ isMobile = false }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const smoothScrollRef = useRef(scrollProgress);

  const segments = isMobile ? 32 : 64;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
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
          // Simplified Jupiter shader for mobile
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec3 cream = vec3(0.95, 0.9, 0.8);
            vec3 tan = vec3(0.85, 0.7, 0.5);
            vec3 brown = vec3(0.7, 0.45, 0.3);

            float y = vUv.y;
            float bands = sin(y * 50.0) * 0.5 + 0.5;
            vec3 color = mix(cream, tan, bands);
            color = mix(color, brown, sin(y * 25.0) * 0.3 + 0.3);

            vec3 lightDir = normalize(vec3(1.0, 0.3, 0.8));
            float light = max(0.15, dot(vNormal, lightDir));

            gl_FragColor = vec4(color * (0.6 + light * 0.6), 1.0);
          }
        `
        : `
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float time;

          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          void main() {
            vec3 cream = vec3(0.95, 0.9, 0.8);
            vec3 tan = vec3(0.85, 0.7, 0.5);
            vec3 brown = vec3(0.7, 0.45, 0.3);
            vec3 darkBrown = vec3(0.5, 0.3, 0.2);

            float y = vUv.y;
            float bands = sin(y * 50.0) * 0.5 + 0.5;
            bands += sin(y * 30.0 + 1.0) * 0.3;
            bands += noise(vec2(vUv.x * 20.0, y * 10.0)) * 0.2;

            vec3 color = mix(cream, tan, bands);
            color = mix(color, brown, sin(y * 25.0 + 2.0) * 0.3 + 0.3);
            color = mix(color, darkBrown, sin(y * 40.0) * 0.15 + 0.15);

            vec2 spotCenter = vec2(0.35, 0.42);
            float spotDist = length((vUv - spotCenter) * vec2(1.0, 1.5));
            float spot = smoothstep(0.06, 0.02, spotDist);
            vec3 spotColor = vec3(0.85, 0.4, 0.3);
            color = mix(color, spotColor, spot * 0.8);

            float swirl = sin(spotDist * 60.0 - time * 0.2) * 0.5 + 0.5;
            color = mix(color, spotColor * 0.8, spot * swirl * 0.3);

            vec3 lightDir = normalize(vec3(1.0, 0.3, 0.8));
            float light = dot(vNormal, lightDir);
            light = max(0.15, light);

            gl_FragColor = vec4(color * (0.6 + light * 0.6), 1.0);
          }
        `,
    });
  }, [isMobile]);

  useFrame((state) => {
    // Smooth scroll interpolation
    smoothScrollRef.current += (scrollProgress - smoothScrollRef.current) * LERP_FACTOR;
    const smoothScroll = smoothScrollRef.current;

    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      material.uniforms.time.value = state.clock.elapsedTime;

      const enterStart = 0.52;
      const peakStart = 0.58;
      const peakEnd = 0.72;
      const exitEnd = 0.78;

      let slideIn = 0;
      let fadeOut = 0;

      if (smoothScroll >= enterStart && smoothScroll < peakStart) {
        slideIn = (smoothScroll - enterStart) / (peakStart - enterStart);
      } else if (smoothScroll >= peakStart && smoothScroll <= peakEnd) {
        slideIn = 1;
      } else if (smoothScroll > peakEnd && smoothScroll <= exitEnd) {
        slideIn = 1;
        fadeOut = (smoothScroll - peakEnd) / (exitEnd - peakEnd);
      } else if (smoothScroll > exitEnd) {
        slideIn = 1;
        fadeOut = 1;
      }

      slideIn = Math.max(0, Math.min(1, slideIn));
      fadeOut = Math.max(0, Math.min(1, fadeOut));

      const slideEased = slideIn * slideIn * slideIn * (slideIn * (slideIn * 6 - 15) + 10);
      const fadeEased = fadeOut * fadeOut * fadeOut * (fadeOut * (fadeOut * 6 - 15) + 10);
      const isVisible = slideIn > 0 && fadeOut < 1;

      ref.current.position.z = isVisible ? (-70 - fadeEased * 100) : -200;
      ref.current.position.x = isVisible ? (120 - slideEased * 100 + fadeEased * 90) : 250;
      ref.current.position.y = isVisible ? (10 + fadeEased * 20) : 100;

      const entryScale = slideEased * 12;
      const exitScale = 1 - fadeEased;
      ref.current.scale.setScalar(isVisible ? (entryScale * exitScale) : 0);
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[7, segments, segments]} />
    </mesh>
  );
};

// High quality Saturn with rings
const Saturn = ({ isMobile = false }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const smoothScrollRef = useRef(scrollProgress);

  const segments = isMobile ? 32 : 64;
  const ringSegments = isMobile ? 64 : 128;

  const planetMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          vec3 gold = vec3(0.95, 0.88, 0.65);
          vec3 tan = vec3(0.9, 0.8, 0.6);

          float bands = sin(vUv.y * 35.0) * 0.1 + 0.9;
          vec3 color = mix(gold, tan, bands);

          vec3 lightDir = normalize(vec3(1.0, 0.3, 0.6));
          float light = dot(vNormal, lightDir);
          light = max(0.2, light);

          gl_FragColor = vec4(color * (0.6 + light * 0.5), 1.0);
        }
      `,
    });
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: isMobile
        ? `
          // Simplified ring shader for mobile
          varying vec2 vUv;

          void main() {
            float dist = length(vUv - vec2(0.5));
            float rings = smoothstep(0.18, 0.2, dist) * smoothstep(0.48, 0.46, dist);
            float cassini = 1.0 - smoothstep(0.33, 0.34, dist) * smoothstep(0.36, 0.35, dist);
            rings *= cassini;

            vec3 ringColor = vec3(0.9, 0.85, 0.7);
            if (rings < 0.05) discard;

            gl_FragColor = vec4(ringColor, rings * 0.85);
          }
        `
        : `
          varying vec2 vUv;

          float noise(float x) {
            return fract(sin(x * 127.1) * 43758.5453);
          }

          void main() {
            float dist = length(vUv - vec2(0.5));

            float rings = 0.0;
            rings += smoothstep(0.18, 0.2, dist) * smoothstep(0.48, 0.46, dist);
            rings *= (1.0 - smoothstep(0.28, 0.30, dist) * smoothstep(0.32, 0.30, dist) * 0.5);
            rings *= (1.0 + sin(dist * 200.0) * 0.1);

            float cassini = 1.0 - smoothstep(0.33, 0.34, dist) * smoothstep(0.36, 0.35, dist);
            rings *= cassini;

            vec3 ringColor = vec3(0.9, 0.85, 0.7) * (0.7 + noise(dist * 100.0) * 0.3);

            if (rings < 0.05) discard;

            gl_FragColor = vec4(ringColor, rings * 0.85);
          }
        `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [isMobile]);

  useFrame((state) => {
    // Smooth scroll interpolation
    smoothScrollRef.current += (scrollProgress - smoothScrollRef.current) * LERP_FACTOR;
    const smoothScroll = smoothScrollRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.004;

      const enterStart = 0.80;
      const peakStart = 1.0;

      let slideIn = 0;

      if (smoothScroll >= enterStart && smoothScroll < peakStart) {
        slideIn = (smoothScroll - enterStart) / (peakStart - enterStart);
      } else if (smoothScroll >= peakStart) {
        slideIn = 1;
      }

      slideIn = Math.max(0, Math.min(1, slideIn));
      const slideEased = slideIn * slideIn * slideIn * (slideIn * (slideIn * 6 - 15) + 10);

      groupRef.current.position.z = -25;
      groupRef.current.position.x = -85 + slideEased * 75;
      groupRef.current.position.y = -2;

      groupRef.current.scale.setScalar(slideEased * 4);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.5, 0.1, 0.15]}>
      <mesh material={planetMaterial}>
        <sphereGeometry args={[6, segments, segments]} />
      </mesh>
      <mesh material={ringMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 14, ringSegments]} />
      </mesh>
    </group>
  );
};

interface PlanetsProps {
  isMobile?: boolean;
}

const Planets = ({ isMobile = false }: PlanetsProps) => {
  return (
    <group>
      <Mars isMobile={isMobile} />
      <Jupiter isMobile={isMobile} />
      <Saturn isMobile={isMobile} />
    </group>
  );
};

export default Planets;
