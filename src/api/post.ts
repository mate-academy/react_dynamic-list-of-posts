import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostById = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};
