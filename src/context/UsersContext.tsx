import React, { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const UsersContext = React.createContext([] as User[]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUsers() {
  const users = useContext(UsersContext);

  return users;
}
