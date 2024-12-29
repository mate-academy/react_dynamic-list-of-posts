import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUser = () => {
  return client.get<User[]>('/users');
};

export const getPosts = ({ id }: Pick<User, 'id'>) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};
