import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface MeteoriteProps {
  startPosition: [number, number, number];
  speed: number;
  size: number;
  delay: number;
}

const Meteorite = ({ startPosition, speed, size, delay }: MeteoriteProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);
  const timeRef = useRef(delay);

  // Create trail positions
  const trailPositions = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = i * 0.3;
      pos[i * 3 + 1] = -i * 0.3;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, []);

  // Irregular meteorite geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(size, 1);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const noise = (Math.random() - 0.5) * size * 0.4;
      positions[i] += noise;
      positions[i + 1] += noise;
      positions[i + 2] += noise;
    }

    geo.computeVertexNormals();
    return geo;
  }, [size]);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const t = (timeRef.current * speed) % 30;

      // Move diagonally across screen
      groupRef.current.position.x = startPosition[0] - t * 3;
      groupRef.current.position.y = startPosition[1] - t * 3;
      groupRef.current.position.z = startPosition[2] + Math.sin(t) * 2;

      // Rotate the meteorite
      groupRef.current.rotation.x += delta * 2;
      groupRef.current.rotation.y += delta * 1.5;

      // Reset position when off screen
      if (t < 0.1) {
        groupRef.current.position.set(...startPosition);
      }
    }
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {/* Meteorite body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.9}
          metalness={0.1}
          emissive="#ff4400"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing core */}
      <mesh scale={0.7}>
        <icosahedronGeometry args={[size, 0]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.5} />
      </mesh>

      {/* Trail */}
      <points ref={trailRef} position={[size, -size, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size * 0.8}
          color="#ff9900"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

const Meteorites = () => {
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  // Only show meteorites during certain scroll positions
  const visible = scrollProgress > 0.1 && scrollProgress < 0.9;

  const meteorites = useMemo(() => [
    { startPosition: [30, 20, -20] as [number, number, number], speed: 0.8, size: 0.4, delay: 0 },
    { startPosition: [25, 25, -15] as [number, number, number], speed: 1.2, size: 0.3, delay: 3 },
    { startPosition: [35, 15, -25] as [number, number, number], speed: 0.6, size: 0.5, delay: 6 },
    { startPosition: [20, 30, -18] as [number, number, number], speed: 1.0, size: 0.25, delay: 9 },
    { startPosition: [40, 10, -22] as [number, number, number], speed: 0.9, size: 0.35, delay: 12 },
  ], []);

  if (!visible) return null;

  return (
    <group>
      {meteorites.map((props, i) => (
        <Meteorite key={i} {...props} />
      ))}
    </group>
  );
};

export default Meteorites;
