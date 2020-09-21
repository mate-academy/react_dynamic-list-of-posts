import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const posts = await fetch(`${BASE_URL}/posts/`);
  const responce = await posts.json();
  const preparedPosts = responce.data;

  if (userId === 0) {
    return preparedPosts;
  }

  return preparedPosts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const details = await fetch(`${BASE_URL}/posts/${postId}`);
  const responce = await details.json();

  return responce.data;
};
