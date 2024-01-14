import {
  FC, PropsWithChildren, createContext, useContext, useEffect, useState,
} from 'react';
import { useAppContext } from './AppContext';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type CommentContexType = {
  comments: Comment[] | null,
  commentsAreLoading: boolean,
  showCommentsError: boolean,
};

const CommentContextDefault = {
  comments: null,
  commentsAreLoading: false,
  showCommentsError: false,
};

const CommentContext = createContext<CommentContexType>(CommentContextDefault);

type Props = PropsWithChildren;

export const CommentContextProvider: FC<Props> = ({ children }) => {
  const { selectedPost: post } = useAppContext();

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentsAreLoading, setCommentsAreLoading] = useState<boolean>(false);
  const [showCommentsError, setShowCommentsError] = useState<boolean>(false);

  useEffect(() => {
    const loadComments = async () => {
      setShowCommentsError(false);
      setCommentsAreLoading(true);

      try {
        const response = await client.get(`/comments?postId=${post?.id}`);

        setComments(response as Comment[]);
      } catch (error) {
        setShowCommentsError(true);
      } finally {
        setCommentsAreLoading(false);
      }
    };

    loadComments();
  }, [post]);

  const CommentContextValue = {
    comments,
    commentsAreLoading,
    showCommentsError,
  };

  return (
    <CommentContext.Provider value={CommentContextValue}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error(
      'useCommentContext must be used inside the CommentContextProvider',
    );
  }

  return context;
};
