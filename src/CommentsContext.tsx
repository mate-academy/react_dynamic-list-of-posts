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
  const [isFormShown, setIsFormShown] = useState(false);

  const hadnleCommentDelete = (id: number) => {
    deleteComment(id)
      .then(() => setComments(
        currentComments => currentComments.filter(comment => comment.id !== id),
      ));
  };

  const value = useMemo(() => ({
    comments,
    setComments,
    isCommentLoading,
    setIsCommentLoading,
    isCommentLoadError,
    setIsCommentLoadError,
    isFormShown,
    setIsFormShown,
    hadnleCommentDelete,
  }), [comments, isCommentLoading, isCommentLoadError, isFormShown]);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
