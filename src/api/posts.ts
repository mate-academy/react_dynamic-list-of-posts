import { BASE_URL } from './api';

export const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`The problem is here ${error}`);
  }
};

export const getAllPosts = async () => {
  return request(`${BASE_URL}/posts`);
};

export const getUserPosts = async (userId: number) => {
  return request(`${BASE_URL}/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return request(`${BASE_URL}/posts/${postId}`);
};
