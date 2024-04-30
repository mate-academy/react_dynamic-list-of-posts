import React, { useMemo, useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  children: React.ReactNode;
};

type Context = {
  comments: Comment[];
  setComments: (prop: Comment[]) => void;
};

const defaultContext: Context = {
  comments: [],
  setComments: () => {},
};

export const CommentContext = React.createContext<Context>(defaultContext);

export const CommentProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(
    () => ({
      comments,
      setComments,
    }),
    [comments],
  );

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
