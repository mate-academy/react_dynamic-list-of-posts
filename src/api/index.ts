import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => client.get<User[]>('/users');
export const getPosts = () => client.get<Post[]>('/posts');
export const getComments = () => client.get<Comment[]>('/comments');

export const addComment = (comment: Omit<Comment, 'id'>) =>
  client.post<Comment>('/comments', comment);

export const deleteComment = (id: number) => client.delete(`/comments/${id}`);
