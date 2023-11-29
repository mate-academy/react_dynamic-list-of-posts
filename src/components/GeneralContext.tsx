import React, { useEffect, useState } from 'react';
import { getUser } from '../api/users';
import { User } from '../types/User';
import { Context } from '../types/Context';
import { Post } from '../types/Post';
import { ErrorType } from '../types/ErrorType';
import { Comment } from '../types/Comment';

const State: Context = {
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
  isPostsLoading: false,
  setIsPostsLoading: () => {},
  isCommentsLoading: false,
  setIsCommentsLoading: () => {},
  posts: [],
  setPosts: () => {},
  error: ErrorType.none,
  setError: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  isFormOpen: false,
  setIsFormOpen: () => {},
};

export const GlobalContext = React.createContext<Context>(State);

type Props = {
  children: React.ReactNode
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState(ErrorType.none);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getUser().then(setUsers);
  }, []);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    isPostsLoading,
    setIsPostsLoading,
    isCommentsLoading,
    setIsCommentsLoading,
    posts,
    setPosts,
    error,
    setError,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    isFormOpen,
    setIsFormOpen,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
