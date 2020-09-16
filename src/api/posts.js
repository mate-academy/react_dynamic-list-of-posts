import { BASE_URL } from './api';

export const getUserPosts = async(userId) => {
  const response = await fetch(`${BASE_URL}/posts/`);
  const posts = await response.json()
    .then(result => result.data);

  if (userId === 0) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const post = await response.json()
    .then(result => result.data);

  return post;
};
