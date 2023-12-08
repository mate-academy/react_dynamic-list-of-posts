import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getPosts(id: number) {
  return client.get<Post[]>(`/posts?userId=${id}`);
}

export function getComment(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addComment(comment: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', comment);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}
