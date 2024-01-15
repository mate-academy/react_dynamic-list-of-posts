import React, { useEffect, useMemo, useState } from 'react';

import { getUsers } from '../../api/data';
import { User } from '../../types/User';
import { MainContentType } from '../../types/MainContentType';

export interface UsersContextType {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  mainContent: MainContentType,
  setMainContent: (context: MainContentType) => void,
  selectedUser: User | null,
  setSelectedUser: (selectedUser: User | null) => void,
}

export const UsersContext = React.createContext<UsersContextType>({
  users: [],
  setUsers: () => { },
  mainContent: MainContentType.NoSelectedUser,
  setMainContent: () => {},
  selectedUser: null,
  setSelectedUser: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [mainContent, setMainContent]
    = useState<MainContentType>(MainContentType.NoSelectedUser);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setMainContent(MainContentType.PostsLoadingError));
  }, []);

  const value = useMemo(() => ({
    users,
    setUsers,
    mainContent,
    setMainContent,
    selectedUser,
    setSelectedUser,
  }), [users, mainContent, selectedUser]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
