import { request } from './helpers';

export async function getCommentsByPostId(postId: number): Promise<CommentFormat[]> {
  const comments: CommentFormat[] = await request('/comments');

  return comments.filter(comment => comment.postId === postId);
}

export function deleteCommentById(commentId: number): Promise<CommentFormat> {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export function createComment(comment: Omit<CommentFormat, 'id'>): Promise<CommentFormat> {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
}
