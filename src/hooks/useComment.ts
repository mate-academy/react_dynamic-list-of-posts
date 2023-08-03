import { useContext } from 'react';
import { CommentContext } from '../context/comment.context';

export const useComment = () => {
  const {
    comments,
    commentsLoading,
    commentsLoadingError,
    removeComment,
    isFormOpen,
    handleFormOpening,
    addComment,
  } = useContext(CommentContext);

  return {
    comments,
    commentsLoading,
    commentsLoadingError,
    removeComment,
    isFormOpen,
    handleFormOpening,
    addComment,
  };
};
