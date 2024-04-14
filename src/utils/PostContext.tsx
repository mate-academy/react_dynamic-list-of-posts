import React, { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUsers } from '../api/users';
import { Comment } from '../types/Comment';

interface ContextTypes {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postsLoadingError: boolean;
  setPostsLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
  commentsError: boolean;
  setCommentsError: React.Dispatch<React.SetStateAction<boolean>>;
  isPostLoading: boolean;
  setIsPostLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentsLoading: boolean;
  setIsCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newCommentFormOpen: boolean;
  setNewCommentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initContext = {
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  postsLoadingError: false,
  setPostsLoadingError: () => {},
  commentsError: false,
  setCommentsError: () => {},
  isPostLoading: false,
  setIsPostLoading: () => {},
  isCommentsLoading: false,
  setIsCommentsLoading: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
  newCommentFormOpen: false,
  setNewCommentFormOpen: () => {},
};

const PostContext = React.createContext<ContextTypes>(initContext);

interface Props {
  children: React.ReactNode;
}

export const PostContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newCommentFormOpen, setNewCommentFormOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setPostsLoadingError(true);
      });
  }, []);

  const postContextValue = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    postsLoadingError,
    setPostsLoadingError,
    commentsError,
    setCommentsError,
    isPostLoading,
    setIsPostLoading,
    isCommentsLoading,
    setIsCommentsLoading,
    sidebarOpen,
    setSidebarOpen,
    newCommentFormOpen,
    setNewCommentFormOpen,
  };

  return (
    <PostContext.Provider value={postContextValue}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostInfo = () => useContext(PostContext);
