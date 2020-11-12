import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  return (
    userId !== 0
      ? posts.data.filter(post => post.userId === userId)
      : posts.data
  );
};

export const getPostDetail = async(postId) => {
  const post = await request(`/posts/${postId}`);

  return post.data;
};
