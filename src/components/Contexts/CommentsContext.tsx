import React, { useState, useContext } from 'react';
import { Comment } from '../../types/Comment';

interface CommentsContextType {
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

const CommentsContext = React.createContext({} as CommentsContextType);

type Props = {
  children: React.ReactNode,
};

export const CommentsContextProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const value = {
    comments,
    setComments,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const comments = useContext(CommentsContext);

  return comments;
};
