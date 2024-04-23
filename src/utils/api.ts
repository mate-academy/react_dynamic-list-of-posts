import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

export const getUsers = () => client.get<User[]>('/users');

export const getUserPosts = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);

export const getComments = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const addComment = (comment: CommentData) =>
  client.post<Comment>('/comments', comment);

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);
