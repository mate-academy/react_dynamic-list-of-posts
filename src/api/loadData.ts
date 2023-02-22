import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsByPostId = (postId = 0) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (comment: CommentData) => {
  return client.post<Comment>('/comments', comment);
};
