import React, { useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (event: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick as unknown as EventListener);

    return () => {
      document.removeEventListener('click',
        handleClick as unknown as EventListener);
    };
  }, [ref]);

  return ref;
};
