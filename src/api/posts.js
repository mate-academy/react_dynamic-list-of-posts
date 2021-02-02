import { request } from './api';

export const getAllPosts = async() => {
  const result = await request('/posts');

  return result.data;
};

export const getPost = async(postID) => {
  const result = await request(`/posts/${postID}`);

  return result.data;
};
