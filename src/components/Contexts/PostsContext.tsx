import React, { useState, useContext } from 'react';
import { Post } from '../../types/Post';

interface PostsContextType {
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

const PostsContext = React.createContext({} as PostsContextType);

type Props = {
  children: React.ReactNode,
};

export const PostsContextProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const value = {
    posts,
    setPosts,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const posts = useContext(PostsContext);

  return posts;
};
