import { BASE_URL } from './api';
import { Post } from '../react-app-env';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  let response;

  if (!userId) {
    response = await fetch(`${BASE_URL}/posts`);
  } else {
    response = await fetch(`${BASE_URL}/posts/${userId}`);
  }

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};
