import { client } from './utils/fetchClient';

import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';

export const getAllUsers = (): Promise<User[]> => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const postComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post('/comments', {
    postId,
    name,
    email,
    body,
  });
};
