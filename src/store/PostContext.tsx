/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../services/post';

const initialPosts: Post[] = [];

type PostContextType = {
  posts: Post[];
  isPostLoading: boolean;
  errorPostMessage: string;
  selectedPost: Post | null;
  setErrorPostMessage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  loadPost: (userId: number) => Promise<void>;
};

export const PostContext = React.createContext<PostContextType>({
  posts: initialPosts,
  isPostLoading: false,
  errorPostMessage: '',
  selectedPost: null,
  setErrorPostMessage: () => { },
  setSelectedPost: () => { },
  loadPost: async (_userId: number) => { },
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorPostMessage, setErrorPostMessage] = useState('');

  const loadPost = useCallback((userId: number) => {
    setIsPostLoading(true);

    return getUserPosts(userId)
      .then(setPosts)
      .catch(() => setErrorPostMessage('Something went wrong!'))
      .finally(() => setIsPostLoading(false));
  }, []);

  const value = {
    posts,
    isPostLoading,
    errorPostMessage,
    selectedPost,
    setSelectedPost,
    setErrorPostMessage,
    loadPost,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
