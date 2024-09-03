import { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { SetComments } from '../types/SetComments';

export const useAddComment = ({ setComments }: SetComments) => {
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const [isAddingError, setIsAddingError] = useState(false);

  const addComment = async (data: Omit<Comment, 'id'>) => {
    try {
      setIsAddingError(false);
      setIsAddingLoading(true);

      const res = await client.post<Comment>(`/comments`, data);

      setComments(prev => [...prev, res]);
    } catch (error) {
      setIsAddingError(true);
      throw error;
    } finally {
      setIsAddingLoading(false);
    }
  };

  return {
    isAddingLoading,
    isAddingError,
    addComment,
  };
};
