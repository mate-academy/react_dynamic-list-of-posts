import React, { useState } from 'react';
import { Post } from '../types/Post';

interface PostsContextType {
  posts: Post[],
  selectedPost: Post | null,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
}

export const PostsContext = React.createContext<PostsContextType>({
  posts: [],
  selectedPost: null,
  setPosts: () => {},
  setSelectedPost: () => { },
});

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const value = {
    posts,
    selectedPost,
    setPosts,
    setSelectedPost,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
