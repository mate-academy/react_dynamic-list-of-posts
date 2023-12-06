import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};

export const createPost = ({ userId, title, body }: Omit<Post, 'id'>) => {
  return client.post<Post>('/posts', { userId, title, body });
};

export const updatePost = ({
  id, userId, title, body,
}: Post) => {
  return client.patch<Post>(`/posts/${id}`, { userId, title, body });
};
