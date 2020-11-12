import { BASE_URL, POSTS_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(BASE_URL + POSTS_URL);
  const posts = await response.json();

  return posts.data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(BASE_URL + POSTS_URL + postId);
  const postDetails = await response.json();

  return postDetails.data;
};
