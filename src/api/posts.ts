import { request } from './BA';

export const getPostDetails = (postId: number) => {
  const endpoint = `/posts/${postId}`;

  return request(endpoint);
};
