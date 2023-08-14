import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import { Comment } from './types/Comment';

export const getUsers = () => client.get<User[]>('/users');

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (newComment: Comment) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
