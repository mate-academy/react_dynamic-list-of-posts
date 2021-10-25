import { BASE_URL } from './api';

export const getUserPosts = async (userId: number) => {
  const USER_POSTS_URL = userId ? `?userId=${userId}` : '';
  const response = await fetch(`${BASE_URL}/posts${USER_POSTS_URL}`);
  const userPosts = await response.json();

  return userPosts;
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const postDetails = await response.json();

  return postDetails;
};
