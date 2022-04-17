import { request } from './api';

const POSTS_URL = '/posts';

export const getUserPosts = (userId: number) => {
  const url = userId === 0
    ? POSTS_URL
    : `${POSTS_URL}?userId=${userId}`;

  return request(url);
};

export const getPostDetails = (postId: number) => request(`${POSTS_URL}/${postId}`);
