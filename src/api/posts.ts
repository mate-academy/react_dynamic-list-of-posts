import { request } from './api';

const postRequest = (url: string) => {
  return request(`/posts${url}`);
};

export const getUserPosts = (userId: number) => {
  return postRequest(
    userId === 0 ? ('') : (`?userId=${userId}`),
  );
};

export const getPostDetails = (postId: number) => {
  return postRequest(`/${postId}`);
};
