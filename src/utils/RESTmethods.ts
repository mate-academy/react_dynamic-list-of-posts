import { CommentData, CommentInt } from '../types/CommentInt';
import { PostInt } from '../types/PostInt';
import { UserInt } from '../types/UserInt';
import { client } from './fetchClient';

export const getUser = () => client.get<UserInt[]>('/users');

export const getUserPost = (userId: number) => {
  return client.get<PostInt[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<CommentInt[]>(`/comments?postId=${postId}`);
};

export const addComment = (data: CommentData) => {
  return client.post<CommentInt>('/comments', data);
};

export const deleteComment = (commnetId: number) => {
  return client.delete(`/comments/${commnetId}`);
};
