import { Post } from '../types/Post';
import { request } from './request';

export const getPosts = () => {
  return request<Post[]>('/posts');
};

export const getPostDetails = (postId: number | null) => {
  return request<Post>(`/posts/${postId}`);
};
