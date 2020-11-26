import { BASE_URL } from './api';

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts/`);
  const userPosts = await response.json();

  if (Number(userId) === 0) {
    return userPosts.data;
  }

  const filteredPosts = userPosts.data.filter(post => (
    post.userId === Number(userId)
  ));

  return filteredPosts;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();

  return result.data;
}
