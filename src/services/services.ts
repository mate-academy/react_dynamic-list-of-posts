import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: string) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: string) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: string) => {
  return client.delete(`/comments/${commentId}`);
};

export const createNewComment = (commentData: CommentData) => {
  return client.post<Comment>('/comments', commentData);
};
