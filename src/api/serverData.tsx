import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (commentToPost: CommentData) => {
  return client.post<Comment>('/comments', commentToPost);
};

export const deleteComment = (commentToDelete: number) => {
  return client.delete(`/comments/${commentToDelete}`);
};
