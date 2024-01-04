import React, { useState } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialPosts: Post[] = [];

type PostsContextType = {
  posts: Post[],
  isPostsLoading: boolean,
  setIsPostsLoading: (loading: boolean) => void,
  postErrorMessage: string,
  setPostErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  loadPosts: (userId: number) => Promise<void>
};

export const PostsContext = React.createContext<PostsContextType>({
  posts: initialPosts,
  isPostsLoading: false,
  setIsPostsLoading: () => {},
  postErrorMessage: '',
  setPostErrorMessage: () => {},
  loadPosts: async () => {},
});

type Props = {
  children: React.ReactNode,
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');

  const loadPosts = (userId: number) => {
    setIsPostsLoading(true);

    return getUserPosts(userId)
      .then(setPosts)
      .catch(() => setPostErrorMessage('Something went wrong!'))
      .finally(() => setIsPostsLoading(false));
  };

  const value = {
    posts,
    loadPosts,
    postErrorMessage,
    setPostErrorMessage,
    isPostsLoading,
    setIsPostsLoading,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
