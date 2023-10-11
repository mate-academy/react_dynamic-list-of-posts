import {
  createContext, useState, useMemo, useContext,
} from 'react';
import { Comment } from '../types/Comment';

interface CommentsContextType {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const CommentsContext = createContext<CommentsContextType>({
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

export const useComments = (): CommentsContextType => {
  return useContext(CommentsContext);
};
