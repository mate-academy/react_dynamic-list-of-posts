import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPostComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const getAllComment = () => {
  return client.get<Comment[]>('/comments');
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (id: number, comment: Comment) => {
  return client.post(`/comments?postId=${id}`, comment);
};
