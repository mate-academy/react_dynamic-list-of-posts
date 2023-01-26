import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteById } from '../api/comments';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries<Comment[]>({
        queryKey: ['comments'],
      });
    },
  });
};
