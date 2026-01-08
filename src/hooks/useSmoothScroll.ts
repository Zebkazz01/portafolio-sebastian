import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../store/useAppStore';

/**
 * Hook that provides a smoothly interpolated scroll progress value.
 * Uses lerp (linear interpolation) to create buttery smooth animations.
 *
 * @param lerpFactor - How fast to interpolate (0.01 = very smooth, 0.1 = responsive)
 * @returns The smoothed scroll progress value (0-1)
 */
export const useSmoothScroll = (lerpFactor = 0.08) => {
  const scrollProgress = useAppStore((state) => state.scrollProgress);
  const smoothedRef = useRef(scrollProgress);

  useFrame(() => {
    // Lerp: smoothed += (target - smoothed) * factor
    smoothedRef.current += (scrollProgress - smoothedRef.current) * lerpFactor;
  });

  return smoothedRef;
};

/**
 * Utility lerp function for manual interpolation
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};
