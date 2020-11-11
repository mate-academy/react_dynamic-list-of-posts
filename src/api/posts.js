import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  if (!userId) {
    return posts;
  }

  return posts.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const post = await request(`/posts/${postId}`);

  if (!postId) {
    return null;
  }

  return post;
};
