import { BASE_URL } from './api';

export const getAllPosts = async() => {
  const request = await fetch(`${BASE_URL}/posts/`);

  return request.json();
};

export const getUserPosts = async(userId) => {
  const allPosts = await getAllPosts();

  return userId === 'All users'
    ? allPosts.data
    : allPosts.data.filter(post => +post.userId === +userId);
};

export const getPostDetails = async(postId) => {
  const request = await fetch(`${BASE_URL}/posts/${postId}`);

  return request.json();
};
