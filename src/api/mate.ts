import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsOfUser = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsToPost = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};
