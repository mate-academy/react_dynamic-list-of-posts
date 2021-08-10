import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts`);
  const result = await response.json();
  const posts = await result.data;

  if (userId !== 0) {
    return posts.filter(post => userId === post.userId);
  }

  return posts;
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const result = await response.json();
  const postDetails = await result.data;

  return postDetails;
};
