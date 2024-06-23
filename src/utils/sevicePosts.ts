import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPosts = (userId: number | undefined) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (comment: CommentData) => {
  return client.post<Comment>('/comments/', comment);
};
