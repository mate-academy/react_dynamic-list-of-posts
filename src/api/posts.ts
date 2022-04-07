import { request } from './api';

export const getUserPosts = (userId: number) => {
  const query = userId !== 0
    ? `/posts?userId=${userId}`
    : '/posts';

  return request(query);
};

export const getPostDetails = (postId: number) => {
  return request(`/posts/${postId}`);
};
