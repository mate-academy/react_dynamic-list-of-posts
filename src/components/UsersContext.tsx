import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type UsersContextProps = {
  userSelected: User | null;
  setUserSelected: React.Dispatch<React.SetStateAction<User | null>>;
  openSidebar: null | number;
  setOpenSidebar: React.Dispatch<React.SetStateAction<number | null>>;

  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  visibleLoader: boolean;
  setVisibleLoader: React.Dispatch<React.SetStateAction<boolean>>;
  showErrOnLoad: boolean;
  setShowErrOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
  showErrComments: boolean;
  setShowErrComments: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  visiblePost: boolean;
  setVisiblePost: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  errInLoadingComments: boolean;
  setErrInLoadingComments: React.Dispatch<React.SetStateAction<boolean>>;
  visibleForm: boolean;
  setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const ContextUsers = React.createContext({} as UsersContextProps);

export const UsersContext: React.FC<Props> = ({ children }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [errInLoadingComments, setErrInLoadingComments] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePost, setVisiblePost] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [openSidebar, setOpenSidebar] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [visibleLoader, setVisibleLoader] = useState(false);
  const [showErrOnLoad, setShowErrOnLoad] = useState(false);
  const [showErrComments, setShowErrComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    visibleForm,
    setVisibleForm,
    errInLoadingComments,
    setErrInLoadingComments,
    posts,
    setPosts,
    visiblePost,
    setVisiblePost,
    isLoading,
    setIsLoading,
    showErrComments,
    setShowErrComments,
    setComments,
    setShowErrOnLoad,
    setVisibleLoader,
    setUserSelected,
    setSelectedPost,
    setOpenSidebar,
    comments,
    showErrOnLoad,
    visibleLoader,
    userSelected,
    selectedPost,
    openSidebar,
  };

  return (
    <ContextUsers.Provider value={value}>{children}</ContextUsers.Provider>
  );
};
