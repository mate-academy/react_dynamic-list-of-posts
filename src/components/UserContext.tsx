import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { UsersContext } from '../types/UsersContext';
import { getUsers } from '../api/users';

const initialState = {
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
};

export const UserContext = React.createContext<UsersContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      throw new Error('Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // useEffect(() => {
  //   getUsers()
  //     .then(usersData => setUsers(usersData));
  // }, []);

  const value = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>

  );
};
