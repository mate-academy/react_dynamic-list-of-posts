import { request } from './api';

export const getPostComments = (postId: number) => {
  return request(`/comments?postId=${postId}`);
};
