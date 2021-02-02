import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  if (userId === 0) {
    return posts.data;
  }

  return posts.data.filter(post => post.userId === userId);
};

export const getPostDetails = async(postId) => {
  const post = await request(`/posts/${postId}`);

  return post.data;
};
