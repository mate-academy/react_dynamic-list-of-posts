import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type UseUsers = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};

export const useUsers = (): UseUsers => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    users,
    isLoading,
    hasError,
  };
};
