import { useQuery } from '@tanstack/react-query';
import { getAll } from '../api/users';
import { User } from '../types/User';

export const useUsers = () => {
  return useQuery<User[]>(['users'], getAll);
};
