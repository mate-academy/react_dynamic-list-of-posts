import { client } from './fetchClient';

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
