import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll: flips `isVisible` to true the first time the element
 * enters the viewport, then disconnects. Animate-once is deliberate — the
 * previous version toggled visibility with `entry.isIntersecting`, so
 * sections blanked out (opacity-0) whenever the visitor scrolled back up,
 * and its `options`-object dependency recreated the observer every render.
 */
export const useScrollAnimation = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(currentElement);
    return () => observer.disconnect();
    // Run once on mount; `options` is a per-render literal at every call site,
    // so depending on it would tear down and recreate the observer each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { elementRef, isVisible };
};
