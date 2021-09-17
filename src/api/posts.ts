import { basicRequest } from './api';

const request = (url: string) => {
  return basicRequest(`/posts${url}`);
};

export const getUserPosts = (userId: number) => {
  return request(
    userId === 0
      ? ('')
      : (`?userId=${userId}`),
  );
};

export const getPostDetails = (postId: number) => {
  return request(`/${postId}`);
};
