import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => client.get<User[]>('/users');
export const getPosts = (id: number) => client.get<Post[]>(`/posts?userId=${id}`);
export const getComments = (id: number) => client.get<Comment[]>(`/comments?postId=${id}`);
/* eslint-disable-next-line */
export const postComments = (data: any) => client.post<Comment>(
  '/comments',
  data,
);
export const deletePost = (idComment: number) => client.delete(`/comments/${idComment}`);
