import { Comment } from '../types/comment';
import { CommentToPost } from '../types/comment-to-post';

const API_URL = 'https://mate.academy/students-api';

export function getPostComments(postId: string): Promise<Comment[]> {
  return fetch(`${API_URL}/comments?postId=${postId}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function deleteComment(commentId: number) {
  return fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function postComment(comment: CommentToPost) {
  return fetch(`${API_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(comment),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}
