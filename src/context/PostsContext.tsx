import React, { useMemo, useEffect } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/PostsApi';

type PostsContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  userError: boolean;
  setUserError: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue: PostsContextType = {
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  userError: false,
  setUserError: () => {},
};

export const PostsContext = React.createContext<PostsContextType>(defaultValue);

export const PostsProvider: React.FC = ({ children }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [userError, setUserError] = React.useState(false);

  const value = useMemo(() => ({
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userError,
    setUserError,
  }), [users, selectedUser, userError]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setUserError(true);
      });
  }, []);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
