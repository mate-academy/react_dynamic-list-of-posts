import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const postPost = ({ userId, title, body }: Omit<Post, 'id'>) => {
  return client.post<Post>('/posts', {
    userId,
    title,
    body,
  });
};
