import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostComments(postId: number) {
  let url = '/comments';

  if (postId) {
    url += `?postId=${postId}`;
  }

  return client.get<Comment[]>(url);
}

export function createComment(postId: number, comment: CommentData) {
  return client.post<Comment>('/comments', { postId, ...comment });
}

export function deleteComment(commentId: number) {
  return client.delete(`/posts/${commentId}`);
}
