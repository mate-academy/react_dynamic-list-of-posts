import React, { useState, useEffect, useContext } from 'react';
import { Comment } from '../types/Comment';
import { CommentsContext } from '../types/CommentsContext';
import { getComments, postComment } from '../api/comments';
import { PostContext } from './PostContext';

const initialState = {
  comments: [],
  setComments: () => {},
  isLoadingComments: false,
  setIsLoadingComments: () => {},
  hasCommentsError: false,
  setHasCommentsError: () => {},
  submitNewComment: () => {},
  isSubmittingComment: false,
  setisSubmittingComment: () => {},
};

export const CommentContext
  = React.createContext<CommentsContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const CommentProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isSubmittingComment, setisSubmittingComment] = useState(false);

  const { selectedPost } = useContext(PostContext);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      getComments(selectedPost.id)
        .then(commentsData => setComments(commentsData))
        .catch(() => setHasCommentsError(true))
        .finally(() => setIsLoadingComments(false));
    }
  },
  [selectedPost]);

  const submitNewComment = ({
    postId, name, email, body,
  }: Omit<Comment, 'id'>) => {
    setisSubmittingComment(true);

    postComment({
      postId, name, email, body,
    })
      .then(comment => setComments(prevComments => [...prevComments, comment]))
      .finally(() => setisSubmittingComment(false));
  };

  const value = {
    comments,
    setComments,
    isLoadingComments,
    setIsLoadingComments,
    hasCommentsError,
    setHasCommentsError,
    submitNewComment,
    isSubmittingComment,
    setisSubmittingComment,
  };

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>

  );
};
