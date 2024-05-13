import { User } from '../types/User';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { getUsers } from '../api/users';

interface State {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialState: State = {
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
