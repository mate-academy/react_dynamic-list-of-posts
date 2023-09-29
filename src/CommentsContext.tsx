import React, { useContext, useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { Comment } from './types/Comment';
import { PostsContext } from './PostsContext';

type CommentsContextType = {
  commentsFromServer: Comment[];
  errorMessage: string;
  isLoading: boolean;
  setCommentsFromServer: React.Dispatch<React.SetStateAction<Comment[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const CommentsContext = React.createContext<CommentsContextType>({
  commentsFromServer: [],
  errorMessage: '',
  isLoading: false,
  setCommentsFromServer: () => {},
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CommentsProvide: React.FC<Props> = ({ children }) => {
  const [commentsFromServer, setCommentsFromServer] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentPost } = useContext(PostsContext);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }

    if (currentPost) {
      setIsLoading(true);

      (async () => {
        try {
          const comments: Comment[] = await client.get(`/comments?postId=${currentPost.id}`);

          setCommentsFromServer(comments);
        } catch {
          setErrorMessage('load');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [currentPost]);

  const value = {
    commentsFromServer,
    errorMessage,
    isLoading,
    setCommentsFromServer,
    setErrorMessage,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
