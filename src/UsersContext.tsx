import React, { useContext, useMemo, useState } from 'react';
import { User } from './types/User';

interface UsersGlobalContext {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
}

const UsersContext = React.createContext<UsersGlobalContext>({
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = useMemo(() => {
    return {
      users,
      setUsers,
      selectedUser,
      setSelectedUser,
    };
  }, [users, selectedUser]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUsers() {
  const users = useContext(UsersContext);

  return users;
}
