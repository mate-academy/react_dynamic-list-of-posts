import React, { createContext, useMemo, useState } from 'react';
import { User } from '../types/User';
import { Errors } from '../enums/Errors';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type UserContextType = {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  errorMessage: Errors | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<Errors | null>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isOpenNewComment: boolean;
  setIsOpenNewComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<UserContextType>({
  users: null,
  setUsers: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  isOpenNewComment: false,
  setIsOpenNewComment: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenNewComment, setIsOpenNewComment] = useState(false);

  const value = useMemo(
    () => ({
      users,
      setUsers,
      errorMessage,
      setErrorMessage,
      selectedUser,
      setSelectedUser,
      posts,
      setPosts,
      selectedPost,
      setSelectedPost,
      comments,
      setComments,
      isOpenNewComment,
      setIsOpenNewComment,
    }),
    [
      comments,
      errorMessage,
      isOpenNewComment,
      posts,
      selectedPost,
      selectedUser,
      users,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
