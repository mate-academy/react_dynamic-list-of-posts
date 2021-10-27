import { getData } from './api';
import { Comment } from '../types/comment';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  if (postId) {
    return getData<Comment[]>(`/comments?postId=${postId}`);
  }

  return getData('/posts');
};

export function addComment(newComment: Partial<Comment>): Promise<Comment> {
  return getData('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newComment),
  });
}

export function deleteComment(commentId: number) {
  return getData(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}
