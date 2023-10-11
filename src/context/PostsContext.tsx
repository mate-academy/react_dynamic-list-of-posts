import { createContext, useState, useContext } from 'react';
import { Post } from '../types/Post';

interface PostsContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostsContext = createContext<PostsContextType>({
  posts: [],
  setPosts: () => {},
  post: null,
  setPost: () => {},
});

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [post, setPost] = useState<Post | null>(null);

  const value = {
    posts,
    setPosts,
    post,
    setPost,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  return useContext(PostsContext);
};
