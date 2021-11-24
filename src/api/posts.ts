import { BASE_URL } from './api';

export const getUserPosts = async (userId: number):Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}?userId=${userId}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const userPosts = await response.json();

  return userPosts;
};

export const getPostDetails = async (postId: number):Promise<Post | null> => {
  if (postId !== 0) {
    const response = await fetch(`${BASE_URL}/${postId}`);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const post = await response.json();

    return post;
  }

  return null;
};
