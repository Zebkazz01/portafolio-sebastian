import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// Enhanced flame particles with more dynamic behavior
const FlameParticles = ({ intensity = 1 }: { intensity?: number }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors } = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = -Math.random() * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = -Math.random() * 0.08 - 0.04;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      // Color gradient from white-yellow to orange-red
      const t = Math.random();
      col[i * 3] = 1.0;
      col[i * 3 + 1] = 0.5 + t * 0.5;
      col[i * 3 + 2] = t * 0.3;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        if (posArray[i * 3 + 1] < -3) {
          posArray[i * 3] = (Math.random() - 0.5) * 0.3;
          posArray[i * 3 + 1] = 0;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12 * intensity}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Smoke trail effect
const SmokeTrail = () => {
  const smokeRef = useRef<THREE.Points>(null);

  const { positions, opacities: _opacities } = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    const ops = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = -2 - Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      ops[i] = Math.random() * 0.3;
    }

    return { positions: pos, opacities: ops };
  }, []);

  useFrame(() => {
    if (smokeRef.current) {
      const posArray = smokeRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3] += (Math.random() - 0.5) * 0.02;
        posArray[i * 3 + 1] -= 0.03;
        posArray[i * 3 + 2] += (Math.random() - 0.5) * 0.02;

        if (posArray[i * 3 + 1] < -12) {
          posArray[i * 3] = (Math.random() - 0.5) * 0.5;
          posArray[i * 3 + 1] = -2;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }

      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={smokeRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        color="#888888"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Rocket = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      // Rocket visible during Hero section (first 20% of scroll)
      const enterDuration = 0.01; // 0-1% scroll to fully appear
      const visibleUntil = 0.16; // visible until 16%
      const fadeOutDuration = 0.03; // fade out over 3%

      let visibility = 0;
      if (scrollProgress < enterDuration) {
        const t = scrollProgress / enterDuration;
        visibility = t * t * t * (t * (t * 6 - 15) + 10); // quintic ease
      } else if (scrollProgress < visibleUntil) {
        visibility = 1;
      } else if (scrollProgress < visibleUntil + fadeOutDuration) {
        const t = 1 - (scrollProgress - visibleUntil) / fadeOutDuration;
        visibility = t * t;
      }

      // Rocket travels forward through space during first section
      const travelProgress = Math.min(1, scrollProgress / 0.19);
      const travelEased = travelProgress * travelProgress * travelProgress * (travelProgress * (travelProgress * 6 - 15) + 10);

      // Position: centered and visible, with space around
      groupRef.current.position.z = -50 + travelEased * 80;
      groupRef.current.position.x = -10 + travelEased * 18 + Math.sin(time * 1.5) * 0.3 * (1 - travelEased);
      groupRef.current.position.y = -20 + travelEased * 30 + Math.cos(time * 1.2) * 0.2 * (1 - travelEased);

      // Rotation: slight tilt as it flies
      groupRef.current.rotation.z = -0.15 + travelEased * 0.25;
      groupRef.current.rotation.x = 0.1 - travelEased * 0.15;

      // Gentle wobble during flight
      groupRef.current.rotation.z += Math.sin(time * 3) * 0.02 * (1 - travelEased);
      groupRef.current.rotation.x += Math.cos(time * 2.5) * 0.015 * (1 - travelEased);

      // Scale with visibility
      groupRef.current.scale.setScalar(visibility * 1.8);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - metallic white with panel lines */}
      <Cylinder args={[0.4, 0.5, 3, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.85}
          roughness={0.15}
        />
      </Cylinder>

      {/* Body detail rings */}
      {[-0.8, 0, 0.8].map((y, i) => (
        <Cylinder key={i} args={[0.42, 0.42, 0.08, 32]} position={[0, y, 0]}>
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>
      ))}

      {/* Nose cone - red with white tip */}
      <Cone args={[0.4, 1.2, 32]} position={[0, 2.1, 0]}>
        <meshStandardMaterial
          color="#cc2222"
          metalness={0.7}
          roughness={0.25}
        />
      </Cone>

      {/* Nose tip */}
      <Cone args={[0.12, 0.3, 16]} position={[0, 2.85, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.3}
        />
      </Cone>

      {/* Windows - multiple portholes */}
      {[0.6, 0.2, -0.2].map((y, i) => (
        <group key={i}>
          <mesh position={[0.38, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
            <meshStandardMaterial
              color="#1a3a5c"
              metalness={0.3}
              roughness={0.1}
            />
          </mesh>
          {/* Window glow */}
          <mesh position={[0.42, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <circleGeometry args={[0.1, 24]} />
            <meshBasicMaterial
              color="#66aaff"
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Window frame */}
          <mesh position={[0.39, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.1, 0.14, 24]} />
            <meshStandardMaterial
              color="#888888"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Fins - 4 aerodynamic fins */}
      {[0, 90, 180, 270].map((angle, i) => (
        <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
          {/* Main fin */}
          <mesh position={[0.55, -1.1, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.6, 0.9, 0.05]} />
            <meshStandardMaterial
              color="#cc2222"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
          {/* Fin tip */}
          <mesh position={[0.75, -0.7, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.25, 0.4, 0.04]} />
            <meshStandardMaterial
              color="#aa1111"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Engine section */}
      <Cylinder args={[0.5, 0.45, 0.4, 32]} position={[0, -1.7, 0]}>
        <meshStandardMaterial
          color="#333333"
          metalness={0.95}
          roughness={0.1}
        />
      </Cylinder>

      {/* Engine bell - main */}
      <Cylinder args={[0.3, 0.45, 0.5, 32]} position={[0, -2.1, 0]}>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.98}
          roughness={0.05}
        />
      </Cylinder>

      {/* Engine inner glow */}
      <mesh position={[0, -2.35, 0]}>
        <circleGeometry args={[0.28, 32]} />
        <meshBasicMaterial color="#ff4400" />
      </mesh>

      {/* Flame effects */}
      <group position={[0, -2.4, 0]}>
        <FlameParticles intensity={1.2} />
        <SmokeTrail />

        {/* Main flame cone */}
        <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.25, 1.2, 16]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.7} />
        </mesh>

        {/* Inner hot flame */}
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.15, 0.9, 16]} />
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
        </mesh>

        {/* Core flame */}
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.08, 0.6, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Flame glow */}
        <pointLight color="#ff6600" intensity={3} distance={8} decay={2} />
      </group>

      {/* USA text area (simplified as a stripe) */}
      <mesh position={[0, 0.4, 0.41]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.5, 0.15]} />
        <meshStandardMaterial color="#1a3a8c" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
};

export default Rocket;
