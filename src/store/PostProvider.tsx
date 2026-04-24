import { createContext, useMemo, useState } from 'react';
import { Post } from '../types/Post';

interface Props {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostContext = createContext<Props>({
  post: null,
  setPost: () => {},
});

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<Post | null>(null);

  const value = useMemo(
    () => ({
      post,
      setPost,
    }),
    [post],
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
