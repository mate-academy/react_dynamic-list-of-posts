import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getComments(id: number) {
  return client.get<Comment[]>(`/comments?postId=${id}`);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}

export function addComment(data: Omit<Comment, 'id'>) {
  return client.post<Post>('/comments', data);
}
