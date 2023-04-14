import React, { useState, useMemo } from 'react';
import { Post } from '../types/Post';

type PostContextType = {
  post: Post | null;
  setPost: (selectedPost: Post | null) => void;
};

export const PostContext = React.createContext<PostContextType>({
  post: null,
  setPost: () => {},
});

export const PostProvider: React.FC = ({ children }) => {
  const [post, setPost] = useState<Post | null>(null);

  const contextValue = useMemo(() => (
    {
      post,
      setPost,
    }
  ), [post]);

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
};
