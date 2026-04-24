import React, { createContext, useMemo, useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UsersContext = createContext<Props>({
  users: [],
  setUsers: () => {},
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
    }),
    [users],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
