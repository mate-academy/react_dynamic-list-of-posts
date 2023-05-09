import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, NewComment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const getComments = () => {
  return client.get<Comment[]>('/comments');
};

export const addComments = (data: NewComment) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
