import React, { useMemo, useState } from 'react';
import { Comment } from './types/Comment';
import { deleteComment } from './api/Comments';

type CommentsState = {
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
  isCommentLoading: boolean,
  setIsCommentLoading: (value: boolean) => void,
  isCommentLoadError: boolean,
  setIsCommentLoadError: (value: boolean) => void,
  isCommentDeleteError: boolean,
  setIsCommentDeleteError: (value: boolean) => void,
  isCommentUpdateError: boolean,
  setIsCommentUpdateError: (value: boolean) => void,
  isFormShown: boolean,
  setIsFormShown: (value: boolean) => void,
  hadnleCommentDelete: (id: number) => void;
};

export const CommentsContext = React.createContext<CommentsState>({
  comments: [],
  setComments: () => {},
  isCommentLoading: false,
  setIsCommentLoading: () => {},
  isCommentLoadError: false,
  setIsCommentLoadError: () => {},
  isCommentDeleteError: false,
  setIsCommentDeleteError: () => {},
  isCommentUpdateError: false,
  setIsCommentUpdateError: () => {},
  isFormShown: false,
  setIsFormShown: () => {},
  hadnleCommentDelete: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isCommentLoadError, setIsCommentLoadError] = useState(false);
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false);
  const [isCommentUpdateError, setIsCommentUpdateError] = useState(false);

  const [isFormShown, setIsFormShown] = useState(false);

  const hadnleCommentDelete = (id: number) => {
    setIsCommentDeleteError(false);
    deleteComment(id)
      .then(() => setComments(
        currentComments => currentComments.filter(comment => comment.id !== id),
      ))
      .catch(() => {
        setIsCommentDeleteError(true);
      });
  };

  const value = useMemo(() => ({
    comments,
    setComments,
    isCommentLoading,
    setIsCommentLoading,
    isCommentLoadError,
    setIsCommentLoadError,
    isCommentDeleteError,
    setIsCommentDeleteError,
    isCommentUpdateError,
    setIsCommentUpdateError,
    isFormShown,
    setIsFormShown,
    hadnleCommentDelete,
  }), [
    comments,
    isCommentLoading,
    isCommentLoadError,
    isCommentDeleteError,
    isCommentUpdateError,
    isFormShown,
  ]);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
