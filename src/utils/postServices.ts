import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const USER_ID = 634;

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export function createComment(newComment: Comment) {
  return client.post<Comment>(`/comments/`, newComment);
}
