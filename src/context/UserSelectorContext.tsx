import { createContext } from 'react';
import { Error } from '../types/Error';

interface ContextType {
  currentUserId: number,
  error: Error;
}

const defaultValue = {
  currentUserId: 0,
  error: Error.None,
};

export const UserSelectorContext = createContext<ContextType>(defaultValue);
