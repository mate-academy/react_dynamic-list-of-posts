import React, { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [ref, handler]);
};
