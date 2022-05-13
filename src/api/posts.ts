import { request } from './api';

export const getPosts = async () => {
  const posts = await request('/posts');

  return posts;
};

export const getUserPosts = async (userId: number) => {
  const userPosts = await request(`/posts/?userId=${userId}`);

  return userPosts;
};

export const getPostDetails = async (postId: number) => {
  const postDetails = await request(`/posts/${postId}`);

  return postDetails;
};
