import { useState } from 'react';
import { client } from '../utils/fetchClient';
import { SetComments } from '../types/SetComments';

export const useDeleteComment = ({ setComments }: SetComments) => {
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [isDeletingError, setIsDeletingError] = useState(false);

  const deleteComment = async (id: number) => {
    try {
      setIsDeletingError(false);
      setIsDeletingLoading(true);

      setComments(prev => prev.filter(c => c.id !== id));

      await client.delete(`/comments/${id}`);
    } catch (error) {
      setIsDeletingError(true);
      throw error;
    } finally {
      setIsDeletingLoading(false);
    }
  };

  return {
    isDeletingLoading,
    isDeletingError,
    deleteComment,
  };
};
