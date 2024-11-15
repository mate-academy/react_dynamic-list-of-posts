import { useLayoutEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isUserError, setUserError] = useState('');

  useLayoutEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((error: Error) => setUserError(error.message));
  }, []);

  return {
    users,
    selectedUser,
    isUserMenuOpen,
    isUserError,

    setSelectedUser,
    setUserMenuOpen,
  };
};
