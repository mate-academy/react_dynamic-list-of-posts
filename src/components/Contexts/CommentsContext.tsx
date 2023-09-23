import React, { useState, useContext } from 'react';
import { CommentType } from '../../types/Comment';

interface CommentsContextType {
  comments: CommentType[],
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

const CommentsContext = React.createContext({} as CommentsContextType);

type Props = {
  children: React.ReactNode,
};

export const CommentsContextProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

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

export const useComments = () => useContext(CommentsContext);
