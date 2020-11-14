import { request } from './api';

export const getUserPosts = async(userId) => {
  const posts = await request('/posts');

  return (
    userId
      ? posts.filter(post => post.userId === userId)
      : posts
  );
};

export const getPostDetails = async(postId) => {
  const postDetails = await request(`/posts/${postId}`);

  return postDetails;
};
