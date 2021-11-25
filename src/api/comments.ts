import { request } from './helpers';

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const comments: Comment[] = await request('/comments');

  return comments.filter(comment => comment.postId === postId);
}

export async function deleteCommentById(commentId: number): Promise<Comment> {
  return request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}
