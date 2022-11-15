import { Comment } from '../types/Comment';
import { NewComment } from '../types/NewComment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (comment: NewComment, postId: number) => {
  return client.post<Comment>(`/comments?postId=${postId}`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
