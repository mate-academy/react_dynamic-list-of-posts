import React, {
  createContext, PropsWithChildren, useEffect, useState,
} from 'react';
import { IComment } from '../models/IComment';
import {
  deleteCommentById,
  getCommentsByPost,
  postComment,
} from '../api/comment.api';
// eslint-disable-next-line import/no-cycle
import { usePost } from '../hooks/usePost';

interface ICommentContext {
  comments: IComment[],
  commentsLoadingError: boolean,
  commentsLoading: boolean,
  removeComment: (commentId: number) => Promise<void>,
  isFormOpen: boolean,
  handleFormOpening: () => void,
  addComment: (commentBody: Omit<IComment, 'id'>) => Promise<void>,
}

export const CommentContext = createContext<ICommentContext>(
  {} as ICommentContext,
);

export const CommentProvider:React.FC<PropsWithChildren<{}>> = (
  { children },
) => {
  const { selectedPost } = usePost();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadComments = async (postId: number) => {
      setCommentsLoading(true);
      setIsFormOpen(false);
      const commentsFromApi = await getCommentsByPost(postId);

      setCommentsLoading(false);

      setComments(commentsFromApi);
    };

    if (selectedPost) {
      loadComments(selectedPost.id)
        .catch(() => {
          setCommentsLoading(false);
          setCommentsLoadingError(true);
        });
    }
  }, [selectedPost]);

  const removeComment = async (commentId: number) => {
    try {
      setComments(prevState => prevState.filter(
        comment => comment.id !== commentId,
      ));

      await deleteCommentById(commentId);
    } catch (error) {
      setComments(comments);
    }
  };

  const addComment = async (commentBody: Omit<IComment, 'id'>) => {
    try {
      const newComment = await postComment(commentBody);

      setComments(prevState => [...prevState, newComment]);
    } catch (error) {
      setCommentsLoadingError(true);
    }
  };

  const handleFormOpening = () => {
    setIsFormOpen(true);
  };

  return (
    <CommentContext.Provider value={{
      comments,
      commentsLoadingError,
      commentsLoading,
      removeComment,
      isFormOpen,
      handleFormOpening,
      addComment,
    }}
    >
      {children}
    </CommentContext.Provider>
  );
};
