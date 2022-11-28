/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const UserContext = React.createContext<User[]>([]);

export const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  // const LoadUsers = async () => {
  //   const loadedUsers = await client.get<User[]>('/users');

  //   setUsers(loadedUsers);
  // };

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers);
    // LoadUsers();
  }, []);

  return (
    <UserContext.Provider value={users}>
      {children}
    </UserContext.Provider>
  );
};
