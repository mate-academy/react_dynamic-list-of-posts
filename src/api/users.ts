import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number | null = null) => {
  if (userId) {
    return client.get<Post[]>(`/posts?userId=${userId}`);
  }

  return null;
};

export const getComments = (postId: number | null = null) => {
  if (postId) {
    return client.get<Comment[]>(`/comments?postId=${postId}`);
  }

  return null;
};

export const postComment = (data: CommentData) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
