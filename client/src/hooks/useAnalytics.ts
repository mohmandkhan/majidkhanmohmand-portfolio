import { useEffect, useRef } from 'react';
import { trpc } from '@/lib/trpc';

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

/**
 * Hook to track page views and user interactions
 */
export function useAnalytics(pageName: string) {
  const trackEventMutation = trpc.analytics.track.useMutation();
  const sessionIdRef = useRef(getSessionId());

  // Track page view on mount
  useEffect(() => {
    trackEventMutation.mutate({
      eventType: 'page_view',
      eventName: `view_${pageName}`,
      pagePath: window.location.pathname,
      sessionId: sessionIdRef.current,
    });
  }, [pageName, trackEventMutation]);

  // Track clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickTarget = target.closest('a, button');
      
      if (clickTarget) {
        const text = clickTarget.textContent?.trim() || 'unknown';
        trackEventMutation.mutate({
          eventType: 'click',
          eventName: `click_${text.toLowerCase().replace(/\s+/g, '_')}`,
          pagePath: window.location.pathname,
          sessionId: sessionIdRef.current,
          metadata: {
            target: clickTarget.tagName,
            text: text.substring(0, 50),
          },
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackEventMutation]);

  return {
    trackEvent: (eventName: string, metadata?: Record<string, any>) => {
      trackEventMutation.mutate({
        eventType: 'custom',
        eventName,
        pagePath: window.location.pathname,
        sessionId: sessionIdRef.current,
        metadata,
      });
    },
  };
}
