import { useCallback, useState } from 'react';

type ReturnType = [boolean, () => void];

export const useToggle = (initialState = false): ReturnType => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(currentState => !currentState), []);

  return [state, toggle];
};
