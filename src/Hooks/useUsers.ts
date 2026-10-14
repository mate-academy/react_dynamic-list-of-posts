import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/getUsers';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorText('');
    getUsers()
      .then(setUsers)
      .catch(() => setErrorText('Unable to get users'))
      .finally(() => setIsLoading(false));
  }, []);

  return { users, setUsers, isLoading, errorText };
}
