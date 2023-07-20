import { useEffect, useState } from 'react';
import { User } from './User';
import { getUsers } from '../utils/serverHelper';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch {
        setIsError(true);
      }
    };

    loadUsers();
  }, []);

  return { users, isError };
};
