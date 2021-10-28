import { getData } from './api';
import { Comment } from '../types/Comment';

export function getPostComments(postId: number): Promise<Comment[]> {
  if (postId) {
    return getData<Comment[]>(`/comments?postId=${postId}`);
  }

  return getData('/posts');
}

export function addNewComment(comment: Partial<Comment>):Promise<Comment> {
  return getData('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ ...comment }),
  });
}

export function deleteComment(commentId: number) {
  return getData(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}
