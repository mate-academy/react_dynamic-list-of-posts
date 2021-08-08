import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();
  const unfilteredPosts = await posts.data;

  if (userId === 0) {
    return unfilteredPosts;
  }

  return unfilteredPosts.filter(post => post.userId === userId);
};
