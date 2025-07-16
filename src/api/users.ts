import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get<User[]>(`/users`);
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPost = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

export const getCommentsOfPost = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const getComment = (commentId: number) => {
  return client.get<Comment>(`/comments/${commentId}`);
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, comment);
};

export const updateComment = (id: number, changes: Partial<Comment>) => {
  return client.patch<Comment>(`/comments/${id}`, changes);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
