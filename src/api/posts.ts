import { BASE_URL } from './api';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  let url = `${BASE_URL}/posts`;

  if (userId > 0) {
    url += `?userId=${userId}`;
  }

  const response = await fetch(url);

  return response.json();
};

export const getPostDetails = async (postId: number): Promise<Post> => {
  const url = `${BASE_URL}/posts/${postId}`;

  const response = await fetch(url);

  return response.json();
};
