import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function postComments({
  postId, name, email, body,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
}

export function deleteComments(postId: number) {
  return client.delete(`/comments/${postId}`);
}
