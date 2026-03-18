import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export async function getComments(postId: Post['id']) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export async function addComment(comment: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', comment);
}

export async function deleteComment(commentId: Comment['id']) {
  return client.delete(`/comments/${commentId}`);
}
