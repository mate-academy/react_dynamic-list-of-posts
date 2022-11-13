import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  return (
    <UserContext.Provider value={users}>
      {children}
    </UserContext.Provider>
  );
};
