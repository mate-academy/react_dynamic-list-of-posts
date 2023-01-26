import { useQuery } from '@tanstack/react-query';
import { getAll } from '../api/users';

export const useUsers = () => {
  return useQuery(['users'], getAll);
};
