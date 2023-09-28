import React, { useMemo, useState } from 'react';
import { Post } from './types/Post';

type PostState = {
  posts: Post[],
  setPosts: (comments: Post[]) => void,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
  isPostLoading: boolean,
  setIsPostLoading: (value: boolean) => void,
  isPostLoadError: boolean,
  setIsPostLoadError: (value: boolean) => void,
};

export const PostContext = React.createContext<PostState>({
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  isPostLoading: false,
  setIsPostLoading: () => {},
  isPostLoadError: false,
  setIsPostLoadError: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostLoadError, setIsPostLoadError] = useState(false);

  const value = useMemo(() => ({
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    isPostLoading,
    setIsPostLoading,
    isPostLoadError,
    setIsPostLoadError,
  }), [posts, isPostLoading, isPostLoadError, selectedPost]);

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
