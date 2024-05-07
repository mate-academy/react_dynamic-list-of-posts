import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const removeComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (postId: number, newComment: CommentData) => {
  return client.post<Comment>('/comments', {
    ...newComment,
    postId,
  });
};
