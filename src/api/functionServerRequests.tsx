import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPost = (id: number) => {
  return client.get<Post>(`/posts/${id}`);
};

export const getComments = (postId: number) => {
  return client.get<CommentData[]>(`/comments?postId=${postId}`);
};

export const addComment = (comment: CommentData) => {
  return client.post<CommentData[]>('/comments', comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
