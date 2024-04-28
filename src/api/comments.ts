import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment({ postId, name, email, body }: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', { postId, name, email, body });
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}

export async function getUsers() {
  const result = await Promise.race([
    client.get<Comment[]>(`/comments`),
    client.get<Comment[]>(`/comments`),
  ]);

  return result;
}
