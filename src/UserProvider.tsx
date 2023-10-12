import React, { useMemo, useState } from 'react';
import { User } from './types/User';

type ContextProps = {
  users: User[],
  setUsers: (newUsers: User[]) => void,
  selectedUser: User | null,
  setSelectedUser: (newUser: User) => void,
};

export const UserContext = React.createContext<ContextProps>({
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = useMemo(() => ({
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
  }), [users, selectedUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
