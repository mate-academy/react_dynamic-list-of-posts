import { request } from './BA';

export const getPostComments = (postId: number) => {
  const endpoint = `/comments?postId=${postId}`;

  return request(endpoint);
};
