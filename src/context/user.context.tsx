import React, {
  createContext, PropsWithChildren, useEffect, useState,
} from 'react';
import { IUser } from '../models/IUser';
import { getUsers } from '../api/user.api';

interface IUserContext {
  selectedUser: IUser | null,
  users: IUser[],
  onUserSelect: (user: IUser) => void,
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider:React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const usersFromApi = await getUsers();

      setUsers(usersFromApi);
    };

    loadUsers()
      .catch(() => setUsers([]));
  }, []);

  const onUserSelect = (user: IUser) => {
    setSelectedUser(user);
  };

  return (
    <UserContext.Provider value={{ selectedUser, users, onUserSelect }}>
      {children}
    </UserContext.Provider>
  );
};
