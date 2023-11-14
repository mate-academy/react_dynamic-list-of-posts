import React, { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const UsersContext = React.createContext([] as User[]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Failed to fetch users.'));
  }, []);

  return (
    <UsersContext.Provider value={users}>
      {error ? <div>{error}</div> : children}
    </UsersContext.Provider>
  );
};

export function useUsers() {
  const users = useContext(UsersContext);

  return users;
}
