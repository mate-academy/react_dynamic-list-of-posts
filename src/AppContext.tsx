import React, { useEffect, useMemo, useState } from 'react';
import { User } from './types/User';
import { Context } from './types/Context';
import * as service from './api/api';
import { Post } from './types/Post';
// import { Comment } from './types/Comment';

export const AppContext = React.createContext<Context>({
  users: [],
  posts: [],
  setPosts: () => { },
  isUserError: false,
  setIsUserError: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
});

interface Props {
  children: React.ReactNode,
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUserError, setIsUserError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const value = useMemo(() => ({
    users,
    posts,
    setPosts,
    isUserError,
    setIsUserError,
    selectedUser,
    setSelectedUser,
    selectedPost,
    setSelectedPost,
  }), [users, selectedUser, posts, selectedPost, isUserError]);

  useEffect(() => {
    service.getUsers()
      .then(setUsers)
      .catch(() => setIsUserError(true));
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
