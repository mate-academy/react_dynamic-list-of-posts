import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';

type PostContextType = {
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  error: Error,
  setError: React.Dispatch<React.SetStateAction<Error>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostContext = React.createContext<PostContextType>({
  comments: [],
  setComments: () => { },
  error: Error.None,
  setError: () => { },
  isLoading: false,
  setIsLoading: () => { },
});

type Props = {
  children: React.ReactNode,
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(Error.None);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    comments,
    setComments,
    error,
    setError,
    isLoading,
    setIsLoading,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
