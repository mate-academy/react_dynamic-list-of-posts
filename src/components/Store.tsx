import React, { useEffect, useMemo, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

const USER_URL = '/users';

type ContextType = {
  users: User[];
};

export const Context = React.createContext<ContextType>({
  users: [],
});

type Props = {
  children: React.ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    client
      .get<User[]>(USER_URL)
      .then(response => setUsers(response))
      .catch(() => {});
  }, []);

  const value = useMemo(
    () => ({
      users,
    }),
    [users],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
