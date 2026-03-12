import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/**
 * 텍스트를 클립보드에 복사하는 훅
 * @param resetDelay - 복사 상태 초기화 시간 (ms), 기본값 2000ms
 */
export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        console.error('클립보드 복사 실패');
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
