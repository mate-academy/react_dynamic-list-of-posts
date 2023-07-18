import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useUserContext = () => {
  return useContext(UserContext);
};
