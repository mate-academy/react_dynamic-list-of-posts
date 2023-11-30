import { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  callback: (T?: any) => void,
) => {
  const handleClick = (e: Event) => {
    if (
      ref
      && ref.current
      && !ref.current.contains(<HTMLElement>e.target)
    ) {
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
