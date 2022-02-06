/* eslint-disable no-console */
import { BASE_URL } from './api';

export const getUserPosts = async (userId: number | null) => {
  let ADDITIONAL_URL: string;

  if (userId) {
    ADDITIONAL_URL = `/posts?userId=${userId}`;
  } else {
    ADDITIONAL_URL = '/posts';
  }

  const response = await fetch(`${BASE_URL}${ADDITIONAL_URL}`);

  return response.json();
};

export const getPostDetails = async (postId: number | null) => {
  if (postId === null) {
    return null;
  }

  const response = await fetch(`${BASE_URL}/posts?id=${postId}`);

  return response.json();
};

export const getPostComments = async (postId: number | null) => {
  if (postId === null) {
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
