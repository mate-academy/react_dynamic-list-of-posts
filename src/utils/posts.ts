import { Post } from '../types/Post';
import { client } from './fetchClient';

export const getPosts = (userId: number) => {
  if (!userId || typeof userId !== 'number') {
    return Promise.resolve([]);
  }

  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const createPosts = (data: Omit<Post, 'id'>) => {
  return client.post<Post[]>('/posts', data);
};

export const deletePosts = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};

export const updatePosts = ({ id, ...data }: Post) => {
  return client.patch<Post>(`/posts/${id}`, data);
};
