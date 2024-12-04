import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const postComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};
