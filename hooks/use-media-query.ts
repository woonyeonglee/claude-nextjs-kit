'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // 초기값을 lazy 함수로 처리하여 SSR에서 false, 클라이언트에서 실제 값 반환
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    // 이벤트 콜백 안에서만 setState 호출 (ESLint react-hooks/set-state-in-effect 준수)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
