import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';

/**
 * Component that invalidates the Three.js frame for smooth interpolation.
 * Continuously invalidates while there's a difference between current and target scroll.
 */
const FrameInvalidator = () => {
  const { invalidate } = useThree();
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const smoothedRef = useRef(scrollProgress);
  const threshold = 0.0001;

  useFrame(() => {
    // Check if we need to keep animating
    const diff = Math.abs(scrollProgress - smoothedRef.current);

    if (diff > threshold) {
      // Lerp towards target
      smoothedRef.current += (scrollProgress - smoothedRef.current) * 0.08;
      invalidate();
    }
  });

  return null;
};

export default FrameInvalidator;
