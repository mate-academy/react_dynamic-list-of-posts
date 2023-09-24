import { createContext, useState, useMemo } from 'react';
import { Comment } from '../types/Comment';

export const CommentsContext = createContext<{
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}>({
  comments: [],
  setComments: () => {},
});

export const CommentsProvider = ({ children }: {
  children: React.ReactNode,
}) => {
  const [comments, setComments] = useState<Comment[] | []>([]);

  const value = useMemo(() => ({
    comments,
    setComments,
  }), [comments]);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
