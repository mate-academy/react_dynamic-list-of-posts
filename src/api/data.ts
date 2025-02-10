import { User } from '../types/User';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};
