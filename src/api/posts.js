import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts', { method: 'GET' });

  if (!userId) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const post = await request(`/posts/${postId}`, { method: 'GET' });

  if (!postId) {
    return null;
  }

  return post;
};
