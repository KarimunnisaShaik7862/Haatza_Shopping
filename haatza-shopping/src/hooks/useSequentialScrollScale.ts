import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseSequentialScrollScaleOptions {
  itemCount: number;
  staggerMs?: number; // default: 130ms
  entranceDurationMs?: number; // default: 600ms
  initialScale?: number; // default: 0.85
  offscreenScale?: number; // default: 0.85
  initialOpacity?: number; // default: 0.6
  initialTranslateY?: number; // default: 10
  offscreenOpacity?: number; // default: 0.6
}

/**
 * Custom hook implementing sequential small-to-large scroll-driven animations:
 * 1. Sequential vertical entrance: starts at scale / opacity and grows to 1.0 one card at a time (staggered).
 * 2. Horizontal scroll transitions: cards revealed as user scrolls horizontally smoothly transition and scale up.
 * 3. Two-way scroll support: resets whenever scrolled out of view (scrolling up/down or left/right) and replays upon re-entering.
 * 4. Supports page refresh, opening in a new tab, closing and reopening, and tab focus changes.
 * 5. Reduced motion support: disables scaling for users requesting prefers-reduced-motion.
 */
export function useSequentialScrollScale(options: UseSequentialScrollScaleOptions) {
  const {
    itemCount,
    staggerMs = 130,
    entranceDurationMs = 600,
    initialScale = 0.85,
    offscreenScale = 0.85,
    initialOpacity = 0.6,
    initialTranslateY = 10,
    offscreenOpacity = initialOpacity !== undefined ? initialOpacity : 0.6,
  } = options;

  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const hasEnteredRef = useRef(false);

  // Horizontal visibility tracking for each individual card item
  const [enteredItems, setEnteredItems] = useState<boolean[]>(() =>
    new Array(itemCount).fill(false)
  );
  const enteredItemsRef = useRef<boolean[]>(new Array(itemCount).fill(false));
  const isInitialBatchRef = useRef<boolean[]>(new Array(itemCount).fill(false));
  const initialBatchIndexRef = useRef<number[]>(new Array(itemCount).fill(0));
  const hasTriggeredInitialBatchRef = useRef(false);

  // Keep ref synchronized with state
  useEffect(() => {
    hasEnteredRef.current = hasEntered;
  }, [hasEntered]);

  // Reset arrays when itemCount changes
  useEffect(() => {
    enteredItemsRef.current = new Array(itemCount).fill(false);
    isInitialBatchRef.current = new Array(itemCount).fill(false);
    initialBatchIndexRef.current = new Array(itemCount).fill(0);
    hasTriggeredInitialBatchRef.current = false;
    setEnteredItems(new Array(itemCount).fill(false));
  }, [itemCount]);

  // Detect user's motion preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // Check horizontal visibility for all cards within the horizontal scroll container
  const checkHorizontalVisibility = useCallback(() => {
    if (prefersReducedMotion) return;
    if (!hasEnteredRef.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0) return;

    let changed = false;
    const nextEntered = [...enteredItemsRef.current];

    if (!hasTriggeredInitialBatchRef.current) {
      let initialCount = 0;
      for (let i = 0; i < itemCount; i++) {
        const item = itemRefs.current[i];
        if (!item) continue;
        const iRect = item.getBoundingClientRect();
        // Item is visible within the container's horizontal bounds
        const isInHorizontalView = iRect.right > cRect.left + 15 && iRect.left < cRect.right - 15;
        if (isInHorizontalView) {
          nextEntered[i] = true;
          isInitialBatchRef.current[i] = true;
          initialBatchIndexRef.current[i] = initialCount++;
          changed = true;
        } else {
          nextEntered[i] = false;
          isInitialBatchRef.current[i] = false;
        }
      }
      if (initialCount > 0) {
        hasTriggeredInitialBatchRef.current = true;
      }
    } else {
      // Horizontal scrolling: evaluate cards entering or leaving
      for (let i = 0; i < itemCount; i++) {
        const item = itemRefs.current[i];
        if (!item) continue;
        const iRect = item.getBoundingClientRect();

        const isInHorizontalView = iRect.right > cRect.left + 15 && iRect.left < cRect.right - 15;
        const isOutOfHorizontalView = iRect.left >= cRect.right + 40 || iRect.right <= cRect.left - 40;

        if (isInHorizontalView && !nextEntered[i]) {
          nextEntered[i] = true;
          isInitialBatchRef.current[i] = false; // Triggered via horizontal scroll
          changed = true;
        } else if (isOutOfHorizontalView && nextEntered[i]) {
          nextEntered[i] = false;
          isInitialBatchRef.current[i] = false;
          changed = true;
        }
      }
    }

    if (changed) {
      enteredItemsRef.current = nextEntered;
      setEnteredItems(nextEntered);
    }
  }, [itemCount, prefersReducedMotion]);

  // Check whether the section is in view or completely out of view vertically
  const checkVisibility = useCallback(() => {
    if (prefersReducedMotion) {
      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true;
        setHasEntered(true);
      }
      return;
    }

    const target = sectionRef.current || scrollContainerRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // In viewport: top of section has entered into view and bottom hasn't completely left
    const inView = rect.top < vh - 40 && rect.bottom > 40;

    // Out of viewport: completely scrolled above (bottom <= 0) or completely scrolled below (top >= vh)
    const outOfView = rect.bottom <= 0 || rect.top >= vh;

    if (inView) {
      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true;
        setHasEntered(true);
      }
      requestAnimationFrame(() => {
        checkHorizontalVisibility();
      });
    } else if (outOfView) {
      if (hasEnteredRef.current) {
        hasEnteredRef.current = false;
        hasTriggeredInitialBatchRef.current = false;
        enteredItemsRef.current = new Array(itemCount).fill(false);
        isInitialBatchRef.current = new Array(itemCount).fill(false);
        initialBatchIndexRef.current = new Array(itemCount).fill(0);
        setHasEntered(false);
        setEnteredItems(new Array(itemCount).fill(false));
      }
    }
  }, [itemCount, prefersReducedMotion, checkHorizontalVisibility]);

  // Window scroll and resize listeners + IntersectionObserver for reliable scroll up & down detection
  useEffect(() => {
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    let observer: IntersectionObserver | null = null;
    const target = sectionRef.current || scrollContainerRef.current;

    if (target && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
              if (!hasEnteredRef.current) {
                hasEnteredRef.current = true;
                setHasEntered(true);
              }
              requestAnimationFrame(() => {
                checkHorizontalVisibility();
              });
            } else if (!entry.isIntersecting) {
              if (hasEnteredRef.current) {
                hasEnteredRef.current = false;
                hasTriggeredInitialBatchRef.current = false;
                enteredItemsRef.current = new Array(itemCount).fill(false);
                isInitialBatchRef.current = new Array(itemCount).fill(false);
                initialBatchIndexRef.current = new Array(itemCount).fill(0);
                setHasEntered(false);
                setEnteredItems(new Array(itemCount).fill(false));
              }
            }
          }
        },
        {
          threshold: [0, 0.05, 0.15, 0.3],
        }
      );
      observer.observe(target);
    }

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer) observer.disconnect();
    };
  }, [checkVisibility, checkHorizontalVisibility, itemCount]);

  // Listen to horizontal scrolling on the container itself
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        checkHorizontalVisibility();
        rafId = null;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [checkHorizontalVisibility]);

  // Handle page refresh, new tab, window focus, tab visibilitychange, and initial mount
  useEffect(() => {
    // 1. Initial check immediately on mount
    checkVisibility();

    // 2. Next animation frame
    const rafId = requestAnimationFrame(() => {
      checkVisibility();
      checkHorizontalVisibility();
    });

    // 3. Staggered checks for asynchronous data / image load layout updates
    const t1 = setTimeout(() => { checkVisibility(); checkHorizontalVisibility(); }, 50);
    const t2 = setTimeout(() => { checkVisibility(); checkHorizontalVisibility(); }, 200);
    const t3 = setTimeout(() => { checkVisibility(); checkHorizontalVisibility(); }, 500);

    // 4. Tab visibility change & focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVisibility();
        checkHorizontalVisibility();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkVisibility);
    };
  }, [checkVisibility, checkHorizontalVisibility]);

  // Returns stable CSS transition properties for each card
  const getItemStyle = (index: number): React.CSSProperties => {
    if (prefersReducedMotion) {
      return {
        transform: 'none',
        opacity: 1,
      };
    }

    const initialTransform = initialTranslateY
      ? `translateY(${initialTranslateY}px) scale(${initialScale})`
      : `scale(${initialScale})`;

    const normalTransform = initialTranslateY
      ? 'translateY(0) scale(1)'
      : 'scale(1)';

    // Phase 1: Section is out of view OR item is not in horizontal view yet
    if (!hasEntered || !enteredItems[index]) {
      return {
        transform: initialTransform,
        opacity: initialOpacity,
        transition: 'transform 200ms ease-out, opacity 200ms ease-out',
      };
    }

    // Phase 2: Item is in view!
    // Stagger delay only applies to initial batch of visible cards on section reveal
    // Cards revealed during horizontal scrolling animate in immediately (0ms delay)
    const delayMs = isInitialBatchRef.current[index]
      ? initialBatchIndexRef.current[index] * staggerMs
      : 0;

    return {
      transform: normalTransform,
      opacity: 1,
      transition: `transform ${entranceDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity ${entranceDurationMs}ms ease-out ${delayMs}ms`,
    };
  };

  return {
    sectionRef,
    scrollContainerRef,
    itemRefs,
    hasEntered,
    prefersReducedMotion,
    getItemStyle,
  };
}
