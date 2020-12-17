import { request } from './api';

export const getUserPosts = async(userId) => {
  const result = await request('posts');

  return result.filter(res => (+userId ? res.userId === +userId : res));
};

export const getPostDetails = async(postId) => {
  const result = await request(`posts/${postId}`);

  return result;
};
