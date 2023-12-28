import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import {
  getUsers as getUsersFromServer,
} from '../api/users';

interface UsersContextType {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
}

export const UsersContext = React.createContext<UsersContextType>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
});

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsersFromServer().then(setUsers);
  }, []);

  const value: UsersContextType = {
    users,
    selectedUser,
    setSelectedUser,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
