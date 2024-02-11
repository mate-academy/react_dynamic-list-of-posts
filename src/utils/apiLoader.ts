import { Comment, CommentPost } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsForPost = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComments = (data: CommentPost) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number): Promise<Comment[]> => {
  return client.delete<Comment[]>(`/comments/${commentId}`);
};
