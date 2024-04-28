import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => client.get<User[]>('/users');
export const getPosts = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);

export const getComments = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);

export const postComment = (data: CommentData) =>
  client.post<Comment[]>('/comments', data);
