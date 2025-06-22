import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsById = ({ id }: User) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete<number>(`/comments/${commentId}`);
};
