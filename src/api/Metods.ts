import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

export const getUser = () => {
  return client.get<User[]>(`/users`);
};

export const getUserPosts = id => {
  return client.get<User[]>(`/posts?userId=${id}`);
};

export const getCommentsPosts = id => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Todo>(`/comments`, { postId, name, email, body });
};

export const delComment = (id: number) => {
  return client.delete<number>(`/comments/${id}`);
};
