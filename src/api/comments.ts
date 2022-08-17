import { request } from './posts';

export const getPostComments = (postId: string) => request(
  `/comments?postId=${postId}`,
);
