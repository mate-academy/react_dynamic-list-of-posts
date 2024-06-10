import React, { useState } from 'react';
import { Post } from '../types/Post';

export interface PostType {
  post: Post | null;
  setPost: (post: Post | null) => void;
}

export const PostContext = React.createContext<PostType>({
  post: null,
  setPost: () => {},
});

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [post, setPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider
      value={{
        post: post,
        setPost: (p: Post | null) => setPost(p),
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
