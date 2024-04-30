import { client } from '../utils/fetchClient';

export function deleteComment(id: number) {
  return client.delete('/comments/' + id);
}
