import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface StarLayerProps {
  count: number;
  radius: number;
  size: number;
  color: string;
  speed: number;
  depth: number;
}

const StarLayer = ({ count, radius, size, color, speed, depth }: StarLayerProps) => {
  const ref = useRef<THREE.Points>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - depth;
    }
    return pos;
  }, [count, radius, depth]);

  useFrame((state) => {
    if (ref.current) {
      // Subtle rotation
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.002;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.001;

      // Enhanced parallax movement - more noticeable depth effect
      ref.current.position.z = scrollProgress * depth * 0.8;
      ref.current.position.y = scrollProgress * depth * 0.15;
      ref.current.position.x = Math.sin(scrollProgress * Math.PI) * depth * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </Points>
  );
};

interface StarsProps {
  isMobile?: boolean;
}

const Stars = ({ isMobile = false }: StarsProps) => {
  // Reduce star count on mobile for better performance
  const starMultiplier = isMobile ? 0.3 : 1;

  return (
    <group>
      <StarLayer
        count={Math.floor(1200 * starMultiplier)}
        radius={200}
        size={isMobile ? 0.4 : 0.3}
        color="#ffffff"
        speed={0.03}
        depth={100}
      />
      <StarLayer
        count={Math.floor(600 * starMultiplier)}
        radius={150}
        size={isMobile ? 0.6 : 0.5}
        color="#f0f0ff"
        speed={0.05}
        depth={60}
      />
      {!isMobile && (
        <StarLayer
          count={250}
          radius={100}
          size={0.7}
          color="#fffef0"
          speed={0.07}
          depth={30}
        />
      )}
    </group>
  );
};

export default Stars;
