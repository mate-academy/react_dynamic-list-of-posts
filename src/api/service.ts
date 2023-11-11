import { client } from '../utils/fetchClient';

import { Post } from '../types/Post';
import { User } from '../types/User';
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

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};
