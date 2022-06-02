import { request, wait } from './api';

export const getUserPosts = async (userId: number) => {
  await wait(1000);

  return userId > 0
    ? request(`/posts?userId=${userId}`)
    : request('/posts');
};

export const getPostDetails = async (postId: number) => {
  await wait(1000);

  return request(`/posts/${postId}`);
};
