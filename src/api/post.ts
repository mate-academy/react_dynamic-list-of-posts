import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { User } from '../types/User';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
