import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getPostsByUser = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (postId: number, comment: Comment) => {
  return client.post<Comment>(`/comments?postId=${postId}`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const usersFromApi = getUsers('/users')
  .then((users) => users)
  .catch(() => {
    throw new Error('Unable to get users');
  });
