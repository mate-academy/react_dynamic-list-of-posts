import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteById } from '../api/comments';
import { Comment } from '../types/Comment';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Comment) => deleteById(comment.id),
    onMutate: async ({ postId, id }) => {
      await queryClient.cancelQueries(['comments', postId]);

      const previousComments: Comment[]
        = queryClient.getQueryData<Comment[]>(['comments', postId]) || [];

      queryClient.setQueryData<Comment[]>(['comments', postId], (old) => {
        return old?.filter((t) => t.id !== id);
      });

      return { previousComments };
    },
  });
};
