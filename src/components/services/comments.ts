import { Comment, CommentData } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export async function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export async function deletePostComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export async function addPostComment(comment: CommentData) {
  return client.post<Comment>(`/comments`, comment);
}
