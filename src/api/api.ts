import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsByUserid = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getCommentsByPostid = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
