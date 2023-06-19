import React, { useState, useEffect, useRef } from 'react';

export default function useClickOutside(initialIsVisible: boolean) {
  const [isOpened, setIsOpened] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click',
      handleClickOutside as unknown as EventListener);

    return () => {
      document.removeEventListener('click',
        handleClickOutside as unknown as EventListener);
    };
  }, []);

  return { ref, isOpened, setIsOpened };
}
