import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseScrollLinkedCardScaleOptions {
  itemCount: number;
  initialScale?: number;   // default: 0.8
  finalScale?: number;     // default: 1.0
  initialOpacity?: number; // default: 0.6
  finalOpacity?: number;   // default: 1.0
  maxTranslateY?: number;  // default: 20 (px)
  staggerGap?: number;     // default: 0.08 (subtle sequential stagger between cards)
  windowSize?: number;     // default: 0.45 (smooth growth duration per card)
}

/**
 * Custom hook implementing smooth, scroll-linked progressive animations for product cards:
 * 1. Small-to-big scale: cards gradually scale from initialScale (0.8) to finalScale (1.0).
 * 2. Opacity transition: cards transition from initialOpacity (0.6) to finalOpacity (1.0).
 * 3. Movement: slight upward movement from maxTranslateY (20px) to 0px.
 * 4. Sequential stagger: Card 0 starts first, Card 1 follows, Card 2 follows, etc.
 * 5. Scroll-linked progress: directly bound to user's scroll position in real time.
 *    - Scrolling forward grows the cards.
 *    - Reversing scroll smoothly reverses the scale.
 *    - Stopping scroll holds cards at their current size.
 * 6. Reduced motion: respects prefers-reduced-motion.
 */
export function useScrollLinkedCardScale(options: UseScrollLinkedCardScaleOptions) {
  const {
    itemCount,
    initialScale = 0.85,
    finalScale = 1.0,
    initialOpacity = 0.6,
    finalOpacity = 1.0,
    maxTranslateY = 12,
    staggerGap = 0.08,
    windowSize = 0.45,
  } = options;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Calculate live scroll progress directly bound to the section's position in the viewport
  const updateScrollProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Progress as section enters from bottom of viewport:
    // Starts when rect.top reaches vh * 0.85 -> 0, reaches 1.0 when rect.top reaches vh * 0.10
    const enterSpan = windowHeight * 0.75;
    const enterProgress = Math.max(0, Math.min(1, (windowHeight * 0.85 - rect.top) / enterSpan));

    // Progress as section enters from top of viewport (scrolling up from below):
    // Starts when rect.bottom reaches vh * 0.15 -> 0, reaches 1.0 when rect.bottom reaches vh * 0.90
    const exitSpan = windowHeight * 0.75;
    const exitProgress = Math.max(0, Math.min(1, (rect.bottom - windowHeight * 0.15) / exitSpan));

    // Combined progress: 0 when outside viewport, 1.0 when comfortably in view
    const overallProgress = Math.min(enterProgress, exitProgress);

    setScrollProgress(overallProgress);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollProgress(1);
      return;
    }

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial measure on mount
    updateScrollProgress();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion, updateScrollProgress]);

  // Returns live scroll-linked CSS properties for card at index i
  const getCardStyle = useCallback(
    (index: number): React.CSSProperties => {
      if (prefersReducedMotion) {
        return {
          transform: 'none',
          opacity: 1,
        };
      }

      // Map overall progress to this card's specific active window for sequential growth
      const start = Math.min(index * staggerGap, 0.55);
      const end = start + windowSize;

      let cardP = (scrollProgress - start) / (end - start);
      cardP = Math.max(0, Math.min(1, cardP));

      // Natural ease-out curve (smooth deceleration without sudden jumps)
      const easedP = 1 - Math.pow(1 - cardP, 2.2);

      const scale = initialScale + (finalScale - initialScale) * easedP;
      const opacity = initialOpacity + (finalOpacity - initialOpacity) * easedP;
      const translateY = maxTranslateY * (1 - easedP);

      return {
        transform: `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`,
        opacity: Number(opacity.toFixed(3)),
        transition: 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease-out',
      };
    },
    [
      scrollProgress,
      prefersReducedMotion,
      staggerGap,
      windowSize,
      initialScale,
      finalScale,
      initialOpacity,
      finalOpacity,
      maxTranslateY,
    ]
  );

  return {
    sectionRef,
    scrollProgress,
    prefersReducedMotion,
    getCardStyle,
  };
}
