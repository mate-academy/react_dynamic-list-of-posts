import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (data: CommentData & { postId: number }) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
