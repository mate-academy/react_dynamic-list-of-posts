import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getByUserId = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getById = (postId: number): Promise<Post> => {
  return client.get<Post>(`/posts/${postId}`);
};
