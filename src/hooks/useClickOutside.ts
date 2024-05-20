import { RefObject, useEffect } from 'react';

type ClickOutsideHandler = (event: MouseEvent) => void;

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: ClickOutsideHandler,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};
