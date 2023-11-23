import React, { useContext, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { PostsContext } from '../types/PostsContext';
import { getPosts } from '../api/posts';
import { UserContext } from './UserContext';

const initialState = {
  posts: [],
  setPosts: () => {},
  hasError: false,
  setHasError: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

export const PostContext = React.createContext<PostsContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);

      getPosts(selectedUser.id)
        .then(postsData => setPosts(postsData))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  },
  [selectedUser]);

  const value = {
    posts,
    setPosts,
    hasError,
    setHasError,
    isLoading,
    setIsLoading,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>

  );
};
