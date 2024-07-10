import React, { useCallback, useMemo, useState } from 'react';
import { getUserPosts } from '../services/post';
import { Post } from '../types/Post';
import { PostsContextType } from '../types/ContextType';

export const PostsContext = React.createContext<PostsContextType>({
  posts: [] as Post[],
  loading: false,
  errorMessage: '',
  loadPosts: async () => {},
  selectedPost: null,
  setSelectedPost: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadPosts = useCallback(async (userId: number) => {
    setLoading(true);

    try {
      const postsFromService = await getUserPosts(userId);

      setPosts(postsFromService);
    } catch {
      setErrorMessage('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      posts,
      loading,
      errorMessage,
      loadPosts,
      selectedPost,
      setSelectedPost,
    }),
    [posts, loading, errorMessage, loadPosts, selectedPost, setSelectedPost],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
