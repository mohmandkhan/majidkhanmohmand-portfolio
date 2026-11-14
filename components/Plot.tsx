'use client';

import { useEffect, useRef } from 'react';

/** A figure that plots itself once, as it comes into view: lines are drawn, bars grow, in the order of what they show
 *  (globals.css: [data-play]). Everything is drawn from the start — a figure already on screen when the page wakes, a
 *  visitor who prefers less motion, or a browser without IntersectionObserver simply keeps the finished drawing. */
export function Plot({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let first = true;
    const io = new IntersectionObserver(([e]) => {
      if (first) {
        first = false;
        if (e.isIntersecting) { io.disconnect(); return; }
      }
      if (e.isIntersecting) { el.dataset.play = ''; io.disconnect(); }
    }, { rootMargin: '0px 0px 8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
