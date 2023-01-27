import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNew } from '../api/comments';
import { Comment } from '../types/Comment';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Omit<Comment, 'id'>) => createNew(comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};
