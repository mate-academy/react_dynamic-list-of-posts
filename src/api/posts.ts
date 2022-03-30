import { getData } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  return getData(`/posts?userId=${userId}`);
};

export const getAllPosts = async (): Promise<Post[]> => {
  return getData('/posts/');
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  return getData(`/posts/${postId}`);
};
