import React, { useEffect, useMemo, useState } from 'react';
import { getUsers } from '../services/user';
import { User } from '../types/User';
import { UsersContextType } from '../types/ContextType';

export const UsersContext = React.createContext<UsersContextType>({
  users: [] as User[],
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const value = useMemo(
    () => ({
      users,
      selectedUser,
      setSelectedUser,
    }),
    [users, selectedUser],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
