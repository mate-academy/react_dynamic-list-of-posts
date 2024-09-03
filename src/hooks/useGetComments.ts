import { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { SetComments } from '../types/SetComments';

export const useGetComments = ({ setComments }: SetComments) => {
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const getCommentsData = async (postId: number | undefined) => {
    try {
      setLoading(true);
      setLoadingError(false);
      const res = await client.get<Comment[]>(`/comments?postId=${postId}`);

      setComments(res);
    } catch (error) {
      setLoadingError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadingError,
    getCommentsData,
  };
};
