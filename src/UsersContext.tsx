import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';

type UsersContextType = {
  usersFromServer: User[];
  errorMessage: boolean;
};

export const UsersContext = React.createContext<UsersContextType>({
  usersFromServer: [],
  errorMessage: false,
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvide: React.FC<Props> = ({ children }) => {
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const users:User[] = await client.get('/users');

        setUsersFromServer(users);
      } catch {
        setErrorMessage(true);
      }
    })();
  }, []);

  const value = {
    usersFromServer,
    errorMessage,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
