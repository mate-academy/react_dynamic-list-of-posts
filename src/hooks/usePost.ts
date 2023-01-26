import { useQuery } from '@tanstack/react-query';
import { getById } from '../api/posts';
import { Post } from '../types/Post';

export const usePost = (id: number) => {
  return useQuery<Post>(['post', id], () => getById(id));
};
