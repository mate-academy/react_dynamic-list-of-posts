import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const patchPost = (postId: number) => {
  return client.get<Post[]>(`/posts/${postId}`);
};

export const addPost = (data: Post) => {
  return client.post('/posts', data);
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};
