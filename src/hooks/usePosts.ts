import { useQuery } from '@tanstack/react-query';
import { getByUserId } from '../api/posts';
import { Post } from '../types/Post';

export const usePosts = (userId: number) => {
  return useQuery<Post[]>(['posts', userId], {
    queryFn: () => getByUserId(userId),
    enabled: !!userId,
  });
};
