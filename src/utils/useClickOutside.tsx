import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: VoidFunction,
) => {
  const handleClick = (event: MouseEvent | TouchEvent) => {
    const { target } = event;

    const current = ref?.current;

    if (target instanceof Node && !current?.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
