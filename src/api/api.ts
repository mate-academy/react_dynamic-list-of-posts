import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
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

export const addComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
) => {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
