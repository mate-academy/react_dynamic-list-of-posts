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
  showErrOnLoadPost: boolean;
  setShowErrOnLoadPost: React.Dispatch<React.SetStateAction<boolean>>;
  errInLoadingPosts: boolean;
  setErrInLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
};

export const ContextUsers = React.createContext({} as UsersContextProps);

export const UsersContext: React.FC<Props> = ({ children }) => {
  const [errInLoadingPosts, setErrInLoadingPosts] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [openSidebar, setOpenSidebar] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [visibleLoader, setVisibleLoader] = useState(false);
  const [showErrOnLoadPost, setShowErr] = useState(true);

  return (
    <ContextUsers.Provider
      value={{
        setErrInLoadingPosts,
        setComments,
        setShowErrOnLoadPost: setShowErr,
        setVisibleLoader,
        setUserSelected,
        setSelectedPost,
        setOpenSidebar,
        errInLoadingPosts,
        comments,
        showErrOnLoadPost,
        visibleLoader,
        userSelected,
        selectedPost,
        openSidebar,
      }}
    >
      {children}
    </ContextUsers.Provider>
  );
};
