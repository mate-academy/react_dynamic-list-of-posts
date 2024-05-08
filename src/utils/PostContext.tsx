import React, { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUsers } from '../components/api/users';

interface ContextTypes {
  users: User[];
  posts: Post[];
  selectedUser: Post | null;
  isPostLoading: boolean;
  isPostLoadingError: boolean;
}

const initContext = {
  users: [],
  posts: [],
  selectedUser: null,
  isPostLoading: false,
  isPostLoadingError: false,
};

const PostContext = React.createContext<ContextTypes>(initContext);

interface Props {
  children: React.ReactNode;
}

export const PostContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<Post | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostLoadingError, setIsPostLoadingError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setIsPostLoadingError(true);
      });
  }, []);

  const value = {
    users,
    posts,
    comments,
    selectedUser,
    isPostLoading,
    isPostLoadingError,
    setUsers,
    setPosts,
    setComments,
    setSelectedUser,
    setIsPostLoading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
