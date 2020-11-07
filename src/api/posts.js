import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  return (
    userId !== 0
      ? posts.filter(post => post.userId === userId)
      : posts
  );
};
