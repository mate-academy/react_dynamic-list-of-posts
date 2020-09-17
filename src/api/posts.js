import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const userPosts = await fetch(`${BASE_URL}/posts/`);
  const response = await userPosts.json();
  const result = response.data;

  if (userId === 0) {
    return result;
  }

  return result.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const postDetails = await fetch(`${BASE_URL}/posts/${postId}`);
  const response = await postDetails.json();
  const result = response.data;

  return result;
};
