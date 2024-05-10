import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getComments, getPosts, getUsers } from '../api/client';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface ContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  loadingComments: boolean;
  setLoadingComments: React.Dispatch<React.SetStateAction<boolean>>;
  writeCommentButton: boolean;
  setWriteCommentButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostsContext = React.createContext<ContextType>({
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  posts: [],
  setPosts: () => {},
  loading: false,
  setLoading: () => {},
  error: false,
  setError: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  loadingComments: false,
  setLoadingComments: () => {},
  writeCommentButton: false,
  setWriteCommentButton: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [writeCommentButton, setWriteCommentButton] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => {
        setError(true);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setLoadingComments(true);
    getComments(selectedPost.id)
      .then(response => {
        const newComments = response as Comment[];

        setComments([...newComments]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoadingComments(false));
  }, [selectedPost]);

  const value = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    loading,
    setLoading,
    error,
    setError,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    loadingComments,
    setLoadingComments,
    writeCommentButton,
    setWriteCommentButton,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
