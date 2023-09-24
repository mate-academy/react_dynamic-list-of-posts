import { createContext, useState, useMemo } from 'react';
import { Post } from '../types/Post';

export const PostsContext = createContext<{
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}>({
  posts: [],
  setPosts: () => {},
  post: null,
  setPost: () => {},
});

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [post, setPost] = useState<Post | null>(null);

  const value = useMemo(() => ({
    posts,
    setPosts,
    post,
    setPost,
  }), [posts, post]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
