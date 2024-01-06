/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialPosts: Post[] = [];
const initialUsers: User[] = [];

type AppContextType = {
  posts: Post[],
  isPostsLoading: boolean,
  setIsPostsLoading: (loading: boolean) => void,
  postErrorMessage: string,
  setPostErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  loadPosts: (userId: number) => Promise<void>,

  users: User[],
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
};

export const AppContext = React.createContext<AppContextType>({
  posts: initialPosts,
  isPostsLoading: false,
  setIsPostsLoading: () => {},
  postErrorMessage: '',
  setPostErrorMessage: () => {},
  loadPosts: async (_userId: number) => {},

  users: initialUsers,
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const loadPosts = (userId: number) => {
    setIsPostsLoading(true);

    return getUserPosts(userId)
      .then(postsUser => setPosts(postsUser))
      .catch(() => setPostErrorMessage('Something went wrong!'))
      .finally(() => setIsPostsLoading(false));
  };

  const value = {
    posts,
    loadPosts,
    postErrorMessage,
    setPostErrorMessage,
    isPostsLoading,
    setIsPostsLoading,
    users,
    selectedUser,
    setSelectedUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
