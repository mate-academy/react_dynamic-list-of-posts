import { useState, useEffect } from 'react';

export function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(
    () => {
      const handler = setTimeout(() => setDebouncedValue(value), 1000);

      return () => clearTimeout(handler);
    }, [value],
  );

  return debouncedValue;
}
