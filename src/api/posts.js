import { BASE_URL, POSTS_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(BASE_URL + POSTS_URL);
  const posts = await response.json();

  return posts.data;
};
