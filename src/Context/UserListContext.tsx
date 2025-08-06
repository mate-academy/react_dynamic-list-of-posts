import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import * as userApiServise from '../api/UserApi';

type UserListContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  errorGetUsers: boolean;
  setErrorGetUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserListContext = React.createContext<UserListContextType>({
  users: [],
  setUsers: () => {},
  errorGetUsers: false,
  setErrorGetUsers: () => {},
});

type UserListProviderProps = {
  children: React.ReactNode;
};

export const UserListProvider: React.FC<UserListProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorGetUsers, setErrorGetUsers] = useState(false);

  useEffect(() => {
    userApiServise
      .getUsers()
      .then(response => {
        if (response.length > 0) {
          setUsers(response);
        }
      })
      .catch(() => {
        setErrorGetUsers(true);
      });
  }, []);

  return (
    <UserListContext.Provider
      value={{ users, setUsers, errorGetUsers, setErrorGetUsers }}
    >
      {children}
    </UserListContext.Provider>
  );
};
