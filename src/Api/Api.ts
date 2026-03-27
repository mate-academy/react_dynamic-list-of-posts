import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const USER_ID = 4072;

export const getUser = () => {
  return client.get<User[]>('/users/');
};

export const getPost = ({ userId }: Omit<Post, 'id' | 'title' | 'body'>) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComment = ({ postId }: Pick<Comment, 'postId'>) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`/comments`, { postId, name, email, body });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
