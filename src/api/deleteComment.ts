import { client } from '../utils/fetchClient';

export function deleteComments(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
