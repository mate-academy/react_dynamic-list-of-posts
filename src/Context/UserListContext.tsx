import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import * as userApiServise from '../api/UserApi';

type UserListContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const UserListContext = React.createContext<UserListContextType>({
  users: [],
  setUsers: () => {},
});

type UserListProviderProps = {
  children: React.ReactNode;
};

export const UserListProvider: React.FC<UserListProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userApiServise
      .getUsers()
      .then(response => {
        if (response.length > 0) {
          setUsers(response);
        }
      })
      .catch(() => {
        throw new Error('Something went wrong');
      });
  }, []);

  return (
    <UserListContext.Provider value={{ users, setUsers }}>
      {children}
    </UserListContext.Provider>
  );
};
