import { request } from './api';

export const getUserPosts = (userId: number) => {
  const url = userId === 0
    ? '/posts'
    : `/posts?userId=${userId}`;

  return request(url);
};

export const getPostDetails = (postId: number) => (
  request(`/posts/${postId}`)
);
