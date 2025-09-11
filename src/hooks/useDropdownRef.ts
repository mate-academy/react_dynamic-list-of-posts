import { useEffect, useRef } from 'react';

export const useDropdownRef = (
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    dropdownRef,
  };
};
