import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number): Promise<void> => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (
  comment: Omit<Comment, 'id'>,
): Promise<Comment> => {
  return client.post('/comments', comment);
};
