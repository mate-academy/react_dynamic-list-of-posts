import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialUsers: User[] = [];

type UsersContextType = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
};

export const UsersContext = React.createContext<UsersContextType>({
  users: initialUsers,
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const UsersProvaider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const value = {
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
