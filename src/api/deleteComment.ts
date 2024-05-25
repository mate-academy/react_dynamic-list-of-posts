import { client } from '../utils/fetchClient';

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
