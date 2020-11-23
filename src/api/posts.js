import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();
  const filteredPosts = posts.data.filter(post => post.userId === userId);

  if (!userId) {
    return posts.data;
  }

  return filteredPosts;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const details = await response.json();

  return details.data;
};
