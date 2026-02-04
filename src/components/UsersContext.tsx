import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type UsersContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>> | null;
};

const emptyUsers: User[] = [];

const UsersContext = createContext<UsersContextType>({
  users: emptyUsers,
  setUsers: null,
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(emptyUsers);

  useEffect(() => {
    client.get('/users').then(data => setUsers(data as User[]));
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
