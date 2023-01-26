import { useQuery } from '@tanstack/react-query';
import { getByPostId } from '../api/comments';

export const useComments = (postId: number) => {
  return useQuery(['comments', postId], {
    queryFn: () => getByPostId(postId),
    enabled: !!postId,
  });
};
