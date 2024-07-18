import React, { createContext, useContext, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getPosts } from '../utils/fetchClient';
import { UserContext } from './UsersContext';

type PostContextType = {
  error: boolean;
  setError: (error: boolean) => void;
  errorNotification: string;
  setErrorNotification: (error: string) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  postsLoading: boolean;
  setPostsLoading: (postsLoading: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (selectedPost: Post | null) => void;
};

export const PostContext = createContext<PostContextType>({
  error: false,
  setError: () => {},
  errorNotification: '',
  setErrorNotification: () => {},
  posts: [] as Post[],
  setPosts: () => {},
  postsLoading: false,
  setPostsLoading: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider = ({ children }: Props) => {
  const [error, setError] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    setPostsLoading(true);
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setErrorNotification('Something went wrong');
          setError(true);
        })
        .finally(() => {
          setPostsLoading(false);
        });
    }
  }, [selectedUser, setError]);

  return (
    <PostContext.Provider
      value={{
        error,
        setError,
        errorNotification,
        setErrorNotification,
        posts,
        setPosts,
        postsLoading,
        setPostsLoading,
        selectedPost,
        setSelectedPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
