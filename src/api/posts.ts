import { Post } from '../types/post';
import { request } from './api';

export const getPosts = (): Promise<Post[]> => {
  return request('/posts');
};

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  let response;

  if (!userId) {
    response = await request('/posts');
  } else {
    response = await request(`/posts?userId=${userId}`);
  }

  return response;
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`/posts/${postId}`);
};
