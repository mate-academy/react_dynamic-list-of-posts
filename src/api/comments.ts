import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  let url = '/comments';

  if (postId) {
    url += `?postId=${postId}`;
  }

  return client.get<Comment[]>(url);
};

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
