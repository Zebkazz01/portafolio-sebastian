import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

// Throttle function for performance
const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number): T => {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };

  return throttled as T;
};

export const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const setScrollProgress = useAppStore((state) => state.setScrollProgress);
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Use requestAnimationFrame for smoother updates
    rafIdRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0;

      setScrollY(currentScrollY);
      setScrollProgress(progress);

      // Determine active section - throttled separately
      const sections = ['hero', 'about', 'experience', 'education', 'projects', 'services', 'skills', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    });
  }, [setScrollProgress, setActiveSection]);

  useEffect(() => {
    // Throttle scroll events to ~60fps max (16ms), but use 32ms for mobile perf
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const throttleMs = isMobile ? 32 : 16;
    const throttledScroll = throttle(handleScroll, throttleMs);

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return { scrollY, scrollProgress: useAppStore((state) => state.scrollProgress) };
};
