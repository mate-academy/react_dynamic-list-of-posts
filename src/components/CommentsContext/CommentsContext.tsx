import React, { useState } from 'react';
import { Comment } from '../../types/Comment';

type CC = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

const DEFAULT_COMMENTS: CC = {
  comments: [],
  setComments: () => { },
};

export const CommentsContext = React.createContext<CC>(DEFAULT_COMMENTS);

type Props = {
  children: React.ReactNode;
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
