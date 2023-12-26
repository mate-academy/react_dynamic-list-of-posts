import React, { useEffect, useState } from 'react';
import * as API_USERS from '../api/users';
import * as API_POSTS from '../api/posts';
import { User } from '../types/User';
import { Post } from '../types/Post';

type AppContexTypes = {
  getUsersList: () => Promise<User[]>,
  getUserPosts: (userId: number) => Promise<Post[]>,
  users: User[],
  setUsers: (users: User[]) => void,
  selectedUser: User | null,
  setSelectedUser: (selectedUser: User | null) => void,
  userPosts: Post[] | null,
  setUserPosts: (userPosts: Post[] | null) => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  error: boolean,
  setError: (error: boolean) => void,
};

export const AppContext = React.createContext({} as AppContexTypes);

type AppProviderProps = {
  children: React.ReactNode,
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const getUsersList = async (): Promise<User[]> => API_USERS.getUsers();
  const getUserPosts = async (userId: number): Promise<Post[]> => {
    return API_POSTS.getUserPost(userId);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsersList()
      .then(usersList => {
        setUsers(usersList);
        setError(false);
      })
      .catch(() => setError(true));
  }, []);

  const value = {
    getUsersList,
    getUserPosts,
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userPosts,
    setUserPosts,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
};
