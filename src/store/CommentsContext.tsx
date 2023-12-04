/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useContext, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import * as commentService from '../services/comment';
import { PostContext } from './PostContext';

const initialComments: Comment[] = [];

type CommentsContextType = {
  comments: Comment[];
  isCommentsLoading: boolean;
  errorCommentsMessage: string;
  isSubmiting: boolean;
  loadComments: (postId: number) => Promise<void>;
  addComment: (data: CommentData) => Promise<void>;
  deleteComment: (commentId: number) => Promise<void>;
};

export const CommentsContext = React.createContext<CommentsContextType>({
  comments: initialComments,
  isCommentsLoading: false,
  errorCommentsMessage: '',
  isSubmiting: false,
  loadComments: async (_postId: number) => { },
  addComment: async (_data: CommentData) => {},
  deleteComment: async (_commentId: number) => {},
});

type Props = {
  children: React.ReactNode;
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [errorCommentsMessage, setErrorCommentsMessage] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { selectedPost } = useContext(PostContext);

  const loadComments = useCallback((postId: number) => {
    setIsCommentsLoading(true);

    return commentService.getPostComments(postId)
      .then(setComments)
      .catch(() => setErrorCommentsMessage('Something went wrong!'))
      .finally(() => setIsCommentsLoading(false));
  }, []);

  const addComment = useCallback((comment: CommentData) => {
    setErrorCommentsMessage('');
    setIsSubmiting(true);

    return commentService.createComment(selectedPost
      ? selectedPost.id
      : 0,
    comment)
      .then(newComment => {
        setComments(curComments => [...curComments, newComment]);
      })
      .catch(() => {})
      .finally(() => setIsSubmiting(false));
  }, [selectedPost]);

  const deleteComment = useCallback((commentId: number) => {
    let prevPosts: Comment[] = [];

    setComments(currentComments => {
      prevPosts = currentComments;

      return currentComments.filter(post => post.id !== commentId);
    });

    return commentService.deleteComment(commentId)
      .then(() => {})
      .catch((error) => {
        setComments(prevPosts);
        setErrorCommentsMessage("Can't delete a comment");
        throw error;
      });
  }, []);

  const value = {
    comments,
    isCommentsLoading,
    errorCommentsMessage,
    isSubmiting,
    loadComments,
    addComment,
    deleteComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
