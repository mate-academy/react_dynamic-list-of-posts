import React, { useState, useContext } from 'react';
import { PostType } from '../../types/Post';

interface PostsContextType {
  posts: PostType[],
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
}

const PostsContext = React.createContext({} as PostsContextType);

type Props = {
  children: React.ReactNode,
};

export const PostsContextProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

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

export const usePosts = () => useContext(PostsContext);
