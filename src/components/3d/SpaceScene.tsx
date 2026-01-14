import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Stars from './Stars';
import Galaxy from './Galaxy';
import Earth from './Earth';
import Moon from './Moon';
import Rocket from './Rocket';
import Planets from './Planets';
import Nebula from './Nebula';
import FrameInvalidator from './FrameInvalidator';
import { useIsMobile } from '../../hooks/useIsMobile';

const SpaceScene = () => {
  const isMobile = useIsMobile();

  // Memoize canvas configuration based on device type
  const canvasConfig = useMemo(() => ({
    dpr: isMobile ? 1 : [1, 1.5] as [number, number],
    frameloop: isMobile ? 'demand' as const : 'always' as const,
    performance: isMobile ? { min: 0.3 } : { min: 0.5 },
  }), [isMobile]);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 70, near: 0.1, far: 500 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          precision: isMobile ? 'lowp' : 'highp',
          stencil: false,
          depth: true,
        }}
        dpr={canvasConfig.dpr}
        frameloop={canvasConfig.frameloop}
        performance={canvasConfig.performance}
      >
        <color attach="background" args={['#030308']} />

        {/* Subtle lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[15, 10, 10]} intensity={0.8} color="#fffaf0" />
        {!isMobile && <pointLight position={[-20, -15, -20]} intensity={0.3} color="#4466aa" />}

        <Suspense fallback={null}>
          {/* Invalidate frame on scroll for demand mode */}
          {isMobile && <FrameInvalidator />}

          {/* Background - far away */}
          <Galaxy />
          {!isMobile && <Nebula />}
          <Stars isMobile={isMobile} />

          {/* Planets that come closer with scroll */}
          <Planets isMobile={isMobile} />

          {/* Earth and Moon - main feature */}
          <Earth isMobile={isMobile} />
          <Moon isMobile={isMobile} />

          {/* Rocket - appears with scroll */}
          <Rocket />
        </Suspense>

        {/* Post-processing - disabled on mobile for performance */}
        {!isMobile && (
          <EffectComposer>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette offset={0.4} darkness={0.6} />
          </EffectComposer>
        )}

        <Preload all />
      </Canvas>
    </div>
  );
};

export default SpaceScene;
