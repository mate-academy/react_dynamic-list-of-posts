import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (commentData: {
  postId: number;
  name: string;
  email: string;
  body: string;
}) => {
  return client.post<Comment>('/comments', commentData);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
