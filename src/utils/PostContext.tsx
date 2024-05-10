import React, { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUsers } from '../components/api/users';
import { Comment } from '../types/Comment';

interface ContextTypes {
  users: User[];
  posts: Post[];
  selectedUser: User | null;
  isPostLoading: boolean;
  isPostLoadingError: boolean;
  selectedPost: Post | null;
  isSidebarOpen: boolean;
  comments: Comment[];
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  isNewCommentFormOpen: boolean;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setIsPostLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNewCommentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPostLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

const initContext = {
  users: [],
  posts: [],
  selectedUser: null,
  isPostLoading: false,
  isPostLoadingError: false,
  selectedPost: null,
  isSidebarOpen: false,
  comments: [],
  isCommentsLoading: false,
  isCommentsError: false,
  isNewCommentFormOpen: false,
  setPosts: () => {},
  setSelectedPost: () => {},
  setSelectedUser: () => {},
  setComments: () => {},
  setIsCommentsLoading: () => {},
  setIsNewCommentFormOpen: () => {},
  setIsSidebarOpen: () => {},
  setIsPostLoading: () => {},
  setIsCommentsError: () => {},
  setIsPostLoadingError: () => {},
};

const PostContext = React.createContext<ContextTypes>(initContext);

interface Props {
  children: React.ReactNode;
}

export const PostContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isNewCommentFormOpen, setIsNewCommentFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLoadingError, setIsPostLoadingError] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);

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
    selectedPost,
    isSidebarOpen,
    isCommentsError,
    isCommentsLoading,
    isNewCommentFormOpen,
    setUsers,
    setPosts,
    setComments,
    setSelectedUser,
    setIsPostLoading,
    setSelectedPost,
    setIsCommentsLoading,
    setIsNewCommentFormOpen,
    setIsSidebarOpen,
    setIsCommentsError,
    setIsPostLoadingError,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
