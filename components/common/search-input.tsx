'use client';

import { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onDebouncedChange?: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

/**
 * 디바운스 내장 검색 입력 필드
 * onDebouncedChange에 디바운스된 값이 전달됩니다.
 */
export function SearchInput({
  placeholder = '검색...',
  defaultValue = '',
  onDebouncedChange,
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    setInputValue(value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDebouncedChange?.(value);
    }, debounceMs);
  };

  const handleClear = () => {
    setInputValue('');
    if (timerRef.current) clearTimeout(timerRef.current);
    onDebouncedChange?.('');
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pr-8 pl-9"
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
