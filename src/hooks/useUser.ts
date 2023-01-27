import { useQuery } from '@tanstack/react-query';
import { getById } from '../api/users';

export const useUser = (id: number) => {
  return useQuery(['user', id], {
    queryFn: () => getById(id),
  });
};
