import React, { useEffect, useRef, useState } from 'react';

export const useClickOutside = (initValue: boolean) => {
  const [isUsersVisible, setIsUsersVisible] = useState<boolean>(initValue);

  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: React.MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        setIsUsersVisible(false);
      }
    };

    document.addEventListener(
      'mousedown', maybeHandler as unknown as EventListener,
    );

    return () => {
      document.removeEventListener(
        'mousedown', maybeHandler as unknown as EventListener,
      );
    };
  }, []);

  return { domNode, isUsersVisible, setIsUsersVisible };
};
