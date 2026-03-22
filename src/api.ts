import { client } from './utils/fetchClient';
import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';

type NewComment = Omit<Comment, 'id'>;

export const getUsers = () => client.get<User[]>('/users');

export const getPostsByUser = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);

export const getCommentsByPost = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const addComment = (comment: NewComment) =>
  client.post<Comment>('/comments', comment);

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);
