import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsByUserId = (id: number) => {
  return client.get<Post[]>('/posts?userId=' + id);
};

export const getCommentsByPostId = (id: number) => {
  return client.get<Comment[]>('/comments?postId=' + id);
};

export const deleteCommentsByPostId = (id: number) => {
  return client.delete('/comments/' + id);
};

export const addComment = (newComment: CommentData) => {
  return client.post<Comment>('/comments/', newComment);
};
