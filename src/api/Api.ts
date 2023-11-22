/* eslint-disable import/no-duplicates */
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { CommentData, Comment } from '../types/Comment';

export const loadUsers = (url = 'users') => {
  return client.get<User[]>(`/${url}`);
};

export const loadPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const loadComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteComments = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};
