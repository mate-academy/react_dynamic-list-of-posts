import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

const initialUsers: User[] = [];

type UsersContextType = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  loadUsers: () => Promise<void>;
};

export const UsersContext = React.createContext<UsersContextType>({
  users: initialUsers,
  selectedUser: null,
  setSelectedUser: () => {},
  loadUsers: async () => { },
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function loadUsers() {
    return client.get<User[]>('/users')
      .then(setUsers);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    loadUsers,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
