import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../utils/fetchClient';

type UserContextType = {
  setUsers: (users: User[]) => void;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User | null) => void;
  showUsers: boolean;
  setShowUsers: (showUsers: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  setUsers: () => {},
  users: [] as User[],
  selectedUser: null,
  setSelectedUser: () => {},
  showUsers: false,
  setShowUsers: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        showUsers,
        setShowUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
