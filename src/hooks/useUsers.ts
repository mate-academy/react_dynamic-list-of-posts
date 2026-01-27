import { useEffect, useState } from 'react';
import { getUser } from '../api/todos';
import { User } from '../types/User';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getUser()
      .then(setUsers)
      .catch(() => {
        setUsers([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading, hasError };
}
