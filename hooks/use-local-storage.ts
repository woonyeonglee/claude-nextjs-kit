'use client';

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // lazy 초기화로 첫 렌더 시 localStorage에서 값을 읽어옴
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // 저장 실패 시 무시
    }
  };

  return [storedValue, setValue] as const;
}
