import React, {
  Dispatch, SetStateAction, useMemo, useState,
} from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type ContextType = {
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: Dispatch<SetStateAction<User | null>>
  loadingPosts: boolean,
  setLoadingPosts: Dispatch<SetStateAction<boolean>>,
  listVisible: boolean,
  setListVisible: Dispatch<SetStateAction<boolean>>,
  postsErrorMessage: boolean,
  setPostsErrorMessage: Dispatch<SetStateAction<boolean>>,
  posts: Post[],
  setPosts: Dispatch<SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: Dispatch<SetStateAction<Post | null>>
  openedPost: boolean,
  setOpenedPost: Dispatch<SetStateAction<boolean>>,
  comments: Comment[],
  setComments: Dispatch<SetStateAction<Comment[]>>
  loadingComments: boolean,
  setLoadingComments: Dispatch<SetStateAction<boolean>>,
  commentsErrorMessage: boolean,
  setCommentsErrorMessage: Dispatch<SetStateAction<boolean>>,
  writeNewComment: boolean,
  setWriteNewComment: Dispatch<SetStateAction<boolean>>,
};

export const AppContext = React.createContext<ContextType>({
  users: [],
  setUsers: () => {},
  loadingPosts: false,
  setLoadingPosts: () => {},
  listVisible: false,
  setListVisible: () => {},
  postsErrorMessage: false,
  setPostsErrorMessage: () => {},
  posts: [],
  setPosts: () => {},
  openedPost: false,
  setOpenedPost: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  comments: [],
  setComments: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  loadingComments: false,
  setLoadingComments: () => {},
  commentsErrorMessage: false,
  setCommentsErrorMessage: () => {},
  writeNewComment: false,
  setWriteNewComment: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [postsErrorMessage, setPostsErrorMessage] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openedPost, setOpenedPost] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsErrorMessage, setCommentsErrorMessage] = useState(false);
  const [writeNewComment, setWriteNewComment] = useState(false);

  const values = useMemo(() => ({
    users,
    setUsers,
    loadingPosts,
    setLoadingPosts,
    listVisible,
    setListVisible,
    postsErrorMessage,
    setPostsErrorMessage,
    posts,
    setPosts,
    openedPost,
    setOpenedPost,
    selectedUser,
    setSelectedUser,
    comments,
    setComments,
    selectedPost,
    setSelectedPost,
    loadingComments,
    setLoadingComments,
    commentsErrorMessage,
    setCommentsErrorMessage,
    writeNewComment,
    setWriteNewComment,
  }), [
    users, setUsers, loadingPosts, setLoadingPosts, listVisible, setListVisible,
    postsErrorMessage, setPostsErrorMessage, posts, setPosts, openedPost,
    setOpenedPost, selectedUser, setSelectedUser, comments, setComments,
    selectedPost, setSelectedPost, loadingComments, setLoadingComments,
    commentsErrorMessage, setCommentsErrorMessage, writeNewComment,
    setWriteNewComment,
  ]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};
