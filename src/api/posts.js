import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();
  const unfilteredPosts = await posts.data;

  if (userId === 0) {
    return unfilteredPosts;
  }

  const filteredPosts = unfilteredPosts.filter(post => post.userId === userId);

  return filteredPosts;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const detailsFromServer = await response.json();
  const details = await detailsFromServer.data;

  return details;
};
