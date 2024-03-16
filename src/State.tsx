import React, { useMemo, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

type ContextType = {
  users: User[];
  posts: Post[];
  comments: Comment[];
  isloadingPosts: boolean;
  isLoadingComments: boolean;
  selectedUser: User | null;
  errorMessage: boolean;
  selectedPost: Post | null;
  isShowForm: boolean;
  isErrorForm: boolean;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsloadingPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingComments: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsErrorForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = React.createContext<ContextType>({
  users: [],
  posts: [],
  comments: [],
  isloadingPosts: false,
  isLoadingComments: false,
  errorMessage: false,
  selectedUser: null,
  selectedPost: null,
  isShowForm: false,
  isErrorForm: false,
  setPosts: () => {},
  setUsers: () => {},
  setComments: () => {},
  setIsloadingPosts: () => {},
  setIsLoadingComments: () => {},
  setErrorMessage: () => {},
  setSelectedUser: () => {},
  setSelectedPost: () => {},
  setIsShowForm: () => {},
  setIsErrorForm: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvaider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isloadingPosts, setIsloadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isErrorForm, setIsErrorForm] = useState(false);

  const value = useMemo(
    () => ({
      posts,
      users,
      comments,
      isloadingPosts,
      isLoadingComments,
      errorMessage,
      selectedUser,
      selectedPost,
      isShowForm,
      isErrorForm,
      setPosts,
      setUsers,
      setComments,
      setIsloadingPosts,
      setIsLoadingComments,
      setErrorMessage,
      setSelectedUser,
      setSelectedPost,
      setIsShowForm,
      setIsErrorForm,
    }),
    [
      posts,
      users,
      comments,
      isloadingPosts,
      errorMessage,
      selectedUser,
      selectedPost,
      isLoadingComments,
      isShowForm,
      isErrorForm,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
