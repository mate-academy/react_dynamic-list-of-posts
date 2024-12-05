import { useCallback, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from './../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {}
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    currentUser,
    setCurrentUser,
  };
};
