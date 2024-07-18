import React, { createContext, useCallback, useState, useContext } from 'react';
import { type Comment } from '../types/Comment';
import { getComments, removeComments } from '../utils/fetchClient';
import { PostContext } from './PostsContext';

type CommentContextType = {
  commentLoading: boolean;
  setCommentLoading: (commentLoading: boolean) => void;
  commentsFromPost: Comment[];
  setCommentsFromPost: (comment: Comment[]) => void;
  showCommentField: boolean;
  setShowCommentField: (showCommentField: boolean) => void;
  loadComments: (postId: number) => void;
  onDeleteComment: (commentId: number) => void;
  showComments: boolean;
  setShowComments: (showComments: boolean) => void;
};

export const CommentContext = createContext<CommentContextType>({
  commentLoading: false,
  setCommentLoading: () => {},
  commentsFromPost: [],
  setCommentsFromPost: () => {},
  showCommentField: false,
  setShowCommentField: () => {},
  loadComments: async () => {},
  onDeleteComment: async () => {},
  showComments: false,
  setShowComments: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CommentProvider = ({ children }: Props) => {
  const [commentsFromPost, setCommentsFromPost] = useState<Comment[]>([]);
  const [showCommentField, setShowCommentField] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { setErrorNotification } = useContext(PostContext);

  const loadComments = useCallback(async (postId: number) => {
    setCommentLoading(true);
    setErrorNotification('');
    setShowCommentField(false);

    try {
      const commentsFromStorage = await getComments(postId);

      setCommentsFromPost(commentsFromStorage);
    } catch {
      setErrorNotification('something went wrong');
    } finally {
      setCommentLoading(false);
    }
  }, []);

  const onDeleteComment = useCallback((commentId: number) => {
    setCommentsFromPost(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    removeComments(commentId);
  }, []);

  return (
    <CommentContext.Provider
      value={{
        commentsFromPost,
        setCommentsFromPost,
        showCommentField,
        setShowCommentField,
        commentLoading,
        setCommentLoading,
        loadComments,
        onDeleteComment,
        showComments,
        setShowComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
