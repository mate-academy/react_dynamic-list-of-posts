/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Post } from '../../types/Post';

type Props = {
  children: React.ReactNode;
};

export const Context = React.createContext({
  posts: [] as Post[],
  postId: 0,
  isShownForm: false,
  isLoading: false,
  setIsLoading: (_value: boolean) => {},
  setPosts: (_post: Post[]) => {},
  setPostId: (_id: number) => {},
  setIsShownForm: (_value: boolean) => {},
});

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState(0);
  const [isShownForm, setIsShownForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({
    posts,
    postId,
    isShownForm,
    isLoading,
    setIsLoading,
    setPosts,
    setPostId,
    setIsShownForm,
  }), [postId, posts, isShownForm, isLoading]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
