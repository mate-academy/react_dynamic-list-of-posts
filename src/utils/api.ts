import { Comment, NewComment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getAllUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (postId: number) => {
  return client.get<Post[]>(`/posts?userId=${postId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addPostComment = (comment: NewComment) => {
  return client.post<Comment>('/comments', comment);
};

export const deletePostComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
