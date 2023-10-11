import { createContext, useContext, useState } from 'react';
import { User } from '../types/User';

interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
  user: null,
  setUser: () => {},
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [user, setUser] = useState<User | null>(null);

  const value = {
    users,
    setUsers,
    user,
    setUser,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  return useContext(UsersContext);
};
