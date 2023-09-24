import { createContext, useState, useMemo } from 'react';
import { User } from '../types/User';

export const UsersContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  users: [],
  setUsers: () => {},
  user: null,
  setUser: () => {},
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({
    users,
    setUsers,
    user,
    setUser,
  }), [users, user]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
