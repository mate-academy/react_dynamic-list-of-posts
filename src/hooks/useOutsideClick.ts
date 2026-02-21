import React, { useEffect } from 'react';

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // We use direct DOM interaction here because React's event system
    // does not provide a built-in way to detect clicks outside of a specific element
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}
