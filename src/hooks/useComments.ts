import { useCallback, useEffect, useState } from 'react';
import * as postService from '../api/comments';
import { Comment } from '../types/Comment';

export const useComments = (postId?: number | null) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentCreating, setIsCommentCreating] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = useCallback(async () => {
    if (!postId) {
      return;
    }

    setIsCommentsLoading(true);
    setIsCommentsError(false);
    try {
      const usersFromServer = await postService.getComments(postId);

      setComments(usersFromServer);
    } catch {
      setIsCommentsError(true);
    } finally {
      setIsCommentsLoading(false);
    }
  }, [postId]);

  const addComment = useCallback(async (comment: Omit<Comment, 'id'>) => {
    setIsCommentCreating(true);
    try {
      const newComment = await postService.createComment(comment);

      setComments(prev => [...prev, newComment]);
    } catch {
      setIsCommentsError(true);
    } finally {
      setIsCommentCreating(false);
    }
  }, []);

  const deleteComment = useCallback(
    async (commentId: number) => {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      try {
        await postService.deleteComment(commentId);
      } catch {
        setIsCommentDeleteError(true);
        setComments(comments);
      } finally {
        setIsCommentDeleteError(false);
      }
    },
    [comments],
  );

  useEffect(() => {
    if (!postId) {
      setComments([]);

      return;
    }

    loadComments();
  }, [postId, loadComments]);

  return {
    comments,
    isCommentsLoading,
    isCommentsError,
    addComment,
    deleteComment,
    loadComments,
    isCommentCreating,
    isCommentDeleteError,
  };
};
