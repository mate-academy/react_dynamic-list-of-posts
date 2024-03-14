import React, { useMemo, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

type ContextType = {
  users: User[];
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  selectedUser: User | null;
  errorMessage: boolean;
  selectedPost: Post | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const GlobalContext = React.createContext<ContextType>({
  users: [],
  posts: [],
  comments: [],
  loading: false,
  errorMessage: false,
  selectedUser: null,
  selectedPost: null,
  setPosts: () => {},
  setUsers: () => {},
  setComments: () => {},
  setLoading: () => {},
  setErrorMessage: () => {},
  setSelectedUser: () => {},
  setSelectedPost: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvaider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const value = useMemo(
    () => ({
      posts,
      users,
      comments,
      loading,
      errorMessage,
      selectedUser,
      selectedPost,
      setPosts,
      setUsers,
      setComments,
      setLoading,
      setErrorMessage,
      setSelectedUser,
      setSelectedPost,
    }),
    [posts, users, comments, loading, errorMessage, selectedUser, selectedPost],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
