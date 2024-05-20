import { client } from '../utils/fetchClient';

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
