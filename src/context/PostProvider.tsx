import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPosts } from '../api/api';
import { Post } from '../types/Post';

interface PostContextType {
  posts: Post[],
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then(allPosts => {
        setPosts(allPosts);
      });
  }, []);

  const memoizedValue = useMemo(() => ({
    posts,
  }), [posts]);

  return (
    <PostContext.Provider value={memoizedValue}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }

  return context;
};
