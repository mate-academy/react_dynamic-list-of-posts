/* eslint-disable no-console */
import { BASE_URL } from './api';

export const getUserPosts = async (userId: number) => {
  let ADDITIONAL_URL: string;

  if (userId) {
    ADDITIONAL_URL = `/posts?userId=${userId}`;
  } else {
    ADDITIONAL_URL = '/posts';
  }

  const response = await fetch(`${BASE_URL}${ADDITIONAL_URL}`);

  return response.json();
};

export const getPostDetails = async (postId: number) => {
  if (!postId) {
    return postId;
  }

  const response = await fetch(`${BASE_URL}/posts?id=${postId}`);

  return response.json();
};

export const getPostComments = async (postId: number) => {
  if (!postId) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

    return await response.json();
  } catch (error) {
    console.error(error);

    return [];
  }
};
