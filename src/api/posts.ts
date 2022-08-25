import { request } from './request';

export const getUserPosts = (userId: string) => request(
  (userId === 'All') ? '/posts' : `/posts?userId=${userId}`,
);

export const getPostDetails = (postId: string) => request(`/posts/${postId}`);
