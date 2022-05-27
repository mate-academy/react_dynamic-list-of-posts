import { Post } from '../types/Post';
import { BASE_URL, request } from './api';

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await request(`${BASE_URL}/posts`);

  return posts;
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return request(`${BASE_URL}/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return request(`${BASE_URL}/posts/${postId}`);
};
