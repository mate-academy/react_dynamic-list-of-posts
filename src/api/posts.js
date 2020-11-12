import { getData } from './api';

export const getUserPosts = async(userId) => {
  const posts = await getData('/posts', { method: 'GET' });

  return userId ? posts.filter(post => post.userId === userId) : posts;
};

export const getPostDetails = async(postId) => {
  const post = await getData(`/posts/${postId}`, { method: 'GET' });

  return postId ? post : null;
};
