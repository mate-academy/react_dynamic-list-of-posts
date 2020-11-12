import { POSTS_URL } from './api';

export const getUserPosts = async() => {
  const response = await fetch(POSTS_URL);
  const posts = await response.json();

  return posts.data;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(POSTS_URL + postId);
  const postDetails = await response.json();

  return postDetails.data;
};
