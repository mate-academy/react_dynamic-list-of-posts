import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getPosts = (url: string) => {
  return client.get<Post[]>(url);
};

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

// eslint-disable-next-line max-len
export const addComment = (postId: number, name: string, email: string, body: string) => {
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
