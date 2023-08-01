import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

export const getAllUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPost = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPostComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (data: CommentData & { postId: number }) => {
  return client.post<Comment>('/comments', data);
};
