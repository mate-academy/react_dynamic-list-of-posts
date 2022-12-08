import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const postComment = async (newComment: Comment) => {
  return client.post('/comments', newComment);
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${userId}`);
};
