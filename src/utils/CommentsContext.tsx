import React, { useMemo, useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  children: React.ReactNode;
};

type Context = {
  comments: Comment[];
  setComments: (prop: Comment[]) => void;
};

const clearContext: Context = {
  comments: [],
  setComments: (prop: Comment[]) => {},
};

export const CommentsContext = React.createContext<Context>(clearContext);

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(
    () => ({
      comments,
      setComments,
    }),
    [comments],
  );

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
