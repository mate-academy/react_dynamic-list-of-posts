import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (id: number | null) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPost = (id: number | null) => {
  return client.get<Post>(`/posts/${id}`);
};

export const getComments = (id: number | null) => {
  return client.get<Comment>(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (data: any) => {
  return client.post('/comments', data);
};
