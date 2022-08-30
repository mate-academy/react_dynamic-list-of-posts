import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const getComments = () => {
  return client.get<Comment[]>('/comments');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComments = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComments = (comment: Comment) => {
  return client.post<Comment>('/comments', comment);
};
