import { BASE_URL } from './api';

export const getAllPosts = async() => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();

  return posts.data;
};

export const getUserPosts = async(userId) => {
  const posts = await getAllPosts();

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const postDetails = await response.json();

  return postDetails.data;
};
