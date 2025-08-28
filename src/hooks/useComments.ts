import { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { ServiceErrors, ServiceErrorsValues } from '../types/Errors';
import { client } from '../utils/fetchClient';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForAdd, setIsLoadingForAdd] = useState<boolean>(false);
  const [error, setError] = useState<ServiceErrorsValues | null>(null);

  async function getCommentsFromServer(postId: number) {
    setError(null);
    setIsLoading(true);

    try {
      const arrayOfComments: Comment[] = await client.get(
        `/comments?postId=${postId}`,
      );

      setComments(arrayOfComments);
    } catch {
      setError(ServiceErrors.Unknown);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteComment(commentId: number) {
    try {
      await client.delete(`/comments/${commentId}`);

      setComments(prev => [...prev].filter(com => com.id !== commentId));
    } catch {
      throw new Error(ServiceErrors.Unknown);
    }
  }

  async function addComment(newComment: CommentData) {
    setIsLoadingForAdd(true);

    try {
      const comment: Comment = await client.post('/comments', newComment);

      setComments(prev => [...prev, comment]);
    } catch {
      throw new Error(ServiceErrors.Unknown);
    } finally {
      setIsLoadingForAdd(false);
    }
  }

  return {
    getCommentsFromServer,
    comments,
    isLoading,
    error,
    deleteComment,
    addComment,
    isLoadingForAdd,
  };
};
