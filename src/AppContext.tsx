import React, { useEffect, useMemo, useState } from 'react';
import { User } from './types/User';
import { Context } from './types/Context';
import { getUsers } from './api/users';

export const AppContext = React.createContext<Context>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => { },
});

interface Props {
  children: React.ReactNode,
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = useMemo(() => ({
    users,
    selectedUser,
    setSelectedUser,
  }), [users, selectedUser]);

  useEffect(() => {
    getUsers()
      .then((usersFromServer) => {
        setUsers(usersFromServer.slice(0, 11));
      });
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
