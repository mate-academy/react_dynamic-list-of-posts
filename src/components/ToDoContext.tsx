import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getComments, getPosts, getUsers } from '../utils/sevicePosts';
import { Post } from '../types/Post';
import { type Comment } from '../types/Comment';

type Context = {
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  selectedPost: Post | null;
  setSelectedPost: (selectedPost: Post | null) => void;
  loadingPosts: boolean;
  setLoadingPosts: (loadingPosts: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  comments: Comment[];
  setComments: (comment: Comment[]) => void;
  loadingComment: boolean;
  setLoadingComment: (loadingComment: boolean) => void;
  errorNotification: string;
  setErrorNotification: (errorNotification: string) => void;
};

export const InitialContext = createContext<Context>({
  selectedUser: null,
  setSelectedUser: () => {},
  users: [],
  setUsers: () => {},
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  loadingPosts: false,
  setLoadingPosts: () => {},
  error: false,
  setError: () => {},
  comments: [],
  setComments: () => {},
  loadingComment: false,
  setLoadingComment: () => {},
  errorNotification: '',
  setErrorNotification: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);
      getPosts(selectedUser?.id)
        .then(data => setPosts(data))
        .catch(() => {
          setError(true);
          setErrorNotification('Unable to load posts');
        })
        .finally(() => {
          setLoadingPosts(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setLoadingComment(true);
      getComments(selectedPost?.id)
        .then(setComments)
        .catch(() => {
          setError(true);
          setErrorNotification('Unable to load comments');
        })
        .finally(() => {
          setLoadingComment(false);
        });
    }
  }, [selectedPost]);

  return (
    <InitialContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        users,
        setUsers,
        loadingPosts,
        setLoadingPosts,
        error,
        setError,
        posts,
        setPosts,
        selectedPost,
        setSelectedPost,
        comments,
        setComments,
        loadingComment,
        setLoadingComment,
        errorNotification,
        setErrorNotification,
      }}
    >
      {children}
    </InitialContext.Provider>
  );
};
