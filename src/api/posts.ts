import { Post } from '../types/Post';
import { BASE_URL } from './api';

export const getUsersPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.text}`);
  }

  return response.json();
};

export const getUserPostsByID = async (userId: number): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.text()}`);
  }

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.text}`);
  }

  return response.json();
};
