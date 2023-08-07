import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const createComment = (
  {
    postId, name, email, body,
  }: Omit<Comment, 'id'>,
) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
