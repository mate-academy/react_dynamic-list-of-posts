import { client } from '../utils/fetchClient';

import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getUserPost(userId: number): Promise<Post[]> {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getUserComment(postId: number): Promise<Comment[]> {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function createComment({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>(`/comments/`, {
    name,
    email,
    body,
    postId,
  });
}

export function deleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}
